import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/Pageable';
import { Autor } from './Author';
import { AuthorPage } from './AuthorPage';
import { AUTHOR_DATA } from './mock-autores';
import { AUTHOR_DATA_LIST } from './mock-autores-list';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthorService
 {

  constructor(
    private http:HttpClient
  ) { }

  obtenerAutores(pageable:Pageable):Observable<AuthorPage>
  {
    return  this.http.post<AuthorPage>('http://localhost:8190/autor', {pageable:pageable});
    //return of(AUTHOR_DATA);
  }
  guardarAutores(autor:Autor):Observable<void>
  {
    let url = 'http://localhost:8190/autor';
    if (autor.id != null) url += '/'+autor.id;

    return this.http.put<void>(url, autor);
  }

  borrarAutor(idAutor:number):Observable<void>
  {
    return this.http.delete<void>('http://localhost:8190/autor/'+idAutor);

  }

  getAllAutores():Observable<Autor[]>
  {
    return this.http.get<Autor[]>('http://localhost:8190/autor');
  }
}
