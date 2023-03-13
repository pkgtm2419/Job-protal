import { Component, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToasterService, AppService } from 'src/app/_shared/_service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.css']
})
export class JobMasterComponent {
  match: any;
  limits: any = [25, 50, 100, 250, 500];
  limit: any = 25;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  layoutStyle: string = 'grid';
  jobPostList: any;
  selectedJobData: any;

  constructor(private toaster: ToasterService, private service: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  selectJob(data: any) {
    this.jobPostList = this.jobPostList.map((item: any) => {
      item.selectedJob = false;
      return item;
    });
    data.selectedJob = !data.selectedJob;
    this.selectedJobData = [data];
  }

  getData() {
    this.service.getOpportunity().subscribe((res: any) => {
      if(res.status) {
        this.jobPostList = res.data;
        this.dataSource = new MatTableDataSource(this.jobPostList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = Object.keys(this.jobPostList[0]);
        this.limits.push(this.jobPostList.length);
        this.limits = [...new Set(this.limits)];
        this.limits = this.limits.sort((a: number, b: number) => {return a-b});
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

  changeLayout(type: any): void {
    this.layoutStyle = (type == 'table') ? "grid" : (type == 'grid') ? "table" : "grid";
    if(this.layoutStyle == 'table') {
      this.getData();
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
