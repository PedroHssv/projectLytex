import { Component, OnInit } from '@angular/core';
import { CreateOrUpdate } from '../create-or-update';
import { CommonModule } from '@angular/common';
import { TitlesService } from '../titles.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-titles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-titles.component.html',
  styleUrl: './add-titles.component.css'
})
export class AddTitlesComponent implements OnInit {

  constructor(
    private titlesService:TitlesService,
    private router:Router
  ) {}

  todayISO = new Date().toISOString().split('T')[0];

  titles: CreateOrUpdate = {
    numero_titulo: '',
    nosso_numero: '',
    data_emissao: new Date().toISOString(),
    data_vencimento: new Date().toISOString(),
    valor_original: 0,
    valor_pago: null,
    data_pagamento: null,
    status: 'pendente',
    forma_pagamento: 'boleto',
    link_pagamento: '',
    cedente: {
      nome: '',
      cnpj: '',
      agencia: '',
      conta: '',
      banco: ''
    },
    sacado: {
      nome: '',
      cpf: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: ''
      }
    },
    juros_mensal_percentual: 0,
    multa_percentual: 0,
    desconto: {
      valor: 0,
      data_limite: new Date().toISOString()
    },
    historico_alteracoes: []
  };
  
  ngOnInit(): void{

  }

  create() {
    this.titlesService.create(this.titles).subscribe(() => {
      this.router.navigate(['/allTitles']);
    }, error => {
      console.error('Erro ao criar título:', error);
    });
  }

}
