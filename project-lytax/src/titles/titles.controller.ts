import { Controller, Get } from '@nestjs/common';
import { TitlesService } from './titles.service';

@Controller('titles')
export class TitlesController {
    constructor(private titlesService:TitlesService){}

    @Get()
    async getAll() {
        return this.titlesService.getAll();
    }
}
