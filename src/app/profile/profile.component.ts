import { Component, Input, OnInit, inject } from '@angular/core';
import { MemberService } from '../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../_models/member';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  userName: string | null | undefined;
  memberService = inject(MemberService);
  member : Member | undefined;
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService);

  
  ngOnInit() : void {
    
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName');
    });
    if(this.userName){
      this.getMember(this.userName);
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


}
