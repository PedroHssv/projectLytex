import { Body, Controller, Get, Post } from '@nestjs/common';
import { TitlesService } from './titles.service';

@Controller('titles')
export class TitlesController {
    constructor(private titlesService:TitlesService){}

    @Get()
    async getAll() {
        return this.titlesService.getAll();
    }

    @Post()
    async createTitles(@Body()){

    }
}
