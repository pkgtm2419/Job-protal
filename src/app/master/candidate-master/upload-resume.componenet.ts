import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ToasterService, AppService } from "../../_shared/_service";

@Component({
  selector: "delete",
  template: `
    <style>
      h2 { margin: 0 !important; }
      .width-model { width: 40rem;}
    </style>
    <div class="width-model">
      <div class="model">
        <div class="modal-header bg-primary" style="border-top:2px solid black;">
          <h2 mat-dialog-title class="text-white modal-title">Upload Candidate Resumes</h2>
          <button mat-button (click)="closeDialog(false)" class="me-3" aria-label="Close"><mat-icon>close</mat-icon></button>
        </div>
        <div mat-dialog-content class="modal-body" style="height: 20rem;">
          <div class="row">
            <div class="input-group mb-1">
              <input type="file" class="form-control" accept=".pdf,.doc, .docx" (change)="onFileSelect($event.target)" multiple>
            </div>
          </div>
          <div class="row">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"></li>
              <li class="list-group-item d-flex" *ngFor="let file of resumeFile; let i = index"><button mat-button (click)="removeSelectedCv(file.name)"><span class="material-symbols-outlined">close</span></button> &nbsp; {{file.name}}</li>
              <li class="list-group-item"></li>
            </ul>
          </div>
        </div>
        <div mat-dialog-actions class="modal-footer" align="end" style="border-bottom:2px solid black;">
          <button type="button" mat-flat-button color="primary" (click)="uploadResume()">Upload</button>&nbsp;
          <button type="button" mat-stroked-button color="primary" (click)="closeDialog(false)">Cancel</button>
        </div>
      </div>
    </div>`
})
export class ResumeComponent {
  resumeFile: any = [];

  constructor(private _mdr: MatDialogRef<ResumeComponent>, private service: AppService, private toaster: ToasterService) {}

  onFileSelect(target: any) {
    this.resumeFile = [];
    var files = target.files;
    for (let i = 0; i < files.length; i++) {
      this.resumeFile.push(files[i]);
    }
  }

  removeSelectedCv(file: any) {
    this.resumeFile = this.resumeFile.filter((item: any) => {
      return item.name != file;
    });
  }

  closeDialog(status: boolean) {
    this._mdr.close(status);
  }

  uploadResume(): void {
    let formData: FormData = new FormData();
    for (let i = 0; i < this.resumeFile.length; i++) {
      formData.append('files', this.resumeFile[i]);
    }
    this.service.uploadResume(formData).subscribe((res: any) => {
      if(res.status) {
        this.resumeFile = [];
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
      this.closeDialog(res.status);
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }
}
