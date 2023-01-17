import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboradComponent } from './dashborad.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboradComponent },
];

@NgModule({
  declarations: [
    DashboradComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboradModule { }
