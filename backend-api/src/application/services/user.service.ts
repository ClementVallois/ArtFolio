import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { PersonalDataRequest } from 'src/domain/entities/personal-data-request.entity';
import { File } from '@nest-lab/fastify-multer';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from './asset.service';
import { CreateAmateurDto } from 'src/presentation/dto/amateur/create-amateur.dto';
import { UpdateAmateurDto } from 'src/presentation/dto/amateur/update-amateur.dto';
import { UserId } from 'src/domain/value-objects/userId';
import { ArtistId } from 'src/domain/value-objects/artistId';
import { ProfilePictureHandler } from '../handlers/profile-picture.handler';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(PersonalDataRequest)
    private readonly dataRequestRepository: Repository<PersonalDataRequest>,
    private readonly errorService: ErrorService,
    private readonly fileService: FileService,
    private readonly assetService: AssetService,
    private readonly profilePictureHandler: ProfilePictureHandler,
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.findBy({ role: 'amateur' });
    } catch (error) {
      throw new HttpException(
        'Error getting users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }
    return user;
  }

  async getUserByAuth0Id(auth0Id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ auth0Id: auth0Id });
    if (!user) {
      throw new NotFoundException(`User not found with Auth0 ID: ${auth0Id}`);
    }
    return user;
  }

  async getUserAssets(userId: string): Promise<Asset[]> {
    const userAssets = await this.assetRepository.find({
      where: { userId: { id: userId }, type: 'profile_picture' },
    });

    if (!userAssets || userAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for User with ID: ${userId}`,
      );
    }
    return userAssets;
  }

  async getUserDataRequests(userId: string): Promise<PersonalDataRequest[]> {
    const dataRequests = await this.dataRequestRepository.find({
      where: { user: { id: userId } },
    });
    if (!dataRequests || dataRequests.length === 0) {
      throw new NotFoundException(
        `Data Requests not found for User with ID: ${userId}`,
      );
    }
    return dataRequests;
  }

  async handleCreateUser(
    userData: CreateAmateurDto,
    files: { profilePicture: File },
  ): Promise<User> {
    this.validateFiles(files);
    const profilePicture = files.profilePicture[0];

    const user = await this.createUser(userData, profilePicture);
    return user;
  }

  private validateFiles(files: { profilePicture: File }) {
    if (!files.profilePicture) {
      throw new BadRequestException('Profile picture file is required.');
    }
  }

  async createUser(
    userData: CreateAmateurDto,
    profilePicture: File,
  ): Promise<User> {
    let user: User;
    try {
      user = this.userRepository.create(userData);
      await this.userRepository.save(user);
    } catch (error) {
      this.handleDatabaseErrors(error, userData);
    }

    await this.handleProfilePicture(user, profilePicture);
    return user;
  }

  private handleDatabaseErrors(error: any, userData: CreateAmateurDto) {
    const errorMessage = this.errorService.parseDatabaseError(error, userData);
    throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
  }
  private async handleProfilePicture(user: User, profilePicture: File) {
    try {
      const fileData =
        await this.profilePictureHandler.createOrUpdateProfilePicture(
          user,
          profilePicture,
        );
      await this.assetService.addProfilePictureMetadataInDatabase(
        user.id,
        fileData,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to save profile picture',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: string, userData: UpdateAmateurDto): Promise<User> {
    const user = await this.getUserById(id);
    this.userRepository.merge(user, userData);
    return this.userRepository.save(user);
  }

  async removeUser(id: string): Promise<User> {
    const user = await this.getUserById(id);

    try {
      await this.profilePictureHandler.deleteProfilePicture(new UserId(id));
      await this.fileService.deleteArtistPostsPictures(new ArtistId(id));
    } catch (error) {
      throw new HttpException(
        "Failed to remove the user's profile picture",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      return await this.userRepository.remove(user);
    } catch (error) {
      throw new HttpException(
        'Failed to remove user from database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
