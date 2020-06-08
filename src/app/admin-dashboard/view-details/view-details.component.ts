import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { AdminDashboardService } from '../../admin-dashboard/service/admin-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { mediaAction, MediaType } from 'src/app/constants/enum';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'view-details-product',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewDetailsComponentProduct implements OnInit, OnChanges {
  display: boolean;
  allcategoryArr: any = [];
  modelDetails: any = {};
  wearingSize: any[];
  mediaActionEnum: any;
  @Input() media: any;
  //  @Input() Id: any;
  @Input() doAction: string;
  @Input() _display: boolean;
  @Output() messageEvent = new EventEmitter<string>();
  productDetails: any = {};
  isReplaceImgClick: boolean;
  mediaTypeEnum: any;
  file_Uploade: any;
  isFileUpload: boolean;
  isSaveEdit: boolean;
  values: string[];
  isHeightInFeet = false;
  isweightInLbs = false;
  ismeasurementInCm = false;
  isHeightInCm = false;
  mediaId: any;
  media_object: any;
  media_type: any;
  influencerList:[];
  InfluencerNameData:boolean =false;
  @Output() isClose = new EventEmitter<any>();
  bodyTypes = [];

  constructor(
    private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService,
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private router: Router
  ) {
    this.productDetails.measurement_detail = [];
    this.mediaActionEnum = new mediaAction();
    this.mediaTypeEnum = new MediaType();
  }
  ngOnInit() {
    this.isFileUpload = false;
    this.modelDetails.assign_tag = [];
    if(this.router.url=='/admin-dashboard/upload-media'){
      this.InfluencerNameData=true;
    }
  }

  ngOnChanges() {
    this.modelDetails.assign_tag = [];
    this.isSaveEdit = false;
    this.dataService.categoryArr.subscribe((result: any) => {
      this.allcategoryArr = result;
    });
    this.isReplaceImgClick = false;
    this.display = this._display;
    this.getProduct();
    this.getBodyTypes();
    this.getAllInfluencers();
  }

  getBodyTypes() {
    this.adminDashboardService.getBodyTypes().subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          this.bodyTypes = result.data;
        } else {
          this.bodyTypes = [];
        }
      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  findCategoryId(categoryName) {
    const categoryObj = this.allcategoryArr.filter((e) => categoryName === e.category_name)[0];
    this.modelDetails.category_id = categoryObj.category_id;
    this.wearingSize = categoryObj.wearing_sizes;
  }
  getAllInfluencers() {
    this.adminDashboardService.getAllInfluencers().subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          this.influencerList = result.data;
        } else {
          this.influencerList = [];
        }
      } else {
        // this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  getProduct() {
    this.mediaId = this.media.media_id;
    this.adminDashboardService.findProductByMedia(this.media.media_id).subscribe(
      (res: any) => {
        if (res.status === 200) {
          if (res.data) {
            this.modelDetails = res.data;
            if (this.allcategoryArr && this.allcategoryArr.length) {
              this.allcategoryArr.forEach((e) => {
                if (res.data && res.data.category_id) {
                  if (res.data.category_id === e.category_id) {
                    this.modelDetails.category_name = e.category_name;
                    this.wearingSize = e.wearing_sizes;
                  }
                }
              });


            }
            if (res.data && res.data.product_url) {
              this.modelDetails.product_url = res.data.product_url;
            }
            if (res.data && res.data.measurement_detail && res.data.measurement_detail.length) {
              this.modelDetails.product_price = res.data.product_price;
              this.modelDetails.size = res.data.measurement_detail[0].size;
              this.modelDetails.height = res.data.measurement_detail[0].heightFeet + '.' + res.data.measurement_detail[0].heightInch;
              this.modelDetails.bodyType = res.data.measurement_detail[0].bodyType;
              this.modelDetails.hips = res.data.measurement_detail[0].hips;
              this.modelDetails.waist = res.data.measurement_detail[0].waist;
              this.modelDetails.category_id = res.data.category_id;
              this.modelDetails.bust = res.data.measurement_detail[0].bust;
              this.modelDetails.reflektmeOnTips = res.data.measurement_detail[0].reflektmeOnTips;
              this.modelDetails.heightMeasurement = res.data.measurement_detail[0].heightMeasurement;
              this.modelDetails.heightCentemeter = res.data.measurement_detail[0].heightCentemeter;
              this.modelDetails.heightFeet = res.data.measurement_detail[0].heightFeet;
              this.modelDetails.heightInch = res.data.measurement_detail[0].heightInch;
              this.modelDetails.weightMeasurement = res.data.measurement_detail[0].weightMeasurement;
              this.modelDetails.weightKiloGram = res.data.measurement_detail[0].weightKiloGram;
              this.modelDetails.weightLbs = res.data.measurement_detail[0].weightLbs;
              this.modelDetails.hipsBustWaistMeasurement = res.data.measurement_detail[0].hipsBustWaistMeasurement;
              this.modelDetails.media = res.data.measurement_detail[0].media;
              this.modelDetails.user_id = res.data.user_id;
              if (this.modelDetails.weightMeasurement == 'LBS') {
                this.isweightInLbs = true;
              }
              if (this.modelDetails.weightMeasurement == 'KG') {
                this.isweightInLbs = false;
              }
              if (this.modelDetails.hipsBustWaistMeasurement == 'INCH') {
                this.ismeasurementInCm = false;
              }
              if (this.modelDetails.hipsBustWaistMeasurement == 'CM') {
                this.ismeasurementInCm = true;
              }
              if (this.modelDetails.heightMeasurement == 'FEET') {
                this.isHeightInCm = false;
              }
              if (this.modelDetails.heightMeasurement == 'CM') {
                this.isHeightInCm = true;
              }
            }

            this.cd.detectChanges();
            $('#productUrl').focus();
            setTimeout(() => {
              $('#productName').focus();
            }, 100);
          }
        } else {
          this.toastrService.info(res.message);
        }
      },
      (error) => {
        this.toastrService.error(JSON.stringify(error));
      });
  }

  saveProduct() {
    if (this.modelDetails.product_price < 1 || !this.modelDetails.assign_tag) {
      return;
    }
    this.productDetails.assign_tag = this.modelDetails.assign_tag;
    this.productDetails.category_id = this.modelDetails.category_id;
    this.productDetails.product_name = this.modelDetails.category_name;
    this.productDetails.product_price = this.modelDetails.product_price;
    this.productDetails.product_url = this.modelDetails.product_url;
    this.productDetails.product_name = this.modelDetails.product_name;
    this.productDetails.product_id = this.modelDetails.product_id;
    this.productDetails.size_tag = this.modelDetails.size_tag;
    this.productDetails.status = this.modelDetails.status;
    this.productDetails.user_id = this.modelDetails.user_id;
    let measurementDetailObj: any = {};
    measurementDetailObj.bodyType = this.modelDetails.bodyType;
    measurementDetailObj.bust = this.modelDetails.bust;
    measurementDetailObj.hips = this.modelDetails.hips;
    measurementDetailObj.height = this.modelDetails.height;
    measurementDetailObj.waist = this.modelDetails.waist;
    measurementDetailObj.weight = this.modelDetails.weight;
    measurementDetailObj.size = this.modelDetails.size;
    measurementDetailObj.product_price = this.modelDetails.product_price;
    measurementDetailObj.reflektmeOnTips = this.modelDetails.reflektmeOnTips;
    measurementDetailObj.hipsBustWaistMeasurement = this.modelDetails.hipsBustWaistMeasurement;
    measurementDetailObj.weightMeasurement = this.modelDetails.weightMeasurement;
    measurementDetailObj.weightLbs = this.modelDetails.weightLbs;
    measurementDetailObj.weightKiloGram = this.modelDetails.weightKiloGram;
    measurementDetailObj.heightCentemeter = this.modelDetails.heightCentemeter;
    measurementDetailObj.heightMeasurement = this.modelDetails.heightMeasurement;
    measurementDetailObj.heightFeet = this.modelDetails.heightFeet;
    measurementDetailObj.heightInch = this.modelDetails.heightInch;
    if (this.isweightInLbs == true) {
      measurementDetailObj.weightKiloGram = '';
      measurementDetailObj.weightMeasurement = 'LBS';
    }
    if (this.isweightInLbs == false) {
      measurementDetailObj.weightLbs = '';
      measurementDetailObj.weightMeasurement = 'KG';
    }
    if (this.isHeightInCm == false) {
      measurementDetailObj.heightCentemeter = '';
      measurementDetailObj.heightMeasurement = 'FEET';
    }
    if (this.isHeightInCm == true) {
      measurementDetailObj.heightFeet = '';
      measurementDetailObj.heightInch = '';
      measurementDetailObj.heightMeasurement = 'CM';
    }
    if (this.ismeasurementInCm == true) {
      measurementDetailObj.hipsBustWaistMeasurement = 'CM';
    }
    if (this.ismeasurementInCm == false) {
      measurementDetailObj.hipsBustWaistMeasurement = 'INCH';
    }
    if (this.modelDetails && this.modelDetails.measurement_detail && this.modelDetails.measurement_detail.length) {
      measurementDetailObj.measurementDetailId = this.modelDetails.measurement_detail[0].measurementDetailId;
    }
    if (this.media_object) {
      for (var i = 0; i < this.modelDetails.media.length; i++) {
        if (this.modelDetails.media[i].media_id == this.mediaId) {
          this.modelDetails.media[i] = {};
          this.modelDetails.media[i] = this.media_object;
        }
        measurementDetailObj.media = this.modelDetails.media;
      }
    }
    else {
      measurementDetailObj.media = this.modelDetails.media;
    }
    this.productDetails.measurement_detail.push(measurementDetailObj);
    this.adminDashboardService.createProduct(this.productDetails).subscribe(
      (res: any) => {
        this.display = false;
        if (res.status === 200) {
          this.closePopup();
          this.doAction = this.mediaActionEnum.View
          this.toastrService.success('Product Updated Successfully');
          this.dataService.setSearchBar(true);
        }
      },
      (error) => {
        this.toastrService.error(JSON.stringify(error));
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
  getImageSize(files, cb) {
    let imageSizeLarge = 0;
    // let count = files.length;
    // // files.forEach((f: any) => {
    //   count = count - 1;
      imageSizeLarge = imageSizeLarge + files.size;
      // if (count == 0) {
        if ((imageSizeLarge / (1024 * 1024)) <= 15) {
          cb(true);
        } else {
          cb(false);
        }
      // }
    // });
  }
  uploadFile(event: any) {
    // this.InfluencerDetails.file = event.target.files[0];
    var ext = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);
    if(this.router.url === '/admin-dashboard/influencer-photos') {
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'gif'){
      this.getImageSize(event.target.files[0], (isAllow) => {
        if (isAllow) {
            if (ext === 'mp4') {
              this.media_type = this.mediaTypeEnum.Video;
            }
            else {
              this.media_type = this.mediaTypeEnum.Image;
            }
            this.adminDashboardService.uploadFile(event.target.files[0], this.media_type).subscribe(
              (result) => {
                if (result.status === 200) {
                  this.media = {}
                  this.media = JSON.parse(JSON.stringify(result.data));
                  this.media_object = {};
                  this.media_object = result.data;
                  this.cd.detectChanges();
                  this.display = true;
                  // alert('this.mediaObj' + JSON.stringify(this.media))
                  // this.isFileUpload = true;
                }
              },
              (error) => {
                this.toastrService.error(JSON.stringify(error));
              });
          } else {
            this.toastrService.warning('File should be max 15Mb');
          }
        }
      )
    } else {
      this.toastrService.error('File should be png or jpeg or gif');
    }
  }
  else if(this.router.url === '/admin-dashboard/influencer-videos'){
    var ext = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);
    if (ext === 'mp4'){
      this.getImageSize(event.target.files[0], (isAllow) => {
        if (isAllow) {
            if (ext === 'mp4') {
              this.media_type = this.mediaTypeEnum.Video;
            }
            else {
              this.media_type = this.mediaTypeEnum.Image;
            }
            this.adminDashboardService.uploadFile(event.target.files[0], this.media_type).subscribe(
              (result) => {
                if (result.status === 200) {
                  this.media = {}
                  this.media = JSON.parse(JSON.stringify(result.data));
                  this.media_object = {};
                  this.media_object = result.data;
                  this.cd.detectChanges();
                  this.display = true;
                  // alert('this.mediaObj' + JSON.stringify(this.media))
                  // this.isFileUpload = true;
                }
              },
              (error) => {
                this.toastrService.error(JSON.stringify(error));
              });
          } else {
            this.toastrService.warning('File should be max 15Mb');
          }
        }
      )
    } else {
      this.toastrService.error('File should be only mp4');
    }
  }
  else {
    var ext = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'gif' || ext === 'mp4'){
      this.getImageSize(event.target.files[0], (isAllow) => {
        if (isAllow) {
            if (ext === 'mp4') {
              this.media_type = this.mediaTypeEnum.Video;
            }
            else {
              this.media_type = this.mediaTypeEnum.Image;
            }
            this.adminDashboardService.uploadFile(event.target.files[0], this.media_type).subscribe(
              (result) => {
                if (result.status === 200) {
                  this.media = {}
                  this.media = JSON.parse(JSON.stringify(result.data));
                  this.media_object = {};
                  this.media_object = result.data;
                  this.cd.detectChanges();
                  this.display = true;
                  // alert('this.mediaObj' + JSON.stringify(this.media))
                  // this.isFileUpload = true;
                }
              },
              (error) => {
                this.toastrService.error(JSON.stringify(error));
              });
          } else {
            this.toastrService.warning('File should be max 15Mb');
          }
        }
      )
    } else {
      this.toastrService.error('File should be png or jpeg or gif or mp4');
    }
  }
  }

  sendMessage() {
    this.messageEvent.emit();
  }

  openFile() {
    document.getElementById('fileSelecter').click();
  }
  closePopup() {
    this.isClose.emit();
    this.display = false;
  }
  onclickOfEdit() {
    $('#productUrl').focus();
    setTimeout(() => {
      $('#assignTag').focus();
      this.cd.detectChanges();
    }, 200);
  }
  ngOnDestroy(){
    this.dataService.setSearchBar(false);
  }
}


