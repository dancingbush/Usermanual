import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Test, StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.page.html',
  styleUrls: ['./student-modal.page.scss'],
})
export class StudentModalPage implements OnInit {
// Recive test object from Home.page.ts updetest()

@Input() test : Test;
//@Input() student : Student;
isUpdate = false; //check if teh student modal is used for update or not

// data to be updated
data = {
  id: 0,
  investigation : '',
  SpecimanType : '',
  container : '',
  TAT : '',
  refrange : '',
  Lab : '',
  Comments : '',
  Alias : '',
  phone : '',
  profileTests : '',
  phoneCriteria : '',
  referred : '',
  refWebsite : '',
  refNumber : '',
  username: ''
}

// data = {
//   name : '',
//   address: '',
//   phone: ''
// }
  constructor(private modalCtrl : ModalController, private service : StudentService) { }

  ngOnInit() {
    /*
    *  IF student not null means we ae in update mode 
    * and student has been passed from Home.page.ts updateStuednt(student
    */
    if (this.test){
      console.log("Student-modal-page: ngOnIt-  Recuved test object ID " + this.test.id + " so in upDate mode");
      this.isUpdate = true;
      this.data = this.test;
    } 
  
  }

  closeModal(){
    //Pass cancelled back to home page
    console.log("StudentModalPage.ts: CloseModal- action cancelled." );

    this.modalCtrl.dismiss(null, "closed");

  }

  onSubmit(form : NgForm){
    console.log("StudentModalPage.ts: onSubmit form new test entered: " + form.value);
    //const student = form.value;
    const test = form.value;
    if (this.isUpdate){
      console.log("Student-modal-og: onSubmit- updating test ID : " + this.test.id);
        this.service.update(test, this.test.id).subscribe(()=> {
        //append id to the update stdent object
        test.id = this.test.id;
        //dismiss and pass message back to HOme page key : vlaue pair so list can be updated
      this.modalCtrl.dismiss(test, "updated");
    });
    }else{
      console.log("Studen-modal.onSubmit: Creating new test : " + test.investigation);
      this.service.create(test).subscribe(response => {
        
      console.log("Student-modal-pg 52: Creating new test ID - " + test.id + " : reposne = "+ response);
      //dismiss mdoal and pass new test to home page
      this.modalCtrl.dismiss(response, "created");
      },
      error => {
        console.log("Student-modal: Create new test subscibe error: " + JSON.stringify(error));
        
      },
      ()=>{
          //no errors, route back to HOme.oage
          console.log("Studen.modal.ts: 91-Create new Student subscribe: No errors");

      }
      

  //});
      );
}
}

}
