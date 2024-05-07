import { Controller } from '@nestjs/common';
import { AssetService } from '../../application/asset/asset.service';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
}
