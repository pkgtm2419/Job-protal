import { Component } from '@angular/core';
import { AppService } from './_shared/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;
  userName: any;
  role: any;
  profileImage: any;

  constructor(private service: AppService, public router: Router) {}

  ngOnInit(): void {
    this.getLogInUser();
  }

  getLogInUser(): void {
    this.service.user.subscribe((res:any) => {
      if(res) {
        this.user = JSON.parse(res);
        // console.log(this.user);
        this.profileImage = (this.user.profile_pic) ? `http://172.16.15.251:8002${this.user.profile_pic}` : `${'../assets/profile.png'}`;
        this.userName = this.user.name;
        this.role = this.user.role;
      }
    });
  }

  logOutUser(): void {
    this.service.logOut().subscribe((res: any) => {
      this.service.sessionClear();
      this.ngOnInit();
    });
  }
}
