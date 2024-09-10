import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { FindIdParams } from '../utils/params.dto';
import { CreateCategoryUseCase } from 'src/application/modules/category/use-cases/createCategory.useCase';
import { GetAllCategoriesUseCase } from 'src/application/modules/category/use-cases/getAllCategories.useCase';
import { GetCategoryByIdUseCase } from 'src/application/shared/modules/category/use-cases/getCategoryById.useCase';
import { UpdateCategoryUseCase } from 'src/application/modules/category/use-cases/updateCategory.useCase';
import { RemoveCategoryUseCase } from 'src/application/modules/category/use-cases/removeCategory.useCase';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../decorators/permissions/permissions.guard';
import { Permissions } from '../decorators/permissions/permissions.decorator';
import { Category } from 'src/domain/entities/category.entity';
import { CategoryId } from 'src/domain/value-objects/categoryId';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly removeCategoryUseCase: RemoveCategoryUseCase,
  ) {}

  /**
   * Get all categories.
   *
   * @returns {Promise<Category[]>} A promise that resolves to an array of Category objects.
   */
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Categories not found.' })
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.getAllCategoriesUseCase.execute();
  }

  /**
   * Get a category by ID.
   *
   * @param {FindIdParams} params - The parameters for finding the category by ID.
   * @returns {Promise<Category>} A promise that resolves to the Category object with the specified ID.
   */
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the category',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Return the category with the specified ID.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:category')
  @Get(':id')
  async getOneCategory(@Param() params: FindIdParams): Promise<Category> {
    const categoryId = new CategoryId(params.id);
    return this.getCategoryByIdUseCase.execute(categoryId);
  }

  /**
   * Create a new category.
   *
   * @param {CreateCategoryDto} categoryData - The data for creating a new category.
   * @returns {Promise<Category>} A promise that resolves to the newly created Category object.
   */
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('create:category')
  @Post()
  async createCategory(
    @Body() categoryData: CreateCategoryDto,
  ): Promise<Category> {
    return this.createCategoryUseCase.execute(categoryData);
  }

  /**
   * Update a category.
   *
   * @param {FindIdParams} params - The parameters containing the ID of the category to update.
   * @param {UpdateCategoryDto} categoryData - The data for updating the category.
   * @returns {Promise<Category>} A promise that resolves to the updated Category object.
   */
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', description: 'The ID of the category', type: String })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @ApiBearerAuth()
  @Permissions('update:category')
  @Patch(':id')
  async updateCategory(
    @Param() params: FindIdParams,
    @Body() categoryData: UpdateCategoryDto,
  ): Promise<Category> {
    const categoryId = new CategoryId(params.id);
    return this.updateCategoryUseCase.execute(categoryId, categoryData);
  }

  /**
   * Remove a category.
   *
   * @param {FindIdParams} params - The parameters containing the ID of the category to remove.
   * @returns {Promise<Category>} A promise that resolves to the removed Category object.
   */
  @ApiOperation({ summary: 'Remove a category' })
  @ApiParam({ name: 'id', description: 'The ID of the category', type: String })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully removed.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('delete:category')
  @Delete(':id')
  async removeCategory(@Param() params: FindIdParams): Promise<Category> {
    const categoryId = new CategoryId(params.id);
    return this.removeCategoryUseCase.execute(categoryId);
  }
}
