import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';


const routes : Routes = [{
  path: '',
  component : LoginPage
}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
