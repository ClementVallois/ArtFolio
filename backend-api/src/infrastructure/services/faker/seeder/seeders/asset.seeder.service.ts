import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Asset } from 'src/domain/entities/asset.entity';
import { User } from 'src/domain/entities/user.entity';
import { Post } from 'src/domain/entities/post.entity';

@Injectable()
export class AssetSeederService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  private fakePostPicturesName = [
    'Peinture1.png',
    'Peinture2.png',
    'Peinture3.png',
    'Peinture4.png',
    'Peinture5.png',
    'Peinture6.png',
    'Peinture7.png',
    'Peinture8.png',
    'Peinture9.png',
    'Peinture10.png',
    'Sculpture1.png',
    'Sculpture2.png',
    'Sculpture3.png',
    'Sculpture4.png',
    'Sculpture5.png',
    'Sculpture6.png',
    'Sculpture7.png',
    'Sculpture8.png',
    'Sculpture9.png',
    'Sculpture10.png',
    'Photographie1.png',
    'Photographie2.png',
    'Photographie3.png',
    'Photographie4.png',
    'Photographie5.png',
    'Photographie6.png',
    'Photographie7.png',
    'Photographie8.png',
    'Photographie9.png',
    'Photographie10.png',
    'Dessin1.png',
    'Dessin2.png',
    'Dessin3.png',
    'Dessin4.png',
    'Dessin5.png',
    'Dessin6.png',
    'Dessin7.png',
    'Dessin8.png',
    'Dessin9.png',
    'Dessin10.png',
    'Art-numérique1.png',
    'Art-numérique2.png',
    'Art-numérique3.png',
    'Art-numérique4.png',
    'Art-numérique5.png',
    'Art-numérique6.png',
    'Art-numérique7.png',
    'Art-numérique8.png',
    'Art-numérique9.png',
    'Art-numérique10.png',
    'Art-abstrait1.png',
    'Art-abstrait2.png',
    'Art-abstrait3.png',
    'Art-abstrait4.png',
    'Art-abstrait5.png',
    'Art-abstrait6.png',
    'Art-abstrait7.png',
    'Art-abstrait8.png',
    'Art-abstrait9.png',
    'Art-abstrait10.png',
    'Art-figuratif1.png',
    'Art-figuratif2.png',
    'Art-figuratif3.png',
    'Art-figuratif4.png',
    'Art-figuratif5.png',
    'Art-figuratif6.png',
    'Art-figuratif7.png',
    'Art-figuratif8.png',
    'Art-figuratif9.png',
    'Art-figuratif10.png',
    'Art-contemporain1.png',
    'Art-contemporain2.png',
    'Art-contemporain3.png',
    'Art-contemporain4.png',
    'Art-contemporain5.png',
    'Art-contemporain6.png',
    'Art-contemporain7.png',
    'Art-contemporain8.png',
    'Art-contemporain9.png',
    'Art-contemporain10.png',
    'Art-conceptuel1.png',
    'Art-conceptuel2.png',
    'Art-conceptuel3.png',
    'Art-conceptuel4.png',
    'Art-conceptuel5.png',
    'Art-conceptuel6.png',
    'Art-conceptuel7.png',
    'Art-conceptuel8.png',
    'Art-conceptuel9.png',
    'Art-conceptuel10.png',
    'Graffiti1.png',
    'Graffiti2.png',
    'Graffiti3.png',
    'Graffiti4.png',
    'Graffiti5.png',
    'Graffiti6.png',
    'Graffiti7.png',
    'Graffiti8.png',
    'Graffiti9.png',
    'Graffiti10.png',
    'Art-graphique1.png',
    'Art-graphique2.png',
    'Art-graphique3.png',
    'Art-graphique4.png',
    'Art-graphique5.png',
    'Art-graphique6.png',
    'Art-graphique7.png',
    'Art-graphique8.png',
    'Art-graphique9.png',
    'Art-graphique10.png',
    'Art-cinétique1.png',
    'Art-cinétique2.png',
    'Art-cinétique3.png',
    'Art-cinétique4.png',
    'Art-cinétique5.png',
    'Art-cinétique6.png',
    'Art-cinétique7.png',
    'Art-cinétique8.png',
    'Art-cinétique9.png',
    'Art-cinétique10.png',
    'Céramique1.png',
    'Céramique2.png',
    'Céramique3.png',
    'Céramique4.png',
    'Céramique5.png',
    'Céramique6.png',
    'Céramique7.png',
    'Céramique8.png',
    'Céramique9.png',
    'Céramique10.png',
    'Mosaïque1.png',
    'Mosaïque2.png',
    'Mosaïque3.png',
    'Mosaïque4.png',
    'Mosaïque5.png',
    'Mosaïque6.png',
    'Mosaïque7.png',
    'Mosaïque8.png',
    'Mosaïque9.png',
    'Mosaïque10.png',
    'Vitrail1.png',
    'Vitrail2.png',
    'Vitrail3.png',
    'Vitrail4.png',
    'Vitrail5.png',
    'Vitrail6.png',
    'Vitrail7.png',
    'Vitrail8.png',
    'Vitrail9.png',
    'Vitrail10.png',
  ];

  private fakeProfilePicturesName = [
    'ProfilePicture1.png',
    'ProfilePicture2.png',
    'ProfilePicture3.png',
    'ProfilePicture4.png',
    'ProfilePicture5.png',
    'ProfilePicture6.png',
    'ProfilePicture7.png',
    'ProfilePicture8.png',
    'ProfilePicture9.png',
    'ProfilePicture10.png',
    'ProfilePicture11.png',
    'ProfilePicture12.png',
    'ProfilePicture13.png',
    'ProfilePicture14.png',
    'ProfilePicture15.png',
    'ProfilePicture16.png',
    'ProfilePicture17.png',
    'ProfilePicture18.png',
    'ProfilePicture19.png',
    'ProfilePicture20.png',
    'ProfilePicture21.png',
    'ProfilePicture22.png',
    'ProfilePicture23.png',
    'ProfilePicture24.png',
    'ProfilePicture25.png',
    'ProfilePicture26.png',
    'ProfilePicture27.png',
    'ProfilePicture28.png',
    'ProfilePicture29.png',
    'ProfilePicture30.png',
    'ProfilePicture31.png',
    'ProfilePicture32.png',
    'ProfilePicture33.png',
    'ProfilePicture34.png',
    'ProfilePicture35.png',
    'ProfilePicture36.png',
    'ProfilePicture37.png',
    'ProfilePicture38.png',
    'ProfilePicture39.png',
    'ProfilePicture40.png',
    'ProfilePicture41.png',
    'ProfilePicture42.png',
    'ProfilePicture43.png',
    'ProfilePicture44.png',
    'ProfilePicture45.png',
    'ProfilePicture46.png',
    'ProfilePicture47.png',
    'ProfilePicture48.png',
    'ProfilePicture49.png',
    'ProfilePicture50.png',
  ];

  async clear(): Promise<void> {
    await this.postRepository.query('TRUNCATE TABLE assets CASCADE');
  }

  async seed(): Promise<void> {
    await this.seedProfilePictures();
    await this.addAssetsToPosts();
    await this.addAssetsToArtists();
  }

  private async addAssetsToPosts(): Promise<void> {
    const users = await this.userRepository.find();
    const posts = await this.postRepository.find({ relations: ['user'] });

    //Add post asset for artists only
    const fakeData = Array.from({ length: 10 }, () => {
      const artistUsers = faker.helpers.arrayElement(
        users.filter((user) => {
          return user.role === 'artist';
        }),
      );
      const post = faker.helpers.arrayElement(posts);
      const asset = new Asset();
      asset.id = faker.string.uuid();
      asset.url = faker.internet.url();
      asset.postId = post;
      asset.type = 'post_picture';
      asset.mimetype = faker.helpers.arrayElement(['image/png', 'image/jpeg']);
      asset.userId = artistUsers;
      asset.createdAt = faker.date.recent();
      asset.updatedAt = faker.date.recent();
      return asset;
    });
    await this.assetRepository.save(fakeData);
  }

  private async seedProfilePictures(): Promise<void> {
    const users = await this.userRepository.find();
    for (const user of users) {
      const existingProfilePicture = await this.assetRepository.findOne({
        where: { userId: { id: user.id }, type: 'profile_picture' },
      });

      if (!existingProfilePicture) {
        const newProfilePicture = new Asset();
        newProfilePicture.type = 'profile_picture';
        newProfilePicture.userId = { id: user.id } as User;
        newProfilePicture.mimetype = faker.helpers.arrayElement([
          'image/png',
          'image/jpeg',
        ]);
        newProfilePicture.id = faker.string.uuid();
        newProfilePicture.createdAt = faker.date.recent();
        newProfilePicture.updatedAt = faker.date.recent();

        await this.assetRepository.save(newProfilePicture);
      }
    }
  }

  private async addAssetsToArtists(): Promise<void> {
    // Add post pictures asset for existing artists
    const artistUsers = await this.userRepository.find({
      where: { role: 'artist' },
    });

    for (const user of artistUsers) {
      const posts = await this.postRepository.find({
        where: { user: { id: user.id } },
      });

      for (const post of posts) {
        const existingAsset = await this.assetRepository.findOne({
          where: { postId: { id: post.id }, type: 'post_picture' },
        });

        if (!existingAsset) {
          const asset = new Asset();
          asset.id = faker.string.uuid();
          asset.postId = post;
          asset.type = 'post_picture';
          asset.mimetype = faker.helpers.arrayElement([
            'image/jpeg',
            'image/png',
          ]);
          asset.userId = user;
          asset.url = faker.internet.url();
          asset.createdAt = faker.date.recent();
          asset.updatedAt = faker.date.recent();
          await this.assetRepository.save(asset);
        }
      }
    }
  }
}
