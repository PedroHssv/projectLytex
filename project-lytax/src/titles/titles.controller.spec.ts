import { Test, TestingModule } from '@nestjs/testing';
import { TitlesController } from './titles.controller';
import { TitlesService } from './titles.service';
import { Titles } from './schema/titles.schema';

describe('TitlesController', () => {
  let controller: TitlesController;
  let titlesService: TitlesService;

  // Mock do TitlesService
  const mockTitlesService = {
    getAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitlesController],
      providers: [
        { provide: TitlesService, useValue: mockTitlesService },
      ],
    }).compile();

    controller = module.get<TitlesController>(TitlesController);
    titlesService = module.get<TitlesService>(TitlesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of titles', async () => {
      const mockTitles = [
        {
          numero_titulo: '12345',
          nosso_numero: '67890',
          data_emissao: new Date('2025-01-01'),
          data_vencimento: new Date('2025-12-31'),
          valor_original: 1000.0,
          valor_pago: 0,
          data_pagamento: null,
          status: 'pendente',
          forma_pagamento: 'boleto',
          cedente: {
            nome: 'Empresa X',
            cnpj: '12.345.678/0001-99',
            agencia: '1234',
            conta: '567890',
            banco: 'Banco X',
          },
          sacado: {
            nome: 'Cliente Y',
            cpf: '123.456.789-00',
            endereco: {
              rua: 'Rua A',
              numero: '123',
              bairro: 'Bairro B',
              cidade: 'Cidade C',
              uf: 'SP',
              cep: '12345-678',
            },
          },
          juros_mensal_percentual: 2,
          multa_percentual: 5,
          link_pagamento: '',
          desconto: {
            valor: 50,
            data_limite: new Date('2025-02-01'),
          },
          historico_alteracoes: [],
        },
      ];

      mockTitlesService.getAll.mockResolvedValue(mockTitles);

      const result = await controller.getAll();

      expect(result).toEqual(mockTitles);
      expect(mockTitlesService.getAll).toHaveBeenCalled();
    });
  });

  describe('createTitles', () => {
    it('should create and return a title', async () => {
      const newTitle: Titles = {
        numero_titulo: '54321',
        nosso_numero: '98765',
        data_emissao: new Date('2025-02-01'),
        data_vencimento: new Date('2025-11-30'),
        valor_original: 1500.0,
        valor_pago: 0,
        data_pagamento: new Date('2026-04-01'),
        status: 'pendente',
        forma_pagamento: 'pix',
        cedente: {
          nome: 'Empresa Y',
          cnpj: '98.765.432/0001-11',
          agencia: '4321',
          conta: '098765',
          banco: 'Banco Y',
        },
        sacado: {
          nome: 'Cliente Z',
          cpf: '987.654.321-00',
          endereco: {
            rua: 'Rua B',
            numero: '456',
            bairro: 'Bairro C',
            cidade: 'Cidade D',
            uf: 'RJ',
            cep: '98765-432',
          },
        },
        juros_mensal_percentual: 3,
        multa_percentual: 10,
        link_pagamento: 'https://example.com',
        desconto: {
          valor: 100,
          data_limite: new Date('2025-04-01'),
        },
        historico_alteracoes: [],
      };

      const mockCreatedTitle = { ...newTitle, _id: '123' };

      mockTitlesService.create.mockResolvedValue(mockCreatedTitle);

      const result = await controller.createTitles(newTitle);

      expect(result).toEqual(mockCreatedTitle);
      expect(mockTitlesService.create).toHaveBeenCalledWith(newTitle);
    });
  });
});
