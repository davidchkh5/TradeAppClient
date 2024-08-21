import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../_services/item.service';
import { Item } from '../_models/item';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit{

//Injection
itemService = inject(ItemService);
toastr = inject(ToastrService);
route = inject(ActivatedRoute);


//Initialization

item: Item | undefined;




ngOnInit(): void {

  if(this.item == undefined){
    const id = this.getItemId();
    if(id != undefined){
      this.getItemById(id);
    }else {
      this.toastr.error("This item id could not be found")
    }
  }
  
  
}




getItemById(id: number){
  this.itemService.getItemById(id).subscribe((result:Item) => {
    if(result){
      this.item = result;
      console.log(this.item);
    }
  },
  (error) => {
    this.toastr.error(error);
  })
}


getItemId() : number | undefined{
  var id = undefined;

  this.route.params.subscribe(param => {
    id = param['id'];
  })
  return id;
}


}
