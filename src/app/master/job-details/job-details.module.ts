import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailsComponent } from './job-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CreateOpportunityComponent } from './create-opportunity.component';

const routes: Routes = [
  { path: '', component: JobDetailsComponent },
];

@NgModule({
  declarations: [
    JobDetailsComponent,
    CreateOpportunityComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class JobDetailsModule { }
