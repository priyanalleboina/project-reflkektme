import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AdminDashboardService } from '../service/admin-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { MediaType } from 'src/app/constants/enum';
@Component({
  selector: 'app-add-influencer',
  templateUrl: './add-influencer.component.html',
  styleUrls: ['./add-influencer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddInfluencerComponent implements OnInit {
  InfluencerDetails: any;
  fileUploade: any;
  profileImage: any;
  mediaTypeEnum: any;
  upload: boolean;
  isCPwdVisible = false;
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef;

  constructor(
    private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService) {
    this.InfluencerDetails = {};
    this.mediaTypeEnum = new MediaType();
  }

  ngOnInit() {

  }

  saveAddInfluencerDetails() {
    //  console.log(JSON.stringify(this.InfluencerDetails));
    this.adminDashboardService.saveAddInfluencerDetails(this.InfluencerDetails).subscribe((result) => {
      // this.InfluencerDetails = {};
      if (result.status === 200) {
        this.toastrService.success("Influencer created successfully and Please check your mail");
        this.InfluencerDetails = {};
        this.imageInput.nativeElement.value = '';
        this.fileUploade = '';
        this.removeFile();
      } else {
        this.removeFile();
        this.toastrService.error(JSON.stringify(result.message));
      }
    },
      (err) => {
        this.removeFile();
        this.toastrService.error(JSON.stringify(err.error));
      });
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
                  this.profileImage = result.data.media_url;
                  this.InfluencerDetails.mediaId = result.data.media_id;
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

  generatePassword() {
    this.adminDashboardService.generatePasswordInfluencer().subscribe((res) => {
      this.InfluencerDetails.password = res.data;
    },
      (err) => {
        this.toastrService.error(JSON.stringify(err.message));
      });
  }

  removeFile() {
    this.upload = false;
    this.InfluencerDetails.file = '';
    this.profileImage = '';
  }
}
