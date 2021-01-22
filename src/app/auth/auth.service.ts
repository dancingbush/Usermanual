import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { RegisterUser} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Local host - XAMMMp htdocs for testing
  //private url = "http://localhost/auth-api/api";
  
  //MY SERVER mooneycallans/auth-api/aoi
private url = "http://mooneycallans.com/auth-api/api";

  constructor(private http: HttpClient) { }

  register(user: RegisterUser){
    
    console.log("Authtenticrea.ts: 18- Regsiter uesr: email = " + user.email
    + " : firtsname " + user.firstname + " : lastnane " + user.lastname + " matching password object: " + user.matching_passwords + " : and  matching password array " + user.matching_passwords.password +  " . calling post uRL : " + this.url+"/register");
    return this.http.post(this.url+"/register", user);
  }


  login (credentials : User): Observable<string> {
    console.log("Auth.service: Login- POST login for " + credentials.email);
    return this.http.post<{token: string}>(this.url+"/login", credentials).pipe(
      map(response => response.token)
    );
  }
}
