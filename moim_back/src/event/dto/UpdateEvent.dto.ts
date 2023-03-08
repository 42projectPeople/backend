import { PartialType } from '@nestjs/swagger'
import { CreateEventDto } from './CreateEvent.dto'

export class UpdateEventDto extends PartialType(CreateEventDto) {}
