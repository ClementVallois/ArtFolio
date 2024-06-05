import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../../presentation/dto/amateur/create-user.dto';
import { UpdateUserDto } from '../../presentation/dto/amateur/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { DataRequest } from 'src/domain/entities/data-request.entity';
import { File } from '@nest-lab/fastify-multer';
import { ErrorService } from 'src/infrastructure/common/filter/error.service';
import { FileService } from 'src/infrastructure/services/file/file.service';
import { AssetService } from './asset.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(DataRequest)
    private readonly dataRequestRepository: Repository<DataRequest>,
    private readonly errorService: ErrorService,
    private readonly fileService: FileService,
    private readonly assetService: AssetService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.findBy({ role: 'user' });
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

  async getUserDataRequests(userId: string): Promise<DataRequest[]> {
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
    userData: CreateUserDto,
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
    userData: CreateUserDto,
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

  private handleDatabaseErrors(error: any, userData: CreateUserDto) {
    const errorMessage = this.errorService.parseDatabaseError(error, userData);
    throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
  }
  private async handleProfilePicture(user: User, profilePicture: File) {
    try {
      const fileData = await this.fileService.saveProfilePicture(
        user.id,
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

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    this.userRepository.merge(user, userData);
    return this.userRepository.save(user);
  }

  async removeUser(id: string): Promise<User> {
    const user = await this.getUserById(id);

    try {
      await this.fileService.deleteProfilePicture(id);
      await this.fileService.deleteUserPostsPictures(id);
    } catch (error) {
      throw new HttpException(
        "Failed to remove the user's profile picture",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      return await this.userRepository.remove(user);
    } catch (error) {
      console.error(`Failed to remove user from database: ${error}`);
      throw new HttpException(
        'Failed to remove user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
