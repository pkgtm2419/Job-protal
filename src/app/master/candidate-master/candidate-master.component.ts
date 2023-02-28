import { MatSort } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ResumeComponent } from './upload-resume.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService, ToasterService } from 'src/app/_shared/_service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-candidate-master',
  templateUrl: './candidate-master.component.html',
  styleUrls: ['./candidate-master.component.css']
})

export class CandidateMasterComponent {
  candidateList: any= [];
  limits: any = [25, 50, 100, 250, 500];
  pageData = 1;
  limit: any = 25;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  matDialogRef!: MatDialogRef<ResumeComponent>;
  match: any;
  layoutStyle: any = 'table';
  candidateData: any = [];
  filterForm: any;
  
  constructor(private matDialog: MatDialog, private toaster: ToasterService, private service: AppService) { }
  
  ngOnInit(): void {
    this.getData(this.match);
    this.filterForm = new FormGroup({
      location: new FormControl(''),
      angular: new FormControl('angular'),
      nodejs: new FormControl('nodejs'),
      javascript: new FormControl('javascript'),
      html: new FormControl('html'),
      css: new FormControl('css'),
      git: new FormControl('git'),
      docker: new FormControl('docker')
    });
  }

  applyCandidateFilter(): void {
    if(!this.filterForm.valid) {
      this.toaster.error("Filter Applying issue!");
      return;
    }
    console.log(Object.values(this.filterForm.value));
    this.match = Object.values(this.filterForm.value);
    this.match = this.match.filter((item: any) => item);
    this.getData(this.match);
  }
  
  search(): void {
    this.getData(this.match);
  }

  dataLimit(): void{
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }

  getData(data: string): void {
    this.service.searchFromCV(data).subscribe((res: any) => {
      if(res.status) {
        this.candidateList = res.data;
        this.candidateData = res.data;
        this.dataSource = new MatTableDataSource(this.candidateList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.limits.push(this.candidateList.length);
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

  changeLayout(type: any): void {
    this.layoutStyle = (type == 'table') ? "grid" : (type == 'grid') ? "table" : "grid";
    if(this.layoutStyle == 'table') {
      this.getData(this.match);
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
