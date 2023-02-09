import { Component } from '@angular/core';
import { ProfilePicComponent } from './profile-pic.componenet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService, ToasterService } from '../_shared/_service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  matDialogRef!: MatDialogRef<ProfilePicComponent>;

  constructor(private matDialog: MatDialog, private service: AppService, private toaster: ToasterService) {}

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(): void {
    this.service.getSeekerProfile().subscribe((res:any) => {
      if(res.status) {
        console.log(res);
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
    this.service.user.subscribe((res: any) => {
      this.matDialogRef = this.matDialog.open(ProfilePicComponent, { data: res, disableClose: true });
      this.matDialogRef.afterClosed().subscribe((res: any) => {
        if(res) {
          this.ngOnInit();
        }
      });
    });
  }

  ngAfterViewInit(): void {
    const bgCoverImage = `${'../../assets/bgCover/Wallpaper18.jpg'}`;
    let tag = (<HTMLElement>document.getElementById('bgCoverImage'));
    if(bgCoverImage) {
      tag.style.backgroundImage = `url('${bgCoverImage}')`;
      tag.style.backgroundRepeat = "none";
    } else {
      tag.style.backgroundColor = `#fff`;
    }
    tag.style.backgroundSize = "100% 200px";
    tag.className += 'img-fluid';
    tag.style.height = "200px";
    const profileImage = `${'../../assets/profile.png'}`;
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
