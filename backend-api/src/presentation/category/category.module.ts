import { Module } from '@nestjs/common';
import { CategoryService } from '../../application/category/category.service';
import { CategoryController } from 'src/presentation/category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
