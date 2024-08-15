import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../_services/item.service';
import { Item } from '../_models/item';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddItemsComponent } from '../add-items/add-items.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
 
//injection  
itemsService = inject(ItemService);
toastr = inject(ToastrService);
dialog = inject(MatDialog);


items: Item[] | undefined; 


ngOnInit(): void {
  this.getItems();

}


openDeleteConfirmationDialog(id: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { message: 'Are you sure you want to delete this item?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      // Handle the confirmation logic here
      this.deleteItem(id);

    } else {
      console.log('Cancelled!');
    }
  });

}


deleteItem(id: number){
  console.log("Deleting item with Id: ", id);
  this.itemsService.deleteItems(id).subscribe(() => {
    this.toastr.success("Item was deleted successfully");
    this.items = this.items?.filter(item => item.id !== id);
    // window.location.reload();
  },
  (error) => {
    console.log(error);
    this.toastr.error("Item could not be deleted: " + error);
  });
}

getItems(){
  this.itemsService.getSelfItems().subscribe((result:Item[]) => {
    this.items = result;
    console.log(this.items);
  },
  (error) => {
    console.log(error);
    this.toastr.error(error);
  }
)
}

openDialog() {
  const dialogRef = this.dialog.open(AddItemsComponent, {
    width: '250px'
  });

  dialogRef.afterClosed().subscribe( result => {
    if(result){
      console.log("result Data:");
      console.log(result);
    }
  })
}



}
