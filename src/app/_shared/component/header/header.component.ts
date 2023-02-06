import { Component } from '@angular/core';
import { AppService } from '../../_service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any;
  userName: any;
  role: any;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.service.user.subscribe((res:any) => {
      this.user = JSON.parse(res);
      this.userName = this.user.name;
      this.role = this.user.role;
    });
  }

  logOutUser(): void {
    this.service.logOut().subscribe((res: any) => {
      this.service.sessionClear();
      this.ngOnInit();
    });
  }

}
