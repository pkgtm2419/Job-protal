import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ResumeComponent } from './upload-resume.component';
import { CandidateMasterComponent } from './candidate-master.component';

const routes: Routes = [
  { path: '', component: CandidateMasterComponent },
];

@NgModule({
  declarations: [
    CandidateMasterComponent,
    ResumeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class CandidateMasterModule { }
