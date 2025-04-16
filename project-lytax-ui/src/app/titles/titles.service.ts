import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titles } from './titles';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Titles[]>("http://localhost:3000/titles");
  }
}
