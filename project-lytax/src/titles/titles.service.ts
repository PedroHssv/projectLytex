import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Titles, TitlesDocument } from './schema/titles.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TitlesService {
  constructor(
    @InjectModel(Titles.name)
    private titlesModel: Model<TitlesDocument>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(): Promise<Titles[]> {
    return this.titlesModel.find().exec();
  }

  async create(titles: Titles) {
    try {
      const clientId = this.configService.get<string>('CLIENT_ID');
      const clientSecret = this.configService.get<string>('CLIENT_SECRET');

      const authData = {
        grantType: 'clientCredentials',
        clientId: clientId,
        clientSecret: clientSecret,
      };

      const authResponse = await firstValueFrom(
        this.httpService.post('https://sandbox-pay.lytex.com.br/v2/auth/obtain_token', authData)
      );

      const accessToken = authResponse.data.accessToken;

      const invoiceData = {
        client: {
          treatmentPronoun: 'you',
          name: 'Valerio de Aguiar Zorzato',
          type: 'pf',
          cpfCnpj: '96050176876',
          email: 'valerio@gmail.com',
          cellphone: '78798798798',
          address: {
            zip: '35170128',
            city: 'Coronel Fabriciano',
            street: 'Rua Doutor Moacir Byrro',
            state: 'MG',
            zone: 'Centro',
          },
        },
        items: [
          {
            name: 'Notebook A315-58-573p I5 8gb 256gb Ssd 15,6',
            quantity: 1,
            value: 279900,
          },
        ],
        dueDate: '2023-12-30T23:59:59.999Z',
        paymentMethods: {
          pix: { enable: titles.forma_pagamento === 'pix' },
          boleto: { enable: titles.forma_pagamento === 'boleto' },
          creditCard: { enable: titles.forma_pagamento === 'cartao' },
        },
      };

      const invoiceResponse = await firstValueFrom(
        this.httpService.post('https://sandbox-pay.lytex.com.br/v2/invoices', invoiceData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      const newTitle = new this.titlesModel(titles);
      return newTitle.save();
    } catch (error) {
      throw new Error('Erro ao criar título');
    }
  }
}
