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
  jobPostList: any;
  selectedJobData: any;
  jobId: any;
  candidateData: any;

  constructor(private toaster: ToasterService, private service: AppService) { }

  ngOnInit(): void {
    this.getPostedJobData();
  }

  selectJob(data: any) {
    this.getCandidateData(data.id);
    this.jobPostList = this.jobPostList.map((item: any) => {
      item.selectedJob = false;
      return item;
    });
    data.selectedJob = !data.selectedJob;
    this.selectedJobData = [data];
  }

  getPostedJobData() {
    let match = 0;
    this.service.getOpportunity(match).subscribe((res: any) => {
      if(res.status) {
        this.jobPostList = res.data;
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
    }
  }

  getCandidateData(id: number) {
    this.service.getOpportunity(id).subscribe((res: any) => {
      if(res.status) {
        this.candidateData = res.recommendation;
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error);
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
