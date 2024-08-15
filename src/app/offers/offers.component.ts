import { Component, inject, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { Offer } from '../_models/offer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offersService = inject(OffersService);
  toastr = inject(ToastrService);
  offers: Offer[] | undefined;


  ngOnInit(): void {
    this.getOffers();

    console.log(this.offers);

    
  }



  getOffers(){
    this.offersService.getOffers().subscribe((result : Offer[]) => {
      this.offers = result;
    },
    (error) => {
      this.toastr.error(error);
      console.log(error);
    })
  }


}
