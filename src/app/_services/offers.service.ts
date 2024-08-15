import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Offer } from '../_models/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  baseApiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getOffers(){
    return this.http.get<Offer[]>(this.baseApiUrl + 'Items/offers');
  }

  
}
