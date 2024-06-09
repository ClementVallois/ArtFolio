import { Module } from '@nestjs/common';
import { CategoryService } from '../../services/category.service';
import { CategoryController } from 'src/presentation/controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { User } from 'src/domain/entities/user.entity';
import { SharedCategoryModule } from 'src/application/shared/modules/category/shared-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User]), SharedCategoryModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
