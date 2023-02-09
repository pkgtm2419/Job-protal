import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ProfilePicComponent } from './profile-pic.componenet';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
];

@NgModule({
  declarations: [
    UserProfileComponent,
    ProfilePicComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UserProfileModule { }
