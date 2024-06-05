import { Controller } from '@nestjs/common';
import { AssetService } from '../../application/services/asset.service';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
}
