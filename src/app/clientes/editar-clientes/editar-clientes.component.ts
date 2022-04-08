import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clientes } from '../Clientes';
import { ClientesService } from '../clientes.service';


@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss']
})
export class EditarClientesComponent implements OnInit {

  cliente:Clientes;

  constructor(
    public dialogRef:MatDialogRef<EditarClientesComponent>,
    private Servicio_Cliente:ClientesService,
    @Inject (MAT_DIALOG_DATA) public data:any
  ) 
  { }

  ngOnInit(): void
   {
     if(this.data.cliente!=null)
     {
       this.cliente=this.data.cliente;
      //this.cliente=Object.assign({},this.data.cliente);
     }
      else
     {
     this.cliente=new Clientes();
    }
  }
  Guardar()
  {
    this.Servicio_Cliente.guardarClientes(this.cliente).subscribe(result=>{
      this.dialogRef.close();
    });
  }

  Cancelar()
  {
    this.dialogRef.close();
  }

}
