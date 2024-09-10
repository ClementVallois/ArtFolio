import { Module } from '@nestjs/common';
import { ValidationService } from '../validators/validation.service';
import { ProfilePictureHandler } from '../handlers/profile-picture.handler';
import { PostPictureHandler } from '../handlers/post-picture.handler';
import { DatabaseErrorHandler } from '../../infrastructure/errors/databaseErrorHandler';
import { ErrorService } from '../../infrastructure/common/filter/error.service';
import { SharedFileModule } from '../handlers/shared-file.module';
import { SharedCategoryModule } from '../shared/modules/category/shared-category.module';
import { SharedAssetModule } from '../shared/modules/asset/shared-asset.module';

@Module({
  imports: [SharedCategoryModule, SharedFileModule, SharedAssetModule],
  providers: [
    ValidationService,
    ProfilePictureHandler,
    PostPictureHandler,
    DatabaseErrorHandler,
    ErrorService,
  ],
  exports: [
    ValidationService,
    ProfilePictureHandler,
    PostPictureHandler,
    DatabaseErrorHandler,
    ErrorService,
  ],
})
export class CommonModule {}
