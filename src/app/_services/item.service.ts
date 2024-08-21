import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Item } from '../_models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseApiUrl = environment.apiUrl;
  currentItem = signal<Item | null>(null);

  http = inject(HttpClient);


  getSelfItems(){
    return this.http.get<Item[]>(this.baseApiUrl+'Items/personal');
  }

  addItems(formData: FormData){
    return this.http.post<Item>(this.baseApiUrl+'Items/add', formData, {responseType: 'text' as 'json'});
  }

  deleteItems(id: number) {
    return this.http.delete<string>(this.baseApiUrl+'Items/'+id, {responseType: 'text' as 'json'});
  }

  getItemById(id: number) {
    return this.http.get<Item>(this.baseApiUrl + `Items/${id}`, {responseType: 'text' as 'json'});
  }
  
}
