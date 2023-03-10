import { MatSort } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ResumeComponent } from './upload-resume.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService, ToasterService } from 'src/app/_shared/_service';
import * as XLSX from 'xlsx';
import { FilterComponent } from './filter-resume.component';
import { SendNotifyComponent } from './send-message.component';

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
  matDialogNotification!: MatDialogRef<SendNotifyComponent>;
  filterPage!: MatDialogRef<FilterComponent>;
  match: any = [];
  layoutStyle: any = 'grid';
  candidateData: any = [];
  filterForm: any;
  selectedCandidate: any = [];
  isSelection: boolean = false;
  checkBox: any = [
    {checked: false, name: "angular"},
    {checked: false, name: "nodejs"},
    {checked: false, name: "javascript"},
    {checked: false, name: "html"},
    {checked: false, name: "css"},
    {checked: false, name: "git"},
    {checked: false, name: "docker"}
  ];
  
  constructor(private matDialog: MatDialog, private toaster: ToasterService, private service: AppService) { }
  
  ngOnInit(): void {
    this.getData(this.match);
    this.filterForm = new FormGroup({
      location: new FormControl(''),
      angular: new FormControl(''),
      nodejs: new FormControl(''),
      javascript: new FormControl(''),
      html: new FormControl(''),
      css: new FormControl(''),
      git: new FormControl(''),
      docker: new FormControl(''),
      YOEinMonth: new FormControl(''),
      YOE: new FormControl('')
    });
  }

  getSelectedCandidate(data: any): void {
    let match = (this.selectedCandidate.length > 0) ? this.selectedCandidate.filter((item: any) => item.id == data.id) : [];
    if(match.length > 0) {
      this.selectedCandidate = this.selectedCandidate.filter((item: any) => item.id != data.id)
    } else {
      this.selectedCandidate.push(data);
    }
  }

  applyCandidateFilter(): void {
    this.match = this.checkBox.map((item: any) => {
      if(item.checked) {
        return item.name;
      }
    }).filter((item: any) => item);
    this.checkBox.forEach((ele: any) => {
      delete this.filterForm.value[ele.name];
    });
    let keyValue = Object.values(this.filterForm.value).toString();
    if(keyValue) {
      this.match.push(keyValue);
    }
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
        this.displayedColumns = ["id", "resume_file", "person_name", "phone_no", "email_address", "created_at", "Action"];
        this.limits.push(this.candidateList.length);
        this.limits = [...new Set(this.limits)];
        this.limits = this.limits.sort((a: number, b: number) => {return a-b});
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

  openNotificationModal() {
    this.matDialogNotification = this.matDialog.open(SendNotifyComponent, { data: this.selectedCandidate, disableClose: true });
    this.matDialogNotification.afterClosed().subscribe((res: any) => {
      if(res) {
        this.ngOnInit();
      }
    });
  }

  openFilterModal() {
    this.filterPage = this.matDialog.open(FilterComponent, { disableClose: true });
    this.filterPage.afterClosed().subscribe((res: any) => {
      if(res.status) {
        this.filterForm.patchValue(res.data);
        this.match = Object.values(res.data);
        this.match = this.match.filter((item: any) => item);
        this.getData(this.match);
        this.toaster.success(res.message);
      } else {
        this.toaster.success(res.message);
      }
    });
  }

  clearCheckBox(): void {
    this.checkBox = this.checkBox.map((element: any) => {
      element.checked = false;
      return element;
    });
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  applyFilter(event: Event) {
    if(this.layoutStyle == 'table') {
      this.match = (event.target as HTMLInputElement).value;
      this.dataSource.filter = this.match.trim().toLowerCase();
    } else {
      let data = this.candidateList;
      this.candidateData = data.filter((item: any) => {
        return (JSON.stringify(item).toLowerCase().indexOf(this.match.trim().toLowerCase()) > -1);
      });
    }
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
