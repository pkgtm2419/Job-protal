import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService, ToasterService } from 'src/app/_shared/_service';
import * as XLSX from 'xlsx';
import { ResumeComponent } from './upload-resume.componenet';

@Component({
  selector: 'app-candidate-master',
  templateUrl: './candidate-master.component.html',
  styleUrls: ['./candidate-master.component.css']
})

export class CandidateMasterComponent {
  candidateList: any;
  limits: any = [10, 50, 100, 500];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  matDialogRef!: MatDialogRef<ResumeComponent>;
  match: any;
  layoutStyle: any = 'grid';
  candidateData: any;

  constructor(private matDialog: MatDialog, private toaster: ToasterService, private service: AppService) { }

  ngOnInit(): void {
    this.getData(this.match);
  }

  changeLayout(type: string): void {
    this.layoutStyle = (type == 'table') ? "grid" : (type == 'grid') ? "table" : "grid";
  }
  
  search(): void {
    this.getData(this.match);
  }

  getData(data: string): void {
    this.service.searchFromCV(data).subscribe((res: any) => {
      if(res.status) {
        this.candidateList = res.data;
        this.candidateData = res.data;
        this.limits.push(this.candidateList.length);
        this.dataSource = new MatTableDataSource(this.candidateList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = ["id", "resume_file", "person_name", "phone_no", "email_address", "created_at", "Action"];
        this.toaster.success(res.message);
      } else {
        this.toaster.error(res.message);
      }
    }), 
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

  removeProfile(data: any): void {
    console.log(data);
  }
  
  openProfile(data: any): void {
    console.log(data);
  }

  openUploadModal() {
    this.matDialogRef = this.matDialog.open(ResumeComponent, { disableClose: true });
    this.matDialogRef.afterClosed().subscribe((res: any) => {
      if(res) {
        this.ngOnInit();
      }
    });
  }

  applyFilter(event: Event) {
    this.match = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.match.trim().toLowerCase();
    let data = this.candidateList;
    this.candidateData = data.filter((item: any) => {
      return (JSON.stringify(item).toLowerCase().indexOf(this.match.trim().toLowerCase()) > -1);
    });
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
