import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { MenuController } from '@ionic/angular'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
/** 
 * Tutprial here https://www.youtube.com/watch?v=8ORgYL7VrvE
*/

form : FormGroup;
validation_messages = {
  'email': [
    { type: 'required', message: 'Email is required.' },
    { type: 'pattern', message: 'Enter a valid SVHG email.' }
  ],
  'password': [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: 'Password must be at least 5 characters long.' }
  ]
};

  constructor( private authService : AuthService,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private loadingCtrl: LoadingController,
    private router : Router) {
      this.form = new FormGroup({
        //username : new FormControl('', [Validators.required, Validators.minLength(3)]),
        //password : new FormControl('', [Validators.required, Validators.minLength(5)])
        'email': new FormControl('test@test.com', Validators.compose([
          Validators.required,
          //chek for svhg email apttenr ^[\w.+\-]+@svhg\.ie$ and try '^.+@gmail.com$'
          Validators.pattern('^.+@svhg.ie$')
          //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        'password': new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ]))
      });
     }

  ngOnInit() {
  }


  


  //Diable side menu fo the page
  ionViewDidEnter(){
    //this.menu.enable(true);
  }

  //Restore ot defult whn leaving his pge
  ionViewDidLeave(){
    //this.menu.enable();
  }

  goToForgotPassword() : void{
    console.log("Log.ts FORGOT Password");
  }
  async onSubmit(){
    const loading = await this.loadingCtrl.create({message: "Hi " + this.form.value.email + ". Please wait while you are logged in...", duration: 2000});
    await loading.present();

    this.authService.login(this.form.value).subscribe(
      async token => {
        localStorage.setItem('token', token);
        loading.dismiss();
        this.router.navigateByUrl('/create');
      },
      async () => {
        let messageFailure = "Login Failed. Register if you are a new user and check you have a valid connection. ";
        const alert = await this.alertCtrl.create({message : messageFailure, buttons: ['OK']});
        await alert.present();
        loading.dismiss();
      }
    );
  }

}
