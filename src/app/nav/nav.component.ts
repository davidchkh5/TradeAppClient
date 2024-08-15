import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  model: any = {};
  currentUserName = "";
  router = inject(Router);
  dialog = inject(MatDialog);

  constructor(public accountService: AccountService, private toastrService: ToastrService){}

  login(){
    console.log(this.model);
    this.accountService.login(this.model).subscribe(
      response => {
        console.log("login successful", response);
        
      },
      (error : HttpErrorResponse) => {
       if(error.status === 401){
        this.toastrService.error("Unauthorized: Incorrect username or password.");
       }else {
        this.toastrService.error("An unexpected error occurred.");
       }
      }
    );
  }

  logOut(){
    
    this.accountService.logout();
    this.model = {};
    this.dialog.closeAll();
    // window.location.reload();
    this.router.navigate(['/']); 
    
  }


  toCamelCase(name: string | null | undefined): string | null{
    if(!name) return null;

    return name.charAt(0).toUpperCase() + name.substring(1, (name.trim().length) );

  }


}
