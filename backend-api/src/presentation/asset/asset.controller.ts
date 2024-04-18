import { Controller } from '@nestjs/common';
import { AssetService } from '../../application/asset/asset.service';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  // @Get('post/:id')
  // getPostAssets(@Param() { id }: FindIdParams) {
  //   return this.assetService.getPostAssets(id);
  // }

  // @Get('user/:id')
  // getUserAssets(@Param() { id }: FindIdParams) {
  //   return this.assetService.getUserAssets(id);
  // }

  // @Post()
  // create(@Body() createAssetDto: CreateAssetDto) {
  //   return this.assetService.create(createAssetDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
  //   return this.assetService.update(+id, updateAssetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.assetService.remove(+id);
  // }
}
