import { Component, OnInit } from '@angular/core';
import { TitlesService } from '../titles.service';
import { CommonModule } from '@angular/common';
import { Titles } from '../titles';

@Component({
  selector: 'app-all-titles',
  standalone: true,  // Garantir que o componente é standalone
  imports: [CommonModule],  // Não precisa mais do HttpClientModule aqui
  templateUrl: './all-titles.component.html',
  styleUrls: ['./all-titles.component.css']
})
export class AllTitlesComponent implements OnInit {

  constructor(private titlesService: TitlesService) {}

  titles: Titles[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.titlesService.get().subscribe((data) => {
      this.titles = data;
    });
  }
}
