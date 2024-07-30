import { Component, Input, OnInit, inject } from '@angular/core';
import { MemberService } from '../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../_models/member';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService);
  memberService = inject(MemberService);
  userName: string | null | undefined;
  member : Member | undefined;
  form: FormGroup;
  editable:boolean  = true;

  constructor() {
    

    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }
  
  ngOnInit() : void {
    
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName');
    });
    if(this.userName){
      this.getMember(this.userName);

      if(this.userName == this.getUsernameFromLS()){
        this.editable = true;
      }
    }
    

    
  }
  


  getMember(username:string) {
    this.memberService.getMember(username).subscribe(
      (result: Member) => {
        console.log(result);
        this.member = result;
      },
      (error) => {
        this.toastr.error(error);
        console.log(error);
      }
    )
  }

  getUsernameFromLS() : string | null {

    const userDataStr = localStorage.getItem('user');
    if(userDataStr){
      const userData = JSON.parse(userDataStr);
      return userData.userName;
    }else {
      return null;
    }

  }

}
