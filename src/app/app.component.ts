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

  constructor(private service: AppService, private router: Router) {}

  ngOnInit(): void {
    this.getLogInUser();
  }

  getLogInUser(): void {
    this.service.user.subscribe((res: any) => {
      if(res) {
        this.user = res;
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    })
  }
}
