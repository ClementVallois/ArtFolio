import { ApiProperty } from '@nestjs/swagger';
import { File } from '@nest-lab/fastify-multer';

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Profile picture file',
  })
  profilePicture: File;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Post pictures files',
  })
  postPicture: File[];
}
