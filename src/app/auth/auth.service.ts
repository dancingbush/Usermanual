import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Local host - XAMMMp htdocs for testing
  //private url = "http://localhost/auth-api/api";
  
  //MY SERVER mooneycallans/auth-api/aoi
private url = "http://mooneycallans.com/auth-api/api";

  constructor(private http: HttpClient) { }

  register(user: User){
    
    console.log("Authtenticrea.ts: 18- calling post uRL : " + this.url+"/register");
    return this.http.post(this.url+"/register", user);
  }


  login (credentials : User): Observable<string> {
    console.log("Auth.service: Login- POST login for " + credentials.username);
    return this.http.post<{token: string}>(this.url+"/login", credentials).pipe(
      map(response => response.token)
    );
  }
}
