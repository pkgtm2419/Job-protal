import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required]),
    otp: new FormControl(''),
  });

  constructor(private toaster: ToasterService, private service: AppService) {}
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
    match.role = 'seeker';
    this.service.registerUser(match).subscribe((res: any) => {
      console.log(res);
      this.emailValidationOTP = true;
      this.toaster.success('User Login successfully!');
    }),
    (error: any) => {
      this.toaster.error("Please enter valid user and password!"+ error);
    }
  }

  emailOTP(): void {
    let match = { otp : this.form.value.otp };
    this.service.emailOTPValidation(match).subscribe((res: any) => {
      console.log(res);
      this.toaster.success('User Login successfully!');
    }),
    (error: any) => {
      this.toaster.error("Please enter valid user and password!"+ error);
    }
  }
}
