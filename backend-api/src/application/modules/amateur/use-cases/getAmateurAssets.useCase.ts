import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/domain/entities/asset.entity';
import { AmateurId } from 'src/domain/value objects/amateurId';
import { AmateurRepository } from 'src/infrastructure/repositories/amateur.repository';
import { Repository } from 'typeorm';

@Injectable()
export class GetUserAssetsUseCase {
  constructor(
    private readonly amateurRepository: AmateurRepository,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async execute(amateurId: AmateurId): Promise<Asset[]> {
    const amateurAssets = await this.assetRepository.find({
      where: { userId: { id: amateurId.toString() }, type: 'profile_picture' },
    });

    if (!amateurAssets || amateurAssets.length === 0) {
      throw new NotFoundException(
        `Assets not found for User with ID: ${amateurId}`,
      );
    }
    return amateurAssets;
  }
}
