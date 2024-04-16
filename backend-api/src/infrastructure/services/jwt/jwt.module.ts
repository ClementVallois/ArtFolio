import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stategies/jwt.strategy';
import { UserModule } from 'src/presentation/user/user.module';

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
