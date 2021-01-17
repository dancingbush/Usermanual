import { Component, ɵChangeDetectorStatus } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Student, Test, StudentService } from '../services/student.service';
import { StudentModalPage } from '../student-modal/student-modal.page';
import {FormControl, ReactiveFormsModule } from '@angular/forms'; 
import { debounceTime} from "rxjs/operators";
import { serializeNodes } from '@angular/compiler/src/i18n/digest';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Firelds
  public students : Student[];
  public tests : Test[];
  public searchTerm : string;
  public searchControl : FormControl;
  public searching : any = false;

  constructor(
    private service : StudentService,
    private alertCtrl : AlertController,
    private modalCtrl : ModalController
    ) {
      this.searchControl = new FormControl();
    }


  ngOnInit() {
    /**
     * Get data from the SQL DB and store in local array Test
     * This calls student.serce which in turn calls the GET API
     * Set up serach Form, debounce tme is time to wait 
     * before before triggerng serah / observable
     */

     console.log("Home.page: ngOnOt- Gettnig all data...");
    this.service.getAll().subscribe(response => {
      console.log("Home.ts: getAll call = " + response);
      //this.students = response;
      this.tests = response;
    });

    // this.setFilteredTests("");
     this.searchControl.valueChanges
     .pipe(debounceTime(700))
     .subscribe(search=> {
       this.searching = false;
       this.setFilteredTests(search);
       
     });

    
  }

  setFilteredTests(searchTerm : string){
    /**
     * USer teh seah term form user input to filter
     * the test array
     * https://www.joshmorony.com/high-performance-list-filtering-in-ionic-2/
     * Assign a lcoal var tp current tests array which we will use
     * to reasign tests if searh is null or empty. 
     * This saves us making another tme wasting PAI get call
     */
    console.log("Home.page.ts: 44 Ste filter serach bar called, serach = " + searchTerm);
   
    if (searchTerm != ""){
     this.tests =  this.tests.filter(test => {
       
      if (test.investigation.toLowerCase().indexOf(searchTerm.toLowerCase()) == -1){
        console.log("Home.page.ts 73= Serach not found for " + searchTerm + " so searching alais");
       return  test.Alias.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }
       console.log("home.oage: 78: Found " + searchTerm + " in test.investigation.");
      return test.investigation.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      //return test.investigation.toLowerCase().indexOf(searchTerm.toLowerCase()) > test.Alias.toLowerCase().indexOf(searchTerm.toLowerCase());
      //return test.Alias.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      // test.investigation.toLowerCase().indexOf(searchTerm.toLowerCase()) || 
      //this.tests = this.tests.filter(std => std.id !== id);
    })
  }else{
    console.log("Home.page.ts: Seathetrm is blank -  " + searchTerm + "; so getting dtta with GET API");
   
    this.service.getAll().subscribe(data => {
      this.tests = data;
      
    })
  }
   
  }

  onSearchInput(){
    /**
     * Turn on spinner when seraching
     * Set to false when loaing page and when serach observable triggers in onIt
     */
    this.searching = true;
  }

  
  removeTest(id : number){
    console.log("Home.page.ts: Remove test id : " + id);
    this.alertCtrl
    .create({
      header: 'Delete',
      message: 'are you sure you want to delete this test?',
      buttons : [
        {
          text: 'Yes',
          handler: () => {
            this.service.remove(id).subscribe(() => {
              // Filter the tst array to all test.id's excpet one removed
              this.tests = this.tests.filter(std => std.id !== id);
            });            
          }
        },
        { text: 'No'}
      ]
    })
.then(alertE1 => alertE1.present());

    }

    addStudent(){
      /**
       * Call studentmodal page
       * Also when Add Student page is closed 
       * we will capture what teh page sends back  when navCtlr.dismiss(params)
       * is called, so we can upadte any new test additions to this page
       * The modal presnet teh Add Student page, .then() return inof sent back 
       * from this page.
       */
      console.log("Home.ts: Add test");
      this.modalCtrl.create({
        component: StudentModalPage
      })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role}) => {
        if ( role === 'created'){
          //add new test from Add Test page to test arrauy
          console.log("Home.page: 148- New test created : " + data + "- Adding to Tests Array view.")
          //this.students.push(data);
          this.tests.push(data);
        }
      });
      

    }

    updateStudent(test){
      /* We need to pas the student object ot the 
      * StidentModalPage with modalCtrl
      * And we also handle the retuned data from Student Modal Page
      */
       
      console.log("Home.page.ts: upadte, passing to StudentModalPage student - " + test.investigation + " : id - " + test.id);
      this.modalCtrl.create({
        component : StudentModalPage,
        //componentProps : {student : student}
        componentProps : {test : test}

      })
      .then(modal => {
        modal.present();
        //get returned moddel form Stdent Model page
        console.log("home.page.ts: 92: Getting return data form Stduent Modal page Uodate / PUT");
        return modal.onDidDismiss();
      })
      .then(({ data, role}) => {
        //this.students = this.students.filter(std => {
          this.tests = this.tests.filter(std=> {
          console.log("Home.page.ts: 97: Retrining to home frm Student modal update / PUT with data studnet IFD to update list: " + data.id);
          if (data.id === std.id){
            //return uodated tests array
            return data;
          }
          return std;
        });

      });
    }
    
}