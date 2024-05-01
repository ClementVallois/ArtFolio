import { Module } from '@nestjs/common';
import { CategoryService } from '../../application/category/category.service';
import { CategoryController } from 'src/presentation/category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/infrastructure/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
