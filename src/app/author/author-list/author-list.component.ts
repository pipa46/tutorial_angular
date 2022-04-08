import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/Pageable';
import { AuthorEditComponent } from '../author-edit/author-edit.component';
import { AuthorService } from '../author.service';
import { Autor } from '../Author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit
 {

  constructor(
    private authorService:AuthorService,
    public dialog:MatDialog,
  ) { }

  n_pagina :number=0;
  tamano_pagina :number=5;
  elementos_totales:number=0;

  dataSource=new MatTableDataSource<Autor>();
  displayedColumns:string[]=['id','nombre','nacionalidad','action'];

  ngOnInit(): void
   {
     this.loadPage();
  }

  loadPage(event?:PageEvent)
  {
   

      let pageable : Pageable =  {
          n_pagina: this.n_pagina,
          tamaño_pagina: this.tamano_pagina,
          sort: [{
              propiedad: 'id',
              direccion: 'ASC'
          }]
      }

      if (event != null) {
          pageable.tamaño_pagina = event.pageSize
          pageable.n_pagina = event.pageIndex;
      }

      this.authorService.obtenerAutores(pageable).subscribe(data => {
          this.dataSource.data = data.contenido;
          this.n_pagina = data.pageable.n_pagina;
          this.tamano_pagina = data.pageable.tamaño_pagina;
          this.elementos_totales = data.elementos_totales;
      });

  }
  
  crearAutor()
  {
    const dialogRef=this.dialog.open(AuthorEditComponent,{
      data:{}
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  editarAutor(autor:Autor)
  {
    const dialogRef=this.dialog.open(AuthorEditComponent,{
      data:{autor:Autor}
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  borrarAutor(author: Autor) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: { title: "Eliminar autor", description: "Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?" }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.authorService.borrarAutor(author.id).subscribe(result =>  {
                this.ngOnInit();
            }); 
        }
    });
  }
}


