import { Injectable } from '@nestjs/common';
import { UserSeederService } from './seeders/user.seeder.service';
import { PostSeederService } from './seeders/post.seeder.service';
import { AssetSeederService } from './seeders/asset.seeder.service';
import { DataRequestSeederService } from './seeders/personal-data-request.seeder.service';
import { CategorySeederService } from './seeders/category.seeder.service';
import { Logger } from 'src/infrastructure/logger/services/logger.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly userSeederService: UserSeederService,
    private readonly postSeederService: PostSeederService,
    private readonly assetSeederService: AssetSeederService,
    private readonly dataRequestSeederService: DataRequestSeederService,
    private readonly categorySeederService: CategorySeederService,
    private readonly logger: Logger,
  ) {}

  async seedAll(): Promise<void> {
    const seeders = [
      {
        name: 'User',
        seeder: this.userSeederService.seed.bind(this.userSeederService),
      },
      {
        name: 'Post',
        seeder: this.postSeederService.seed.bind(this.postSeederService),
      },
      {
        name: 'Asset',
        seeder: this.assetSeederService.seed.bind(this.assetSeederService),
      },
      {
        name: 'DataRequest',
        seeder: this.dataRequestSeederService.seed.bind(
          this.dataRequestSeederService,
        ),
      },
      {
        name: 'Category',
        seeder: this.categorySeederService.seed.bind(
          this.categorySeederService,
        ),
      },
    ];

    for (const { name, seeder } of seeders) {
      try {
        this.logger.info(`Starting ${name} seeding...`);
        await seeder();
        this.logger.info(`${name} seeding completed.`);
      } catch (error) {
        this.logger.error(`Error seeding ${name}:`, error);
        break;
      }
    }
  }

  async clearAll(): Promise<void> {
    const cleaners = [
      {
        name: 'Category',
        cleaner: this.categorySeederService.clear.bind(
          this.categorySeederService,
        ),
      },
      {
        name: 'DataRequest',
        cleaner: this.dataRequestSeederService.clear.bind(
          this.dataRequestSeederService,
        ),
      },
      {
        name: 'Asset',
        cleaner: this.assetSeederService.clear.bind(this.assetSeederService),
      },
      {
        name: 'Post',
        cleaner: this.postSeederService.clear.bind(this.postSeederService),
      },
      {
        name: 'User',
        cleaner: this.userSeederService.clear.bind(this.userSeederService),
      },
    ];

    for (const { name, cleaner } of cleaners) {
      try {
        this.logger.info(`Starting to clear ${name}...`);
        await cleaner();
        this.logger.info(`${name} cleared successfully.`);
      } catch (error) {
        this.logger.error(`Error clearing ${name}:`, error);
        break;
      }
    }
  }
}
