import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService : AuthService,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  form = new FormGroup({
    firstname : new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname : new FormControl('', [Validators.required, Validators.minLength(3)]),
    username : new FormControl('', [Validators.required, Validators.minLength(5)]),
    password : new FormControl('', [Validators.required, Validators.minLength(5)])
  
  });
  async onSubmit(){
    console.log("Register.ts: Form submitted = " + JSON.stringify(this.form.value));
    const loading = await this.loadingCtrl.create({message : "Registering..."});
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      // IF succesfully registered new user
      async () => {
        const toast = await this.toastCtrl.create({message : 'User ' + this.form.value.username + ' Created', duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        this.form.reset();
      },
      //Handle errors
      async () => {
        const alert = await this.alertCtrl.create({message: 'Registration Error; Make sure you gave a valid connection. Contact administrator if the issue persists.', buttons: ['OK']});
        loading.dismiss();
        await alert.present();
      }
    );
  }

}
