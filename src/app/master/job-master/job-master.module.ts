import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobMasterComponent } from './job-master.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  { path: '', component: JobMasterComponent },
  { path: 'create', component: CreateJobComponent }
];

@NgModule({
  declarations: [
    JobMasterComponent,
    CreateJobComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxEditorModule,
    RouterModule.forChild(routes)
  ]
})
export class JobMasterModule { }
