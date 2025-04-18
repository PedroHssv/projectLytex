import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TitlesService } from './titles.service';
import { TitlesSchema } from './schema/titles.schema';
import { TitlesController } from './titles.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Titles',
        schema: TitlesSchema,
        collection: 'titles',
      },
    ]),
    HttpModule,
  ],
  providers: [TitlesService],
  controllers: [TitlesController],
})
export class TitlesModule {}
