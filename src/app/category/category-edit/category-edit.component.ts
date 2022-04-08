import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import{Category} from '../Category';



@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit
 {
   categoria: Category;

  constructor(
    public dialogRef:MatDialogRef<CategoryEditComponent>,
    private categoryService:CategoryService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void
  {
    if(this.data.categoria!=null)
    {
      this.categoria=Object.assign({},this.data.categoria);
    }
        
    else
    this.categoria=new Category();    
  }

  Guardar()
  {
    this.categoryService.guardarCategorias(this.categoria).subscribe(result=>
      {this.dialogRef.close();});
  }
  Cerrar()
  {
    this.dialogRef.close();
  }


}
