import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Autor } from '../Author';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit
 {
   
  autor!:Autor;
  constructor
  (
    public dialogRef:MatDialogRef<AuthorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private authorService:AuthorService

  ) { }

  ngOnInit(): void
   {
     if(this.data.autor!=null)
     {
       this.autor=Object.assign({},this.data.autor);
     }
     else
     this.autor=new Autor();
  }

  Cerrar()
  {
    this.dialogRef.close();
  }
  Guardar()
  {
    this.authorService.guardarAutores(this.autor).subscribe(result=>
       {
      this.dialogRef.close();
    });
  }

}
