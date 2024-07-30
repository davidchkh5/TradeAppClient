import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseApiUrl = environment.apiUrl;
//private currentUserSource = new BehaviorSubject<User | null>(null);
 currentUser = signal<User | null>(null);
//currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
   return this.http.post<User>(this.baseApiUrl+'account/login',model).pipe(
      map((result:User) => {
        const user = result;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }


  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
    
  }
  decodeToken(token:string){
    console.log("Token : " + token);
    const payLoad = token.split(".")[1];
    const decoded = atob(payLoad);
    const returningValue = JSON.parse(decoded);
    return returningValue ;
  }

  setCurrentUser(user: User){
    const roles = this.decodeToken(user.token).role;
    if(user.role == undefined) user.role = [];
    Array.isArray(roles) ? user.role = roles : user.role.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }


  registerUser(model: any){
    return this.http.post<User>(this.baseApiUrl+'account/register', model).pipe(
      map((result:User) => {
        const user = result;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }
}
