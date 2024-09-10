import { Module, forwardRef } from '@nestjs/common';
import { PostPictureService } from 'src/infrastructure/services/file/post-picture.service';
import { ProfilePictureService } from 'src/infrastructure/services/file/profile-picture.service';
import { UserModule } from '../modules/user/user.module';

import { SharedArtistModule } from '../shared/modules/artist/shared-artist.module';
import { SharedPostModule } from '../shared/modules/post/shared-post.module';
import { SharedAssetModule } from '../shared/modules/asset/shared-asset.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    SharedPostModule,
    SharedArtistModule,
    SharedAssetModule,
  ],
  providers: [ProfilePictureService, PostPictureService],
  exports: [ProfilePictureService, PostPictureService],
})
export class SharedFileModule {}
