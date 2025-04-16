import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document } from "mongoose";

export type TitlesDocument = Titles & Document;

@Schema({ collection: 'titles', timestamps: true })
export class Titles {
    @Prop({ required: true })
    numero_titulo: string;
  
    @Prop({ required: true })
    nosso_numero: string;
  
    @Prop({ required: true })
    data_emissao: Date;
  
    @Prop({ required: true })
    data_vencimento: Date;
  
    @Prop({ required: true })
    valor_original: number;
  
    @Prop({ default: null })
    valor_pago: number;
  
    @Prop({ default: null })
    data_pagamento: Date;
  
    @Prop({ 
      enum: ['pendente', 'pago', 'vencido', 'cancelado'], 
      default: 'pendente' 
    })
    status: string;
  
    @Prop({ type: Object })
    cedente: {
      nome: string;
      cnpj: string;
      agencia: string;
      conta: string;
      banco: string;
    };
  
    @Prop({ type: Object })
    sacado: {
      nome: string;
      cpf: string;
      endereco: {
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        uf: string;
        cep: string;
      };
    };
  
    @Prop({ default: 0 })
    juros_mensal_percentual: number;
  
    @Prop({ default: 0 })
    multa_percentual: number;
  
    @Prop({ type: Object })
    desconto: {
      valor: number;
      data_limite: Date;
    };
  
    @Prop({ type: [Object], default: [] })
    historico_alteracoes: {
      data: Date;
      alteracao: string;
    }[];
}

export const TitlesSchema = SchemaFactory.createForClass(Titles);

