import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { FindIdParams } from '../utils/params.dto';
import { CreateCategoryUseCase } from 'src/application/modules/category/use-cases/createCategory.useCase';
import { GetAllCategoriesUseCase } from 'src/application/modules/category/use-cases/getAllCategories.useCase';
import { GetCategoryByIdUseCase } from 'src/application/modules/category/use-cases/getCategoryById.useCase';
import { CategoryId } from 'src/domain/value objects/categoryId';
import { UpdateCategoryUseCase } from 'src/application/modules/category/use-cases/updateCategory.useCase';
import { RemoveCategoryUseCase } from 'src/application/modules/category/use-cases/removeCategory.useCase';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly getCategoryById: GetCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly removeCategoryUseCase: RemoveCategoryUseCase,
  ) {}

  @Get()
  async getAllCategories() {
    return this.getAllCategoriesUseCase.execute();
  }

  @Get(':id')
  async getOneCategory(@Param() params: FindIdParams) {
    const categoryId = new CategoryId(params.id);
    return this.getCategoryById.execute(categoryId);
  }

  @Post()
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(categoryData);
  }

  @Patch(':id')
  async updateCategory(
    @Param() params: FindIdParams,
    @Body() categoryData: UpdateCategoryDto,
  ) {
    const categoryId = new CategoryId(params.id);
    return this.updateCategoryUseCase.execute(categoryId, categoryData);
  }

  @Delete(':id')
  async removeCategory(@Param() params: FindIdParams) {
    const categoryId = new CategoryId(params.id);
    return this.removeCategoryUseCase.execute(categoryId);
  }
}
