// async getUserByAuth0Id(auth0Id: string): Promise<User> {
//     const user = await this.userRepository.findOneBy({ auth0Id: auth0Id });
//     if (!user) {
//       throw new NotFoundException(`User not found with Auth0 ID: ${auth0Id}`);
//     }
//     return user;
//   }
