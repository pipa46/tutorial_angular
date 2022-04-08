import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRESTAMOS_DATA } from './mock-prestamos';
import { Pageable } from '../core/model/page/Pageable_p';
import { Prestamos } from './Prestamos';
import { PrestamosPage } from './PrestamosPage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  prestamos?:Prestamos;

  constructor(
    private http:HttpClient
  ) { }

  getPrestamos(pageable: Pageable): Observable<PrestamosPage> 
  {
    //return this.http.post<PrestamosPage>('http://localhost:8189/prestamos',{pageable:pageable});
   return of(PRESTAMOS_DATA);
  }

guardarPrestamos(prestamos: Prestamos): Observable<void> 
{
  let url='http://localhost:8190/prestamos';

  if(prestamos.id!=null)
  {
    url+='/'+prestamos.id;
  }
    return this.http.put<void>(url,prestamos);
}

borrarPrestamos(idPrestamo : number): Observable<any> 
{
    return this.http.delete('http://localhost:8190/prestamos/'+idPrestamo);
} 
filtrarPrestamos(clienteId?:number,pageable?:Pageable,juegoId?:number,fecha?:string):Observable<PrestamosPage>
{
  
  return this.http.post<PrestamosPage>(this.composeFindUrl(clienteId,juegoId,fecha),{pageable:pageable});
}


private composeFindUrl( clienteId?: number,juegoId?: number,fecha?:string) : string {
  let params = '';
 
  
  if (fecha != null) {
    if (params != '') params += "&";
    params += "fecha="+fecha;
    }
   console.log(fecha);

  if (juegoId != null) {
    if (params != '') params += "&";
    params += "idJueg="+juegoId;
}
   console.log(juegoId);
  if (clienteId != null) {
      if (params != '') params += "&";
      params += "idCliente="+clienteId;
  }

  let url = 'http://localhost:8190/prestamos';

  if (params == '') return url;
  else return url + '?'+params;
}

}
