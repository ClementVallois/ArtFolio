import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from '../../infrastructure/controllers/category/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
