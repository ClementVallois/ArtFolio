import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class DatabaseErrorHandler {
  parseDatabaseError(error: any, data: any): string {
    if (error.code === '23505') {
      if (error.detail.includes('username')) {
        return `Artist with username ${data.username} already exists`;
      } else if (error.detail.includes('auth0_id')) {
        return `Artist with Auth0 ID ${data.auth0Id} already exists`;
      } else if (error.detail.includes('name')) {
        return `Category with name ${data.name} already exists`;
      }
    }
    return 'Unknown database error';
  }

  handleDatabaseError(error: any, data: any): never {
    const errorMessage = this.parseDatabaseError(error, data);
    throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
