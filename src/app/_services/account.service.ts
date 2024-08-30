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

 currentUser = signal<User | null>(null);


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
    localStorage.clear();
    
    this.currentUser.set(null);
    
  }
  decodeToken(token:string){
    console.log("Token : " + token);
    const payLoad = token.split(".")[1];
    const decoded = atob(payLoad);
    const returningValue = JSON.parse(decoded);
    console.log("tokeen");
    console.log(returningValue);
    return returningValue ;   
  }

  setCurrentUser(user: User){
    const exp = this.decodeToken(user.token).exp;
    const roles = this.decodeToken(user.token).role;

    if(exp == undefined) console.log("Exp is undefined");

    if(this.differenceExpDate(exp) > 0){
      if(user.role == undefined) user.role = [];
      Array.isArray(roles) ? user.role = roles : user.role.push(roles);
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser.set(user);
    } else {
      this.logout();
    }


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


  differenceExpDate(expUnix: string) : number{

    const expInt = parseInt(expUnix);

    const date = new Date(expInt * 1000);
    const now = new Date();
    console.log(date);

    const difference = (date.getTime() - now.getTime());
    
    
    return difference;
  }
}
