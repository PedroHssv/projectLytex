import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titles } from './titles';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  constructor(private http: HttpClient) {}

  get() {
    const token = localStorage.getItem("angular19Token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Titles[]>("http://localhost:3000/titles", { headers });
  }
}
