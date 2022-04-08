import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../Category';
import { CategoryService } from '../category.service';

import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

  


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoriesComponent implements OnInit
 {
constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
  ) { }

  createCategory() {    
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  }  
  editCategory(categoria:Category)
  {
    const dialogRef=this.dialog.open(CategoryEditComponent,{
      data:{categoria:Category}
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  deleteCategory(categoria:Category)
  {
    const dialogRef=this.dialog.open(DialogConfirmationComponent,{
      data:{title:"Eliminar categoria",description:"Atencion si la borra se perderan los cambios.<br>Estas seguro?"}
    });

    dialogRef.afterClosed().subscribe(result=> {
      if(result)
      {
        this.categoryService.deleteCategory(categoria.id).subscribe(result=>{
          this.ngOnInit();
        });
      }
    });
  }


  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

 

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => this.dataSource.data = categories
    );
  }
}









