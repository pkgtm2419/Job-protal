import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateMasterComponent } from './candidate-master.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ResumeComponent } from './upload-resume.componenet';
import { NgxPaginationModule } from 'ngx-pagination';

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
