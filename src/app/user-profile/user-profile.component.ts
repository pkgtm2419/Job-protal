import { Component } from '@angular/core';
import { ProfilePicComponent } from './profile-pic.componenet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService, ToasterService } from '../_shared/_service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  matDialogRef!: MatDialogRef<ProfilePicComponent>;
  userData: any;
  formFillData: any;
  panelOpenState: boolean = false;

  constructor(private matDialog: MatDialog, private service: AppService, private toaster: ToasterService) {
    this.service.user.subscribe((res: any) => {
      this.userData = [JSON.parse(res)];
    });
  }

  ngOnInit(): void {
    this.getProfile();
    this.formFillData = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      bloodGroup: new FormControl(''),
      dateOfJoining: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required]),
      motherName: new FormControl('', [Validators.required]),
      bioMetricId: new FormControl(''),
      employeeID: new FormControl('', [Validators.required]),
      reportingManager: new FormControl('', [Validators.required]),
      employeeType: new FormControl('', [Validators.required]),
      employeeStatus: new FormControl('', [Validators.required]),
      employeeConfirmationDate: new FormControl(''),
      subCompany: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      subDepartment: new FormControl(''),
      designation: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      subBranch: new FormControl('', [Validators.required]),
      personalMail: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl(''),
      religion: new FormControl(''),
      permanentAddress: new FormControl(''),
      currentAddress: new FormControl(''),
      companyName: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      lastDesignation: new FormControl(''),
      lastJobDescription: new FormControl(''),
      qualification: new FormControl(''),
      specialization: new FormControl(''),
      qualificationType: new FormControl(''),
      passoutYear: new FormControl(''),
    });
  }

  get formFillDataControl() {
    return this.formFillData.controls;
  }

  createEmployeeData(): void {
    if(!this.formFillData.valid) {
      this.toaster.warning("Fill Complete Form!");
      return;
    }
    let match = this.formFillData.value;
    console.log(match);
    // this.common.createEmployee(match).subscribe((res: any) => {
    //   if(res.status) {
    //     this.formFillData.reset();
    //     this.router.navigate(['candidate']);
    //     this.toaster.success(res.message);
    //   } else {
    //     this.toaster.warning(res.message);
    //   }
    // }),
    // (error: any) => {
    //   this.toaster.error(`Technical issue ${error}`);
    // };
  }

  getProfile(): void {
    this.service.getSeekerProfile().subscribe((res:any) => {
      if(res.status) {
        this.toaster.success(res.message);
      } else {
        this.toaster.warning(res.message);
      }
    }),
    (error: any) => {
      this.toaster.error(`Technical issue ${error}`);
    }
  }

  openModal() {
    this.matDialogRef = this.matDialog.open(ProfilePicComponent, { data: this.userData, disableClose: true });
    this.matDialogRef.afterClosed().subscribe((res: any) => {
      if(res) {
        this.ngOnInit();
      }
    });
  }

  ngAfterViewInit(): void {
    const bgCoverImage = `../../assets/bgCover/Wallpaper${Math.floor(Math.random() * 25)}.jpg`;
    let tag = (<HTMLElement>document.getElementById('bgCoverImage'));
    if(bgCoverImage) {
      tag.style.backgroundImage = `url('${bgCoverImage}')`;
      tag.style.backgroundRepeat = "none";
    } else {
      tag.style.backgroundColor = `#fff`;
    }
    tag.style.backgroundSize = "100% 250px";
    tag.className += 'img-fluid';
    tag.style.height = "200px";
    console.log(this.userData);
    const profileImage = (this.userData[0].profile_pic) ? `http://172.16.15.251:8002${this.userData[0].profile_pic}` : `${'../../assets/profile.png'}`;
    let profileLogo = (<HTMLElement>document.createElement('img'));
    profileLogo.setAttribute('src', `${profileImage}`);
    profileLogo.setAttribute('alt', `User Profile Image`);
    profileLogo.className += 'img-thumbnail m-4';
    profileLogo.style.width = '150px';
    profileLogo.style.height = '150px';
    profileLogo.style.borderRadius = '50%';
    (<HTMLElement>document.getElementById('profileImage')).appendChild(profileLogo);
  }

  refresh(): void {
    this.ngOnInit();
  }

}
