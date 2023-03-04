import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService, ToasterService } from 'src/app/_shared/_service';
import * as XLSX from 'xlsx';
import { CreateOpportunityComponent } from './create-opportunity.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  match: any;
  dataSource: any;
  layoutStyle: string = 'grid';
  matDialogRef!: MatDialogRef<CreateOpportunityComponent>;

  constructor(private matDialog: MatDialog, private toaster: ToasterService, private service: AppService) { }

  ngOnInit(): void {

  }

  getData(data: any) {
    console.log(data);
  }

  openUploadModal() {
    this.matDialogRef = this.matDialog.open(CreateOpportunityComponent, { disableClose: true });
    this.matDialogRef.afterClosed().subscribe((res: any) => {
      if(res) {
        this.ngOnInit();
      }
    });
  }

  changeLayout(type: any): void {
    this.layoutStyle = (type == 'table') ? "grid" : (type == 'grid') ? "table" : "grid";
    if(this.layoutStyle == 'table') {
      this.getData(this.match);
    }
  }

  applyFilter(event: Event) {
    this.match = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.match.trim().toLowerCase();
  }

  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, `Download Report ${new Date().toLocaleString()}.xlsx`);
    this.toaster.success("Data downloaded successfully!");
  }

  refresh(): void {
    this.ngOnInit();
  }

}
