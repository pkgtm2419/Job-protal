import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService, ToasterService } from '../_shared/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  showPass: boolean = true;
  form :FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private toaster: ToasterService, private service: AppService, private router: Router) {
    if (this.service.getToken()) {
      this.service.user.subscribe((res: any) => {
        res = JSON.parse(res);
        if(res.is_verified) {
          this.router.navigate(['dashboard']);
        } else {
          this.service.logOut();
        }
      })
    } else {
      this.service.logOut();
    }
  }

  ngOnInit(): void {}

  createForm(): void {
    if(!this.form.valid) {
      this.toaster.error("Please enter valid user and password!");
      return;
    }
    let match = this.form.value;
    this.service.userLogIn(match).subscribe((res: any) => {
      window.location.reload();
      this.toaster.success('User Login successfully!');
    }),
    (error: any) => {
      this.toaster.error("Please enter valid user and password!"+ error);
    }
  }

}
