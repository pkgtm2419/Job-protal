import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
];

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserProfileModule { }
