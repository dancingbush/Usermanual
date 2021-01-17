import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  //Localhost DB XAMMP htdocs for tsting
  private url = "http://localhost/auth-api/api";

  //Prodcution on my server
  //private url = "http://mooneycallans/auth-api/api"

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
  }

  onCreate(){
    /*
    * DO this on service. But for thos demo lets do t here
    * I think if login is succefsul, and we get teh token back from the login
    * page, this token is the same every time the user logins and is is unquie
    * so we can save token to local device and use t to keeo them logged in.
    * 
    */ 

    
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   Authorization: 'Bearer' + token
    // });

    // console.log("Create.ts- authoristion with berarer token fomr login: " + token);
    // this.http.post(this.url+"/create", 'body', {headers}).subscribe(console.log);

    // Do this on service. But for this demo lets do here
 const token = localStorage.getItem('token');
 //const token = "failtoken";
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    this.http.post('http://localhost/auth-api/api/create', 'body', { headers }).subscribe(response => {
      console.log("Create.page.ts: Succesfully chekd user token : chekcing if token authorised : " + JSON.stringify(response));
      console.log("Crete.ts : Route to home page.");
      this.router.navigateByUrl('/home');// defined in app.router

      
    },
    (error) => {
      console.log("Create.ts : Caught error trying to auttenticate token : " + token + " for known user: " + error);

    }
    );
  
    
    

  }//onCreat

}
