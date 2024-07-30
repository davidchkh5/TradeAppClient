import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseApiUrl = environment.apiUrl;
  

  private http = inject(HttpClient);


  getMember(userName: string)  {
    return this.http.get<Member>(this.baseApiUrl+'Users/'+userName);
  }

}
