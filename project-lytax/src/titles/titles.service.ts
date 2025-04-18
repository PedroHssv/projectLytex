import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { Titles, TitlesDocument } from './schema/titles.schema';
import { Model } from 'mongoose';

@Injectable()
export class TitlesService {
  constructor(
    @InjectModel(Titles.name)
    private titlesModel: Model<TitlesDocument>,
  ) {}

  async getAll():Promise<Titles[]>{
    return this.titlesModel.find().exec();
  }

  async create(titles:Titles){
    const newTitle = new this.titlesModel(titles)
    return newTitle.save();
  }
}
