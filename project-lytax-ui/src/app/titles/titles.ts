export interface Titles {
    _id: string;
    numero_titulo: string;
    nosso_numero: string;
    data_emissao: string;
    data_vencimento: string;
    valor_original: number;
    valor_pago: number | null;
    data_pagamento: string | null;
    status: 'pendente' | 'pago' | 'vencido' | 'cancelado';
  
    cedente: {
      nome: string;
      cnpj: string;
      agencia: string;
      conta: string;
      banco: string;
    };
  
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
  
    juros_mensal_percentual: number;
    multa_percentual: number;
  
    desconto: {
      valor: number;
      data_limite: string;
    };
  
    historico_alteracoes: {
      data: string;
      alteracao: string;
    }[];
  }
  