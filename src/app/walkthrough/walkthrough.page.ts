import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, ViewChild, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { IonSlides, MenuController } from '@ionic/angular';

import { Storage }  from '@ionic/storage';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: [
    './styles/walkthrough.page.scss',
    './styles/walkthrough.shell.scss',
    './styles/walkthrough.responsive.scss'
  ]
})


export class WalkthroughPage implements AfterViewInit {
  show : boolean;

  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    public menu: MenuController,
    private storage : Storage,
    private router : Router
  ) { }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    //this.menu.enable(false);
     //If walkthough already ticked dont show again
     console.log("Walkthough: ngOnIt: getting show vlaue; ")
     this.storage.get("showWalkThrough").then((val)=>{
       if (val != null){
         this.show = val;
       }

     });

     console.log("walkthorugh :  checking the wlakThorgh boolean: " + this.show);
     if (this.show){
     this.router.navigateByUrl('/walkthrough');
     //this.router.navigateByUrl('/create');
     }else{
       this.router.navigateByUrl('/home');
     }
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    //this.menu.enable(true);
  }

  
 
  ngAfterViewInit(): void {
    // Accessing slides in server platform throw errors
    if (isPlatformBrowser(this.platformId)) {
      // ViewChild is set
      this.slides.isBeginning().then(isBeginning => {
        this.isFirstSlide = isBeginning;
      });
      this.slides.isEnd().then(isEnd => {
        this.isLastSlide = isEnd;
      });

      // Subscribe to changes
      this.slides.ionSlideWillChange.subscribe(changes => {
        this.slides.isBeginning().then(isBeginning => {
          this.isFirstSlide = isBeginning;
        });
        this.slides.isEnd().then(isEnd => {
          this.isLastSlide = isEnd;
        });
      });
    }
  }


  skipWalkthrough(): void {
    // Skip to the last slide
    this.slides.length().then(length => {
      this.slides.slideTo(length);
    });
  }


  checkBoxClicked(){
    console.log("walthrough: check box clicked");
    this.storage.set("showWalkThrough", false);
    this.storage.get("showWalkThrough").then((val)=>{
      if (val != null){
        this.show = val;
      }

    });
    
    console.log("Wkthigh: set walkthiugh to false; " + this.show);
  }
}
