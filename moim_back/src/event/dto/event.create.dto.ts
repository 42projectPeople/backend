import { isString } from "class-validator";

export class CreateEventDto {
  @isString()
}
