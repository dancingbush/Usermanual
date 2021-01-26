import { NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentModalPage } from './student-modal/student-modal.page';
import { ComponentsModule } from './components/components.module';
import { environment } from '../environments/environment';
import { WalkthroughPageModule } from './walkthrough/walkthrough.module';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent, StudentModalPage],
  entryComponents: [],
  imports: [
    BrowserModule, 
    WalkthroughPageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(), 
    AppRoutingModule,
     HttpClientModule, 
     ComponentsModule,
     FormsModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    TransferState,
    WalkthroughPageModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
