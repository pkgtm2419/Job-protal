import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToasterService, AppService } from "../_shared/_service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "delete",
  template: `
    <style>
      h2 {
          margin: 0 !important;
      }
    </style>
    <div style="width:500px">
      <div class="model">
        <div class="modal-header bg-primary" style="border-top:2px solid black;">
          <h2 mat-dialog-title class="text-white modal-title">Update Cover Wallpaper</h2>
          <button mat-button (click)="closeDialog(false)" class="me-3" aria-label="Close"><mat-icon>close</mat-icon></button>
        </div>
        <div mat-dialog-content class="modal-body" style="height: 10rem;">
          <img *ngFor="let cImg of templateList" class="img-thumbnail m-1 p-2" src="./../assets/bgCover/{{cImg.name}}" width="100px" alt="{{cImg.name}}">
        </div>
        <div mat-dialog-actions class="modal-footer" align="end" style="border-bottom:2px solid black;">
          <button type="button" mat-flat-button color="primary" (click)="update(data)">Update</button>&nbsp;
          <button type="button" mat-stroked-button color="primary" (click)="closeDialog(false)">Cancel</button>
        </div>
      </div>
    </div>`
})
export class ProfilePicComponent {
  data: any;
  templateList: any = [];

  constructor(
    private _mdr: MatDialogRef<ProfilePicComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any, 
    private toaster: ToasterService, 
    private service: AppService,
    private _http: HttpClient) {
    this.data = JSON.parse(data);
  }

  ngOnInit(): void {
    this.getTemplate();
  }

  getTemplate(): void {
  }

  closeDialog(status: boolean) {
    this._mdr.close(status);
  }

  update(data: any): void {
    console.log(data);
    /* this.service.deleteDepartment(id).subscribe((res: any) => {
      this.closeDialog(res.status);
      if(res.status) {
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error(`Technical issue ${error}`);
    }; */
  }
}
