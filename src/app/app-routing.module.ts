import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashborad/dashborad.module').then(m => m.DashboradModule), canActivate: [AppGuard] },
  { path: 'user-profile', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule), canActivate: [AppGuard] },
  { path: 'master/candidate', loadChildren: () => import('./master/candidate-master/candidate-master.module').then(m => m.CandidateMasterModule), canActivate: [AppGuard] },
  { path: 'master/job-details', loadChildren: () => import('./master/job-details/job-details.module').then(m => m.JobDetailsModule), canActivate: [AppGuard] },
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'about-us', loadChildren: () => import('./_public/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'contact-us', loadChildren: () => import('./_public/contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
