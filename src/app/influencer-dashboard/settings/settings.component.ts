import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminDashboardService } from 'src/app/admin-dashboard/service/admin-dashboard.service';
import { MediaType } from 'src/app/constants/enum';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  InfluencerData: any = {};
  mediaTypeEnum: any;
  @Output() ProfileImgEvent = new EventEmitter<string>();
  @ViewChild('uploadeImg', { static: false }) uploadeImg: ElementRef;
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef;

  constructor(
    private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService,
    private dataService: DataService,
    private router: Router,
    public cd: ChangeDetectorRef) {
    this.mediaTypeEnum = new MediaType();
  }

  ngOnInit() {
    if (localStorage.getItem('InfluencerData')) {
      this.InfluencerData = JSON.parse(localStorage.getItem('InfluencerData'));
    }
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
    const ext = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);

    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
      this.getImageSize(event.target.files[0], (data) => {
        if (data.width > 600 || data.height > 400) {
          if (data.isSize) {
            this.adminDashboardService.uploadFile(event.target.files[0], this.mediaTypeEnum.profileImage).subscribe(
              (result) => {
                if (result.status === 200) {
                  // this.toastrService.info('Profile Image uploaded');
                  this.InfluencerData.media = result.data;
                  localStorage.setItem('InfluencerData', (JSON.stringify(this.InfluencerData)));
                  this.dataService.sendInfluencerData(this.InfluencerData);
                }
              },
              (error) => {
                this.toastrService.error(JSON.stringify(error));
              });
          } else {
            this.toastrService.warning('Image should be less than 5Mb');
          }
        } else {
          this.toastrService.warning('Image should be at least 400px *600px as a png or jpeg files');
          this.imageInput.nativeElement.value = '';
        }
      });
    } else {
      this.toastrService.warning('Image should be png or jpeg file');
      this.imageInput.nativeElement.value = '';
    }
  }

  // removeFile() {
  //   this.adminDashboardService.deleteProfileImage(this.InfluencerData.media.media_id).subscribe(
  //     (result) => {
  //       if (result.status === 200) {
  //         this.toastrService.info('Profile Image deleted');
  //         this.InfluencerData.media = '';
  //         this.imageInput.nativeElement.value = '';
  //         this.InfluencerData.media = '';
  //         localStorage.setItem('InfluencerData', (JSON.stringify(this.InfluencerData)));
  //         this.dataService.sendInfluencerData(this.InfluencerData);
  //       }
  //     },
  //     (error) => {
  //       this.toastrService.error(JSON.stringify(error));
  //     });
  // }
  removeFile() {
    // this.upload = false;
    // this.InfluencerDetails.file = '';
    this.InfluencerData.media = {};
  }

  updateInfluencer() {
    this.adminDashboardService.updateInfluencer(this.InfluencerData).subscribe((res) => {
      if (res.status === 200) {
        this.toastrService.info('Profile Updated Successfully.');
        localStorage.setItem('InfluencerData', (JSON.stringify(this.InfluencerData)));
        this.dataService.sendInfluencerData(this.InfluencerData);
      } else {
        this.toastrService.error(res.message);

      }
    },
      (err) => {
        this.toastrService.error(JSON.stringify(err.error));
      });
  }
}

