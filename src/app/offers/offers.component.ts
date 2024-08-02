import { Component, inject, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { Offers } from '../_models/offers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offersService = inject(OffersService);
  toastr = inject(ToastrService);
  offers: Offers[] | undefined;


  ngOnInit(): void {
    this.getOffers();

    console.log(this.offers);
  }



  getOffers(){
    this.offersService.getOffers().subscribe((result : Offers[]) => {
      this.offers = result;
      console.log(this.offers);
    },
    (error) => {
      this.toastr.error(error);
      console.log(error);
    })
  }


}
