import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
/** 
 * Tutprial here https://www.youtube.com/watch?v=8ORgYL7VrvE
*/
  constructor( private authService : AuthService,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private loadingCtrl: LoadingController,
    private router : Router) { }

  ngOnInit() {
  }


  form = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.minLength(3)]),
    password : new FormControl('', [Validators.required, Validators.minLength(5)])
  
  });

  async onSubmit(){
    const loading = await this.loadingCtrl.create({message: "Hi " + this.form.value.username + ". Please wait while you are logged in...", duration: 2000});
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
