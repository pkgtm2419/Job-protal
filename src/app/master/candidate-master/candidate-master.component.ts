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

  constructor(private matDialog: MatDialog, private toaster: ToasterService, private service: AppService) { }

  ngOnInit(): void { }

  getData(): void {
    this.limits.push(this.candidateList.length);
    this.dataSource = new MatTableDataSource(this.candidateList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = Object.keys(this.candidateList[0]);
    this.displayedColumns.push('Action');
  }

  openModal() {
    this.matDialogRef = this.matDialog.open(ResumeComponent, { disableClose: true });
    this.matDialogRef.afterClosed().subscribe((res: any) => {
      if(res) {
        this.ngOnInit();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
