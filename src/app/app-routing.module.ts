import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  /**
   * This defines where app route opening apage to and 
   * the absoulye path. 
   * If we change rediredctTo: pageWeWant; as long as we have the 
   * page path name and loadChldren denofned it will load
   * when the app opens. 
   */
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
 
  {
    path: 'loginPage',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'walkthrough',
    loadChildren: () => import('./walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule)
  },
  {
    path: 'student-modal',
    loadChildren: () => import('./student-modal/student-modal.module').then( m => m.StudentModalPageModule)
  },
  
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
