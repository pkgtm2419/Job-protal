import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ToasterService, AppService } from "../../_shared/_service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "delete",
  template: `
    <style>
      h2 { margin: 0 !important; }
      .width-model { width: 65rem;}
    </style>
    <div class="width-model">
      <div class="model">
        <div class="modal-header bg-primary" style="border-top:2px solid black;">
          <h2 mat-dialog-title class="text-white modal-title">Candidate filter form</h2>
          <button mat-button (click)="closeDialog()" class="me-3" aria-label="Close"><mat-icon>close</mat-icon></button>
        </div>
        <div mat-dialog-content class="modal-body" style="height: 35rem;">
          <div class="row">
            <form [formGroup]="filterForm" class="mb-2" (ngSubmit)="applyingFilter()">
              <div class="row">
                <div class="col-md-6">
                  <p class="d-grid gap-2 px-2 my-2">
                    <mat-form-field appearance="outline">
                      <mat-label>Location</mat-label>
                      <input matInput formControlName="location" type="text" placeholder="Pune,...">
                    </mat-form-field>
                  </p>
                  <ul style="list-style-type:none;">
                    <h3>Skill:</h3>
                    <li><mat-checkbox color="primary" formControlName="angular">Angular</mat-checkbox></li>
                    <li><mat-checkbox color="primary" formControlName="nodejs">NodeJS</mat-checkbox></li>
                    <li><mat-checkbox color="primary" formControlName="html">HTML</mat-checkbox></li>
                    <li><mat-checkbox color="primary" formControlName="javascript">JavaScript</mat-checkbox></li>
                    <li><mat-checkbox color="primary" formControlName="css">CSS</mat-checkbox></li>
                    <li><mat-checkbox color="primary" formControlName="git">Git</mat-checkbox></li>
                    <li><mat-checkbox color="primary" formControlName="docker">Docker</mat-checkbox></li>
                  </ul>
                </div>
                <div class="col-md-6"></div>
                <div class="row">
                  <div class="col-4"></div>
                  <div class="col-4">
                    <div class="px-2 gap-2 d-grid">
                      <button mat-raised-button type="submit" color="primary">Apply Filter</button>
                    </div>
                  </div>
                  <div class="col-4"></div>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-4"></div>
              <div class="col-4">
                <div class="px-2 gap-2 d-grid">
                  <button mat-raised-button type="submit" (click)="match = ''">Clear Filter</button>
                </div>
              </div>
              <div class="col-4"></div>
            </div>
          </div>
        </div>
        <div mat-dialog-actions class="modal-footer" align="end" style="border-bottom:2px solid black;">
          <button type="button" mat-stroked-button color="primary" (click)="closeDialog()">Cancel</button>
        </div>
      </div>
    </div>`
})
export class FilterComponent {
  match: any;
  filterForm = new FormGroup({
    location: new FormControl(''),
    angular: new FormControl('angular'),
    nodejs: new FormControl('nodejs'),
    javascript: new FormControl('javascript'),
    html: new FormControl('html'),
    css: new FormControl('css'),
    git: new FormControl('git'),
    docker: new FormControl('docker')
  });

  constructor(private _mdr: MatDialogRef<FilterComponent>, private service: AppService, private toaster: ToasterService) {}

  closeDialog() {
    this._mdr.close({status: false, message: "Filter doesn't applied!"});
  }

  applyingFilter(): void {
    this._mdr.close({status: true, message: "Filter applied!", data: this.filterForm.value});
  }
}
