import { FOCUS_TRAP_INERT_STRATEGY } from '@angular/cdk/a11y';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/category/Category';
import { CategoryService } from 'src/app/category/category.service';
import { Clientes } from 'src/app/clientes/Clientes';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable_p';

import { Game } from 'src/app/game/Game';
import { GameService } from 'src/app/game/game.service';
import { Prestamos } from '../Prestamos';
import { PrestamosService } from '../prestamos.service';
import { PrestamosPage } from '../PrestamosPage';

@Component({
  selector: 'app-prestamos-edit',
  templateUrl: './prestamos-edit.component.html',
  styleUrls: ['./prestamos-edit.component.scss']
})
export class PrestamosEditComponent implements OnInit {

  
  prestamos ?: Prestamos;
  prestamo:PrestamosPage;
  cliente?:Clientes;
  x:boolean=false;
  guardar:boolean=false;
  clientes:Clientes[];
  game:Game[];
  categories:Category[];
  prestamosForm?:FormGroup;

  

    constructor(
        public dialogRef: MatDialogRef<PrestamosEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private prestamoService: PrestamosService,
        private clientesService:ClientesService,
        private gameService:GameService,
        public dialog: MatDialog,
        private fb:FormBuilder
        
        
    ) { }

  
 

   
   


    ngOnInit(): void 
    {
        
        this.prestamosForm=this.fb.group(
            {
                
                FechadeInicio:['',Validators.required],
                FechaFin:['',Validators.required],
                
            },{validator:[this.validacion(),this.comprobacion()
        ]});
            
        
       

        let title:string;
        let categoryId:number;
        let clienteId:number;
        let pageable:Pageable;
        let juegoId:number;
        let fecha:String;

        
        
        if (this.data.prestamos != null) {
            this.prestamos = Object.assign({}, this.data.prestamos);
        }
        else {
            this.prestamos = new Prestamos();
        }

        this.clientesService.getClientes().subscribe(clientes=>{
            this.clientes=clientes;

            if(this.prestamos.nombreCliente!=null)
            {
                let filterClientes:Clientes[]=clientes.filter(cliente=>cliente.id==this.data.prestamos.nombreCliente.id);
                
                if(filterClientes!=null)
                {
                    this.prestamos.nombreCliente=filterClientes[0];
                    
                }
            }
        }

        );

        
        this.gameService.getGames(title,categoryId).subscribe(game=>
            {
                this.game=game
                if(this.prestamos.nombreJuego!=null)
                {
                    let gameFilter:Game[]=game.filter(game=>game.id==this.data.prestamos.nombreJuego.id);
                    if(gameFilter!=null)
                    {
                        this.prestamos.nombreJuego=gameFilter[0];
                    }
                }
            })
            

 
          
        } 
        
      validacion():{[key:string]:any}|null
      {
              return(c:AbstractControl):{[ key: string]:boolean} | null=>
              { 
                  let f_i=new Date(c.get('FechadeInicio').value).getTime();
                  let f_f=new Date(c.get('FechaFin').value).getTime();

                  
                  let diff=f_f-f_i;
                   
                  if((diff/(1000*60*60*24))<=14)
                    return null;
                  else {
                   
                    c.get('FechaFin').setErrors({fecha_incorrecta:true})
                    return {fecha_incorrecta:true};
                  }
              };
      
              

              
          
      }

        comprobacion():{[key:string]:any}|null
         {
            return(c:AbstractControl):{[ key: string]:boolean} | null=>
              { 
                  let f_i=new Date(c.get('FechadeInicio').value);
                  let f_f=new Date(c.get('FechaFin').value);

                  
                  
                   
                  if(f_f>f_i)
                    return null;
                  else 
                    return {fecha_incorrecta:true};
                  
              };
        }         
    
      
    onSave()
     {
              
        this.prestamos.fechaFin=this.prestamosForm.get('FechaFin').value;
        this.prestamos.fechaInicio=this.prestamosForm.get('FechadeInicio').value;
                
        this.prestamoService.guardarPrestamos(this.prestamos).subscribe(result =>
        {
          this.dialogRef.close();
        }) ;
                
                        
            
                
    }  


    onClose() {
        this.dialogRef.close();
    }
    
  
   
    
    
}


