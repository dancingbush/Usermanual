import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';




export interface Student{
  id: number;
  name : string;
  address : string;
  phone : string;
}

export interface Test{
  id: number;
  investigation : string;
  SpecimanType : string;
  container : string;
  TAT : string;
  refrange : string;
  Lab : string;
  Comments : string;
  Alias : string;
  phone : string;
  profileTests : string;
  phoneCriteria : string;
  referred : string;
  refWebsite : string;
  refNumber : string;
  username : string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  /**Fields, local host or wherevr Apache sever is must be up an runnong
  * The url is poitng at the Apcahe settings and PHOP settings requirde for CRUD
  * on the XAMMP htdocs url
  * The url with inex at end is like this : http://localhost/crud_api/api/app.php/student/?id=2
  */

  //GET requests syntax http://localhost/crud_api/api/app.php/students/?id=1
  //private url = 'http://localhost/crud_api/api/app.php/students';
  
  //LOCALHOST TEsts phpMyAdmon database
  private url = 'http://localhost/crud_api/api/app.php/Tests';

  //URL for mooneycallans.com server
  //private url = 'http://mooneycallans.com/crud_api/api/app.php/Tests';
  

  constructor(private http : HttpClient) {
    
  }

  getAll(){
    //return this.http.get<[Student]>(this.url);
    console.log("student.service-59- GET ALL called..");
    return this.http.get<[Test]>(this.url);

  }

  get (id: string){

    return this.http.get<Student>(this.url + '/?' + id);

  }

  //create (student : Student){
    create (test : Test){

    console.log("student.service.ts: POST new test: name : " + test.investigation + " Type: " + test.SpecimanType); 
    
    return this.http.post(this.url, test);
   

  }

  //update (student : Student, id : number){
    update (test : Test, id : number){
    /**
     * URL syntax in postman works - for exmaoe index 18 in DB
     * http://localhost/crud_api/api/app.php/students/?id=18
     */
    
    console.log("Student Srevice.ts: update (put): " + this.url + '/?id=' + id, test);

    return this.http.put(this.url + '/?id=' + id, test);

  }

remove(id : number){
  console.log("STUDENT.SERVICE.ts: 81- removing: "+ this.url + '/?id=' + id);
  return this.http.delete(this.url + '/?id=' + id);
}
}
