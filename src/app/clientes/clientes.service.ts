import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Clientes } from './Clientes';
import{CLIENTES} from './mock-clientes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http:HttpClient
  ) { }

  getClientes():Observable<Clientes[]>
  {
    
    return this.http.get<Clientes[]>('http://localhost:8190/clientes');
  
  }
  guardarClientes(clientes:Clientes):Observable<Clientes>
  {
    let url='http://localhost:8190/clientes';

    if(clientes.id!=null)
     url+='/'+clientes.id;



     return this.http.put<Clientes>(url,clientes);
  }

  borrarCliente(idCliente:number):Observable<any>
  {
    return this.http.delete('http://localhost:8190/clientes/'+idCliente);
  }
}
