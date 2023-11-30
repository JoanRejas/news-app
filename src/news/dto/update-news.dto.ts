import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

//el PartialType(): Toma las clomunas del CreateNewsDto y los deja todos opcionales
export class UpdateNewsDto extends PartialType(CreateNewsDto) {}