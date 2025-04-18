import { Body, Controller, Get, Post } from '@nestjs/common';
import { TitlesService } from './titles.service';
import { Titles } from './schema/titles.schema';


@Controller('titles')
export class TitlesController {
    constructor(private titlesService:TitlesService){}

    @Get()
    async getAll() {
        return this.titlesService.getAll();
    }

    @Post()
    async createTitles(@Body() titles:Titles){
        return this.titlesService.create(titles);
    }
}
