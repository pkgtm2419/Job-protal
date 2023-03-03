import { Component, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToasterService, AppService } from "../../_shared/_service";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "delete",
  template: `
    <style>
      h2 { margin: 0 !important; }
      .width-model { width: 65rem;}
      .mdc-data-table__cell, .mdc-data-table__header-cell { border: none; }
      .mat-mdc-table .mdc-data-table__row { height: 40px; border-bottom: 1px solid #c0c0c0;}
      .mat-mdc-table .mdc-data-table__header-row { height: 50px; background-color: #0d6efd; }
    </style>
    <div class="width-model">
      <div class="model">
        <div class="modal-header bg-primary" style="border-top:2px solid black;">
          <h2 mat-dialog-title class="text-white modal-title">Candidate filter form</h2>
          <button mat-button (click)="closeDialog()" class="me-3" aria-label="Close"><mat-icon>close</mat-icon></button>
        </div>
        <div mat-dialog-content class="modal-body" style="height: 35rem;">
        <ng-container>
          <div class="row mb-2 px-3">
            <textarea class="form-control" [(ngModel)]="messageForCandidate" cols="30" rows="5" placeholder="Enter your message for candidate..."></textarea>
          </div>
        </ng-container>
          <ng-container>
            <div class="table-responsive">
              <table mat-table [dataSource]="dataSource" matSort id="export">
                <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef> ID. </th>
                  <td mat-cell *matCellDef="let element"> {{element.id}} </td>
                </ng-container>
                <ng-container matColumnDef="person_name">
                  <th mat-header-cell *matHeaderCellDef> Person_Name </th>
                  <td mat-cell *matCellDef="let element"> {{element.person_name | titlecase}} </td>
                </ng-container>
                <ng-container matColumnDef="email_address">
                  <th mat-header-cell *matHeaderCellDef> Department_Name </th>
                  <td mat-cell *matCellDef="let element"> {{element.email_address}} </td>
                </ng-container>
                <ng-container matColumnDef="phone_no">
                  <th mat-header-cell *matHeaderCellDef> Phone_Number </th>
                  <td mat-cell *matCellDef="let element"> {{element.phone_no}} </td>
                </ng-container>
                <ng-container matColumnDef="created_at">
                  <th mat-header-cell *matHeaderCellDef> Last_Updated_Date </th>
                  <td mat-cell *matCellDef="let element"> {{element.created_at | date: 'short'}} </td>
                </ng-container>
                <ng-container matColumnDef="resume_file">
                  <th mat-header-cell *matHeaderCellDef> Resume_File </th>
                  <td mat-cell *matCellDef="let element"><a href="{{element.resume_file}}" target="_blank" mat-button color="primary"><span class="material-symbols-outlined">visibility</span></a></td>
                </ng-container>
                <ng-container matColumnDef="Action">
                  <th mat-header-cell *matHeaderCellDef> Action </th>
                  <td mat-cell *matCellDef="let element" class="d-flex"> 
                      <a mat-button color="warn" (click)="removeProfile(element)"><span class="material-symbols-outlined">delete_forever</span></a>
                  </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </div>
          </ng-container>
        </div>
        <div mat-dialog-actions class="modal-footer" align="end" style="border-bottom:2px solid black;">
          <button type="submit" mat-raised-button color="primary" (click)="sendMessage()">Confirm send</button>
          <button type="button" mat-stroked-button color="primary" (click)="closeDialog()">Cancel</button>
        </div>
      </div>
    </div>`
})
export class SendNotifyComponent {
  match: any;
  selectedCandidateList: any;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any[]>;
  messageForCandidate: any;

  constructor(private _mdr: MatDialogRef<SendNotifyComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: AppService, private toaster: ToasterService) {
    this.selectedCandidateList = data;
    this.dataSource = new MatTableDataSource(this.selectedCandidateList);
    this.displayedColumns = ["id", "resume_file", "person_name", "phone_no", "email_address", "created_at", "Action"];
  }

  sendMessage(): void {
    this.selectedCandidateList = this.selectedCandidateList.map((item: any) => {
      return { id: item.id, created_at: item.created_at, person_name: item.person_name, phone_no: +item.phone_no, email_address: item.email_address };
    });
    let match: any = { message: this.messageForCandidate, candidate: this.selectedCandidateList };
    console.log(match);
  }

  removeProfile(data: any): void {
    this.dataSource.data = this.dataSource.data.filter((item: any) => item.id != data.id);
  }

  closeDialog() {
    this._mdr.close({status: false, message: "Filter doesn't applied!"});
  }

}
