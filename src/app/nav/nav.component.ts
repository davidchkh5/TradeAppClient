import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  model: any = {};

  constructor(public accountService: AccountService){}

  login(){
    console.log(this.model);
    this.accountService.login(this.model).subscribe(
      response => {
        console.log("login successful", response);
      },
      error => {
        console.log("login failed", error);
      }
    );
  }

  logOut(){
    this.accountService.logout();
    this.model = {};
  }


}
