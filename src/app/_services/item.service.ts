import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Item } from '../_models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseApiUrl = environment.apiUrl;

  http = inject(HttpClient);


  getSelfItems(){
    return this.http.get<Item[]>(this.baseApiUrl+'Items/personal');
  }

  addItems(){

  }

  deleteItems(id: number) {
    return this.http.delete<string>(this.baseApiUrl+'Items/'+id, {responseType: 'text' as 'json'});
  }
  
}
