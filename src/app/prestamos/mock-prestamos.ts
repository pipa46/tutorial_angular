
import { Clientes } from "../clientes/Clientes";
import { Game } from "../game/Game";
import { PrestamosPage } from "./PrestamosPage";


export const PRESTAMOS_DATA: PrestamosPage =
 {
     
    content: [
        { id: 1, nombreJuego:{id:1,title:'Gta',age:18,category: { id: 1, name: 'Categoría 1' },author: { id: 2, nombre: 'Autor 2', nacionalidad: 'Nacionalidad 2' } },nombreCliente:{id:1,nombre:'xavi'},fechaInicio:'01/01/2000',fechaFin:'02/02/2001'},
        { id: 1, nombreJuego:{id:1,title:'Gta',age:18,category: { id: 1, name: 'Categoría 1' },author: { id: 2, nombre: 'Autor 2', nacionalidad: 'Nacionalidad 2' } },nombreCliente:{id:1,nombre:'xavi'},fechaInicio:'01/01/2000',fechaFin:'02/02/2001'},
        { id: 1, nombreJuego:{id:1,title:'Gta',age:18,category: { id: 1, name: 'Categoría 1' },author: { id: 2, nombre: 'Autor 2', nacionalidad: 'Nacionalidad 2' } },nombreCliente:{id:1,nombre:'xavi'},fechaInicio:'01/01/2000',fechaFin:'02/02/2001'},
        { id: 1, nombreJuego:{id:1,title:'Gta',age:18,category: { id: 1, name: 'Categoría 1' },author: { id: 2, nombre: 'Autor 2', nacionalidad: 'Nacionalidad 2' } },nombreCliente:{id:1,nombre:'xavi'},fechaInicio:'01/01/2000',fechaFin:'02/02/2001'},
        {id: 1, nombreJuego:{id:1,title:'Gta',age:18,category: { id: 1, name: 'Categoría 1' },author: { id: 2, nombre: 'Autor 2', nacionalidad: 'Nacionalidad 2' } },nombreCliente:{id:1,nombre:'juanito'},fechaInicio:'01/01/2000',fechaFin:'02/02/2001'},
        
        
    ],  
    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 5
}
