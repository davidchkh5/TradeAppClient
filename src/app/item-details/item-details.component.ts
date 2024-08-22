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
cacheKey : string = 'cacheItem';
item: Item | undefined;




ngOnInit(): void {

  const itemId = this.getItemId();

  if(itemId == undefined) {
    this.toastr.error("This item id could not be found");
  } else {
    this.loadItemDetail(itemId);
  }



  // if(this.item == undefined){
  //   const id = this.getItemId();
  //   if(id != undefined){
  //     this.getItemById(id);
  //   }else {
  //     this.toastr.error("This item id could not be found")
  //   }
  // }
  
  console.log("huehuehue");;
  console.log(this.item);
  
}



loadItemDetail(id: number){

 const cachedItem =  this.getCacheItem(id);

 if(cachedItem != undefined) {
  this.item = cachedItem;
  console.log("loaded item from cache", this.item);
 }else {
  console.log("getting item by id");
  this.getItemById(id);
 }

}


  getItemById(id: number){
  ( this.itemService.getItemById(id)).subscribe((result:Item) => {
    if(result){
      this.item = result;
      this.setCacheItem(id, result);
      console.log("loaded item from api", this.item);
    }
  },
  (error) => {
    this.toastr.error(error);
  });
}


getItemId() : number | undefined{
  var id = undefined;

  this.route.params.subscribe(param => {
    id = param['id'];
  })
  return id;
}



getCacheItem(id: number) : Item | undefined {
  const itemStr = localStorage.getItem(this.cacheKey+id);

  if(itemStr){
    var itemObj = JSON.parse(itemStr);
  } else {
    return undefined;
  }
  return itemObj;
}



setCacheItem(id : number, item: Item) {

  localStorage.setItem(this.cacheKey+id, JSON.stringify(item));


}


}
