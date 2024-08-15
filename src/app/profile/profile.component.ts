import { Component, Input, OnInit, inject } from '@angular/core';
import { MemberService } from '../_services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../_models/member';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { UpdateMember } from '../_models/updatemember';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //Injection
  route = inject(ActivatedRoute);
  router = inject(Router);

  
//Initialization
  userName: string | null | undefined;
  activeTab = 'update';



 
  
  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName');



      if (this.route.snapshot.url.length === 2) {
        this.router.navigate([`/profile`, this.userName, 'update']);
      }
    });

    
   
  }



  navigateTo(tab: string) {
    if (this.userName) {
      this.activeTab = tab;
      this.router.navigate([`/profile`, this.userName, tab]);
    }





  }
}
