import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  parseDatabaseError(error: any, data: any): string {
    if (error.code === '23505') {
      if (error.detail.includes('username')) {
        return `Artist with username ${data.username} already exists`;
      } else if (error.detail.includes('auth0_id')) {
        return `Artist with Auth0 ID ${data.auth0Id} already exists`;
      }
    }
    return 'Error creating artist';
  }
}
