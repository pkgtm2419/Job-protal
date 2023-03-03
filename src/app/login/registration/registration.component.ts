import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService, ToasterService } from 'src/app/_shared/_service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  implements OnInit {
  form :FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required]),
    otp: new FormControl(''),
    role: new FormControl('', [Validators.required])
  });

  constructor(private toaster: ToasterService, private service: AppService, private router: Router) {}
  emailValidationOTP: boolean = false;

  ngOnInit(): void {}

  createForm(): void {
    if(this.emailValidationOTP) {
      this.emailOTP();
      return;
    }
    if(!this.form.valid) {
      this.toaster.error("Please enter valid user and password!");
      return;
    }
    let match = this.form.value;
    delete match.otp;
    this.service.registerUser(match).subscribe((res: any) => {
      console.log(res);
      console.log(this.emailValidationOTP);
      if(res.status) {
        this.emailValidationOTP = true;
        this.toaster.success('User Login successfully!');
      } else {
        this.toaster.error('User Login Failed!');
      }
    }),
    (error: any) => {
      this.toaster.error("Please enter valid user and password!"+ error);
    }
  }

  emailOTP(): void {
    let match = { otp : this.form.value.otp };
    this.service.emailOTPValidation(match).subscribe((res: any) => {
      if(res.status) {
        this.form.reset();
        this.router.navigate(['dashboard']);
        this.toaster.success(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error("Please enter valid user and password!"+ error);
    }
  }
}
