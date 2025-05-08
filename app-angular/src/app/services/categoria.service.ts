import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/categoria'; //URL da API

  constructor(private http: HttpClient) { }

  list(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl) as Observable<Categoria[]>;
 }
}
