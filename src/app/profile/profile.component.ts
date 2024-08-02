import { Component, Input, OnInit, inject } from '@angular/core';
import { MemberService } from '../_services/member.service';
import { ActivatedRoute } from '@angular/router';
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
  
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService);
  memberService = inject(MemberService);
  userName: string | null | undefined;
  member : UpdateMember | undefined;
  form: FormGroup;
  editable:boolean  = true;
  isSubmitted: boolean = false;
  tmpFormgroup = new FormGroup([]);
  constructor() {
    

    this.form = new FormGroup({
      knownAs: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }
  
  ngOnInit() : void {
    this.isSubmitted = true;

    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName');
    });
    if(this.userName){
      this.getMember(this.userName);

      if(this.userName == this.getUsernameFromLS()){
        this.editable = true;
      }
    }

    this.form.valueChanges.subscribe((result) =>{

      console.log(this.tmpFormgroup);
    //Here i want to check if tmpgroup is empty or it has some formcontrol elements
      
    if(isEqual(result,this.member)){
      this.isSubmitted = true;

    }else{
      this.isSubmitted = false;
    }

      this.tmpFormgroup = result;
      // if(this.isSubmitted){
      //   this.isSubmitted = false;
      // }
      
    })
    
    
  }
  


  getMember(username:string) {
    this.memberService.getMember(username).subscribe(
      (result: Member) => {
        this.member = this.mapToUpdateMember(result);

        this.form.patchValue({              
          knownAs: this.member.knownAs,
          country: this.member.country,
          city: this.member.city,
          phoneNumber: this.member.phoneNumber,
          email: this.member.email
        });

        console.log(this.form.value)
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
  
   mapToUpdateMember(data: Member): UpdateMember {
    return {
      city: data.city,
      country: data.country,
      email: data.email,
      knownAs: data.knownAs,
      phoneNumber: data.phoneNumber
    };
  }

  updateUser(){

    this.memberService.updateUser(this.form.value).subscribe(
      () => {
        this.toastr.success("Profile updated successfully");
        this.isSubmitted = true;
        
      },
      error => {
        this.toastr.error(error);
      }
    )
  }
}
