import { Test, TestingModule } from '@nestjs/testing';
import { TitlesService } from './titles.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { Titles } from './schema/titles.schema';

describe('TitlesService', () => {
  let service: TitlesService;

  const mockTitleData: Titles = {
    numero_titulo: '123456789',
    nosso_numero: '987654321',
    data_emissao: new Date('2025-01-01'),
    data_vencimento: new Date('2025-01-31'),
    valor_original: 1000.0,
    valor_pago: 0,
    data_pagamento: new Date('2025-01-01'),
    status: 'pendente',
    forma_pagamento: 'boleto',
  
    cedente: {
      nome: 'Empresa Exemplo LTDA',
      cnpj: '12345678000199',
      agencia: '1234',
      conta: '56789-0',
      banco: 'Banco Exemplo',
    },
  
    sacado: {
      nome: 'João da Silva',
      cpf: '12345678900',
      endereco: {
        rua: 'Rua Exemplo',
        numero: '100',
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP',
        cep: '01000-000',
      },
    },
  
    juros_mensal_percentual: 2.5,
    multa_percentual: 1.0,
    link_pagamento: '',
    desconto: {
      valor: 50,
      data_limite: new Date('2025-01-15'),
    },
    historico_alteracoes: [],
  };

  const mockTitleModel = {
    save: jest.fn().mockResolvedValue({ _id: 'mockId', ...mockTitleData }),
  };

  const titlesModelProvider = {
    provide: getModelToken(Titles.name),
    useValue: jest.fn(() => mockTitleModel),
  };

  const mockHttpService = {
    post: jest.fn()
      .mockReturnValueOnce(of({ data: { accessToken: 'fake-token' } }))
      .mockReturnValueOnce(of({ data: { id: 'invoice-id' } })),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'CLIENT_ID') return 'mock-client-id';
      if (key === 'CLIENT_SECRET') return 'mock-client-secret';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TitlesService,
        titlesModelProvider,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<TitlesService>(TitlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a title and call external APIs correctly', async () => {
    const result = await service.create(mockTitleData);

    expect(mockHttpService.post).toHaveBeenCalledWith(
      'https://sandbox-pay.lytex.com.br/v2/auth/obtain_token',
      {
        grantType: 'clientCredentials',
        clientId: 'mock-client-id',
        clientSecret: 'mock-client-secret',
      },
    );

    expect(mockHttpService.post).toHaveBeenCalledWith(
      'https://sandbox-pay.lytex.com.br/v2/invoices',
      expect.any(Object),
      {
        headers: {
          Authorization: 'Bearer fake-token',
        },
      },
    );

    expect(result).toEqual({ _id: 'mockId', ...mockTitleData });
    expect(mockTitleModel.save).toHaveBeenCalled();
  });
});
