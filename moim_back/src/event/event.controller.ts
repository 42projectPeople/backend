import {Controller, Get} from '@nestjs/common';

@Controller('event')
export class EventController {
    @Get('/:id')
    async HelloEvent{
        console.log('hello')
    }
}
