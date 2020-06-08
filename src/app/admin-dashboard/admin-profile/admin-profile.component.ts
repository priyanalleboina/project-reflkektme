import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminDashboardService } from '../service/admin-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { MediaType } from 'src/app/constants/enum';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProfileComponent implements OnInit {
  InfluencerDetails: any;
  fileUploade: any;
  profileImage: any;
  mediaTypeEnum: any;
  upload: boolean;
  isCPwdVisible = false;
  constructor(private adminDashboardService: AdminDashboardService,
    private router: Router,
    private toastrService: ToastrService, private DataService: DataService, ) {
    this.InfluencerDetails = {};
    this.mediaTypeEnum = new MediaType();
  }

  ngOnInit() {
    this.getAdminInfo();
  }
  public getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  getImageSize(file, cb) {
    let ht;
    let wt;
    let isBigSize = false;
    this.getBase64(file).then(base64 => {
      const img = new Image();
      img.onload = (() => {
        wt = img.width;
        ht = img.height;
        if ((file.size / (1024 * 1024)) <= 5) {
          isBigSize = true;
        }
        cb({ height: ht, width: wt, isSize: isBigSize });
      });
      img.src = base64.toString();
    });
  }
  uploadFile(event: any) {
    // this.InfluencerDetails.file = event.target.files[0];
    var ext = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
      this.getImageSize(event.target.files[0], (data) => {
        if (data.width > 600 || data.height > 400) {
          if (data.isSize) {
            this.upload = true;
            this.adminDashboardService.uploadFile(event.target.files[0], this.mediaTypeEnum.profileImage).subscribe(
              (result) => {
                if (result.status === 200) {
                  // console.log(JSON.stringify(result))
                  // this.profileImage = result.data.media_url;
                  this.InfluencerDetails.media = result.data;
                }
              },
              (error) => {
                this.toastrService.error(JSON.stringify(error));
              });
          } else {
            this.toastrService.warning('Image should be less than 5Mb');
          }
        }
        else {
          this.toastrService.warning('Images should be at least 400px *600px as a png or jpeg files');
        }
        // if (event.target.files && event.target.files[0]) {
        //   var reader = new FileReader();
        //   reader.onload = (event: ProgressEvent) => {
        //     this.profileImage = (<FileReader>event.target).result;
        //   }
        //   reader.readAsDataURL(event.target.files[0]);
        // }
      }
      )
    } else {
      this.upload = false;
      this.toastrService.error('Image should be png or jpeg file');
    }
  }
  saveAddInfluencerDetails() {
    //  console.log(JSON.stringify(this.InfluencerDetails));
    if (this.InfluencerDetails.password == undefined) {
      this.InfluencerDetails.password = null;
    }
    this.adminDashboardService.updateAdmin(this.InfluencerDetails).subscribe((result) => {
      if (result.status === 200) {
        this.toastrService.success("updated successfully");
        this.getAdminInfo();
      } else {
        if (result.status === 401) {
          this.DataService.logoutUser(false);
          localStorage.clear();
          this.toastrService.success(result.message + " please login again");
          this.router.navigate(['login']);
        }
      }
    },
      (err) => {
        this.toastrService.error(JSON.stringify(err.error));
      });
  }
  generatePassword() {
    this.adminDashboardService.generatePasswordInfluencer().subscribe((res) => {
      this.InfluencerDetails.password = res.data;
    },
      (err) => {
        this.toastrService.error(JSON.stringify(err.message));
      });
  }
  getAdminInfo() {
    let email_admin = localStorage.getItem('admin_email');
    this.adminDashboardService.getUserByEmail(email_admin).subscribe((res) => {
      this.InfluencerDetails = res['data'];
      // localStorage.setItem('Profilepic',this.InfluencerDetails.media.media_url)
      this.DataService.sendadminProfile(this.InfluencerDetails);
    },
      (err) => {
        this.toastrService.error(JSON.stringify(err.message));
      });
  }
  removeFile() {
    this.upload = false;
    this.InfluencerDetails.file = '';
    this.profileImage = '';
    this.InfluencerDetails.media.media_url = '';
  }

}
