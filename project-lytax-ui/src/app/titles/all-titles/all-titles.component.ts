import { Component, OnInit } from '@angular/core';
import { TitlesService } from '../titles.service';
import { CommonModule } from '@angular/common';
import { Titles } from '../titles';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-titles',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
