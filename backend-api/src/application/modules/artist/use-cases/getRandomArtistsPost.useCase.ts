import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetService } from 'src/application/services/asset.service';
import { SharedPostUseCaseProxy } from 'src/application/shared/modules/post/proxies/sharedPostUseCase.proxy';
import { Asset } from 'src/domain/entities/asset.entity';
import { Post } from 'src/domain/entities/post.entity';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetRandomArtistsPostUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly sharedPostUseCaseProxy: SharedPostUseCaseProxy,
    private readonly assetService: AssetService,
  ) {}

  async execute(numberOfArtists: number): Promise<
    {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[]
  > {
    const randomArtists = await this.userRepository.find({
      where: { role: 'artist' },
    });

    const artistsInDB = randomArtists.length;
    const selectedArtists: {
      artist: User;
      pinnedPost: Post;
      postAssets: Asset[];
      artistAsset: Asset;
    }[] = [];

    for (let i = 0; i < numberOfArtists; i++) {
      const randomIndex = Math.floor(Math.random() * artistsInDB);
      const randomArtist = randomArtists[randomIndex];

      const pinnedPost = await this.sharedPostUseCaseProxy.getArtistPinnedPost(
        randomArtist.id,
      );
      const postAssets = await this.assetService.getPostAssets(pinnedPost.id);

      const artistAsset = await this.assetService.getArtistProfilePicture(
        randomArtist.id,
      );

      selectedArtists.push({
        artist: randomArtist,
        pinnedPost: pinnedPost,
        postAssets: postAssets,
        artistAsset: artistAsset,
      });
    }

    return selectedArtists;
  }
}
