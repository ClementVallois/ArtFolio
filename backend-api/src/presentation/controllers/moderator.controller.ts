import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Moderators')
@ApiBearerAuth()
@Controller('moderators')
export class ModeratorController {}
