import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from '../../application/services/category.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { FindIdParams } from '../utils/params.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getOneCategory(@Param() { id }: FindIdParams) {
    return this.categoryService.getOneCategory(id);
  }

  @Post()
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryData);
  }

  @Patch(':id')
  async updateCategory(
    @Param() { id }: FindIdParams,
    @Body() categoryData: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, categoryData);
  }

  @Delete(':id')
  async removeCategory(@Param() { id }: FindIdParams) {
    return this.categoryService.removeCategory(id);
  }
}
