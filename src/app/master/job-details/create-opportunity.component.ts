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
          <h2 mat-dialog-title class="text-white modal-title">Opportunity creation form</h2>
          <button mat-button (click)="closeDialog()" class="me-3" aria-label="Close"><mat-icon>close</mat-icon></button>
        </div>
        <div mat-dialog-content class="modal-body" style="height: 35rem;">
          <ng-container>
            <form (ngSubmit)="create()" [formGroup]="opportunityForm">
              <div class="row">
                <div class="col-md-6">
                  <input type="text" formControlName="name">
                </div>
                <div class="col-md-6">
                  <h2>Pawan</h2>
                </div>
              </div>
              <button type="submit" mat-raised-button color="primary">Create Opportunity</button>
            </form>
          </ng-container>
        </div>
        <div mat-dialog-actions class="modal-footer" align="end" style="border-bottom:2px solid black;">
          <button type="button" mat-stroked-button color="primary" (click)="closeDialog()">Cancel</button>
        </div>
      </div>
    </div>`
})
export class CreateOpportunityComponent {
  opportunityForm: any;

  constructor(private _mdr: MatDialogRef<CreateOpportunityComponent>, private service: AppService, private toaster: ToasterService) {
  }

  ngOnInit(): void {
    this.opportunityForm = new FormGroup({
      name: new FormControl('')
    });
  }

  create(): void {
    let match: any = this.opportunityForm.value;
    console.log(match);
    // this.service.createOpportunity(match).subscribe((res: any) => {
    //   if(res.status) {
    //     this.toaster.success(res.message);
    //   } else {
    //     this.toaster.warning(res.message);
    //   }
    // }),
    // (error: any) => {
    //   this.toaster.error("Some technical error "+error);
    // }
  }

  closeDialog() {
    this._mdr.close({status: false, message: "Creation failed!"});
  }

}
