import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToasterService, AppService } from 'src/app/_shared/_service';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.css']
})
export class JobMasterComponent {
  match: any;
  dataSource: any;
  layoutStyle: string = 'grid';

  constructor(private toaster: ToasterService, private service: AppService) { }

  ngOnInit(): void {

  }

  getData(data: any) {
    console.log(data);
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
