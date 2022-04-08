import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from '../Clientes';
import { ClientesService } from '../clientes.service';
import{MatDialog} from '@angular/material/dialog';
import { EditarClientesComponent } from '../editar-clientes/editar-clientes.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';


@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  dataSource=new MatTableDataSource<Clientes>();
  displayedColumns: string[]=['id','nombre','action'];

  constructor(
    private clientes_servicio:ClientesService,
    public dialog:MatDialog,
  ) { }

  ngOnInit(): void 
  {
    this.clientes_servicio.getClientes().subscribe(clientes=>this.dataSource.data=clientes);
  }
  crearClientes()
  {
    const dialogRef=this.dialog.open(EditarClientesComponent,{
      data:{}
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    });
  }
  Guardarclientes(clientes:Clientes)
  {
    const dialogRef=this.dialog.open(EditarClientesComponent,{
      data:{clientes:Clientes}
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    });
  }
  borrarClientes(clientes:Clientes)
  {
    const dialogRef=this.dialog.open(DialogConfirmationComponent,{
      data:{title:"Eliminar Cliente",description:"Si lo borra se perderá..<br>Está seguro?"}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result)
      {
        this.clientes_servicio.borrarCliente(clientes.id).subscribe(result=>{
          this.ngOnInit();
        });
      }
    });
  }

}
