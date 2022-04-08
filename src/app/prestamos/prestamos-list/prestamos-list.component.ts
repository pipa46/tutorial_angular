import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/category/Category';
import { Clientes } from 'src/app/clientes/Clientes';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Game } from 'src/app/game/Game';
import { GameService } from 'src/app/game/game.service';
import { Pageable } from '../../core/model/page/Pageable_p';
import { Prestamos } from '../Prestamos';
import { PrestamosEditComponent } from '../prestamos-edit/prestamos-edit.component';
import { PrestamosService } from '../prestamos.service';
import { PrestamosPage } from '../PrestamosPage';


@Component({
  selector: 'app-prestamos-list',
  templateUrl: './prestamos-list.component.html',
  styleUrls: ['./prestamos-list.component.scss']
})
export class PrestamosListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

 
 
  
  prestamo:Prestamos;
  pageable:Pageable;
  filterClientes:Clientes;
  filterFecha:string;
  filterTituloJuego:Game;
  clientes:Clientes[];
  games:Game[];


  dataSource = new MatTableDataSource<Prestamos>();
  displayedColumns: string[] = ['id', 'nombreJuego', 'nombreCliente','fechaInicio','fechaFin', 'action'];

  constructor(
      private prestamosService: PrestamosService,
      public dialog: MatDialog,
      private gameService:GameService,
      private clienteService:ClientesService,
      
  ) { }

  ngOnInit(): void {

    this.loadPage();

      
       
  }
  
  onCleanFilter(): void {
    
    this.filterClientes = null;
    this.filterTituloJuego=null;
    this.filterFecha=null;

    this.onSearch();
}

onSearch(): void {
  
    

    let pageable : Pageable 
    =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: 'id',
            direction: 'ASC'
        }]
    }
    
   
    
    let clienteId = this.filterClientes != null ? this.filterClientes.id : null;
    let juegoId = this.filterTituloJuego != null ? this.filterTituloJuego.id : null;
    let fecha=this.filterFecha!=null ? this.filterFecha :null;
    this.prestamosService.filtrarPrestamos(clienteId,pageable,juegoId,fecha).subscribe(data=>
        {
            this.dataSource.data=data.content;
            this.pageNumber = data.pageable.pageNumber;
          this.pageSize = data.pageable.pageSize;
          this.totalElements = data.totalElements;
        });
}
  loadPage(event?: PageEvent) {

    let clienteId:number;
    let juegoId:number;
     let fecha:string=null;

      let pageable : Pageable =  {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          sort: [{
              property: 'id',
              direction: 'ASC'
          }]
      }

      if (event != null) {
          pageable.pageSize = event.pageSize
          pageable.pageNumber = event.pageIndex;
      }
     
      this.prestamosService.filtrarPrestamos(clienteId,pageable,juegoId,fecha).subscribe(data=>
        {
            this.dataSource.data=data.content;
            this.pageNumber = data.pageable.pageNumber;
          this.pageSize = data.pageable.pageSize;
          this.totalElements = data.totalElements;
        })
        this.clienteService.getClientes().subscribe(clientes=>this.clientes=clientes)

        this.gameService.getGames().subscribe(games=>this.games=games);

  }  

  crearPrestamos() {      
      const dialogRef = this.dialog.open(PrestamosEditComponent, {
          data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
      });      
  }  

  editarPrestamos(prestamos: Prestamos) {    
      const dialogRef = this.dialog.open(PrestamosEditComponent,
         {
          data: {}
      });

      dialogRef.afterClosed().subscribe(result =>
         {
             
             
                      this.ngOnInit();
                
             });
          
               
          
          
        
  }

  borrarPrestamos(prestamos: Prestamos) {    
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: "Eliminar prestamos", description: "Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el prestamo?" }
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.prestamosService.borrarPrestamos(prestamos.id).subscribe(result =>  {
                  this.ngOnInit();
              }); 
          }
      });
  }  
}
