import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
//import { TermsOfServicePage } from '../terms-of-service/terms-of-service.page';
//import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { PasswordValidator } from '../../validators/password.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form : FormGroup;
  matching_passwords_group : FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'SVHG Email is required.' },
      { type: 'pattern', message: 'Enter a valid SVHG email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  };

  constructor(
    private authService : AuthService,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private loadingCtrl: LoadingController
  ) { 

    this.matching_passwords_group = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'confirm_password': new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    this.form = new FormGroup({
     
      firstname : new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname : new FormControl('', [Validators.required, Validators.minLength(3)]),
      //email : new FormControl('', [Validators.required, Validators.minLength(5)]),
      //password : new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('username@svhg.ie', Validators.compose([
        Validators.required,
        Validators.pattern('^.+@svhg.ie$')
      ])),
      'matching_passwords': this.matching_passwords_group
    });
  }

  // Disable side menu for this page
  ionViewDidEnter(): void{
    //this.menu.enable(false);
  }

  //Restore to defult when leaving the page
  ionViewDidLeave(){
    //this.menu.enable;
  }

  ngOnInit() {
  }

  
  async onSubmit(){
    console.log("Register.ts: Form submitted = " + JSON.stringify(this.form.value));
    const loading = await this.loadingCtrl.create({message : "Registering..." + this.form.value.firstname + " password : " + this.form.value.matching_passwords.password});
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      // IF succesfully registered new user
      async () => {
        const toast = await this.toastCtrl.create({message : 'User ' + this.form.value.firstname + ' Created', duration: 2000, color: 'dark' });
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
