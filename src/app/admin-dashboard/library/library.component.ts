import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MediaType } from 'src/app/constants/enum';
import { AdminDashboardService } from '../service/admin-dashboard.service';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LibraryComponent implements OnInit {
  activePage: string;
  isHeightInCm: boolean;
  isWeightInLbs: boolean;
  openImgPopup: boolean;
  isLibraryHidden: boolean;
  isEditMedia: boolean;
  mediaTypeEnum: any;
  searchBasedOn: any;
  inf_Media_product: any = [];
  influencerMedia: any = [];
  mediaCount: number;
  count: any;
  // filtercategory: any = {};
  categorySizeArr: any = [];
  allMediaOfInfluencer: any = [];
  selectedProfile: any;
  totalMedia: number;
  influencerId: number;
  // influencerSelect: string;
  totalMediaToDisplay: number;
  allcategoryArr: any = [];
  productDetails: any;
  mediaProduct: any = {};
  measurement_detailObj: any;
  file_Uploade: any;
  media: any;
  measurements: any;
  currentMediaId: number;
  isSearch: boolean;

  //
  currentMedia: any;
  selectedPageNumber = 0;
  totalElement = 0;
  totalPages = 1;
  influencerList = [];
  selectedInfluencerId = '';
  measurementDetailObj: any = {};
  selectedImageAsFile = [];
  isweightInLbs = false;
  ismeasurementInCm = false;
  fileList = [];
  wearingSize = [];
  isHeightInFeet = false;
  bodyTypes = [];
  selectedMediaId: any;
  selectedMediaToReplace: any;
  isDisplayDeleteModal = false;
  constructor(
    private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService,
    private cd: ChangeDetectorRef,
    private dataService: DataService) {
    this.mediaTypeEnum = new MediaType();
    this.activePage = this.mediaTypeEnum.Image;
    this.isHeightInCm = false;
    this.isWeightInLbs = false;
    this.openImgPopup = false;
    this.isLibraryHidden = false;
    this.isEditMedia = false;
    this.isSearch = false;
    this.searchBasedOn = '';
    this.productDetails = {};
    this.measurements = [];
    this.productDetails.measurement_detail = [];
    this.measurement_detailObj = {};
    this.productDetails.measurement_detail.push(this.measurement_detailObj);
  }

  ngOnInit() {
    this.getAllSizes();
    this.getAllProductofAllInfluencersByCriteria();
    this.getAllInfluencers();
    this.getAllCategory();
    this.getBodyTypes();
    // this.isDisplayDeleteModal = true;
  }

  findCategoryId(categoryName) {
    const categoryObj = this.allcategoryArr.filter((e) =>
      categoryName === e.category_name)[0];
    this.productDetails.category_id = categoryObj.category_id;
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
  getAlldata(search) {
    if (search == '') {
      this.getAllProductofAllInfluencersByCriteria();
    }
  }
  getNextProducts(type) {
    this.selectedPageNumber = type === 'prev' ? Number(this.selectedPageNumber) - 1 :
      Number(this.selectedPageNumber) + 1;
    this.getAllProductofAllInfluencersByCriteria();
  }

  getAllSizes() {
    this.adminDashboardService.getSize().subscribe((result: any) => {
      if (result.status === 200) {
        this.measurements = result.data;
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  resetMediasEdit() {
    this.influencerMedia.forEach((elem) => {
      elem.isEditMedia = false;
    });
  }
  findProductByMedia(mediaId, meds, product) {
    this.selectedMediaId = mediaId;
    this.currentMedia = mediaId;
    this.productDetails.measurement_detail = [];
    this.productDetails.measurement_detail.push(this.measurement_detailObj);
    this.isEditMedia = true;
    this.influencerMedia.forEach((elem) => {
      if (elem && elem.medias && elem.medias[0] && elem.medias[0].media_id) {
        if (elem.medias[0].media_id === mediaId) {
          elem.isEditMedia = true;
        } else {
          elem.isEditMedia = false;
        }
      }
    });

    this.productDetails = JSON.parse(JSON.stringify(product));
    if (this.allcategoryArr && this.allcategoryArr.length) {
      this.allcategoryArr.forEach((e) => {
        if (this.productDetails && this.productDetails.category_id) {
          if (this.productDetails.category_id === e.category_id) {
            this.productDetails.category_name = e.category_name;
            this.wearingSize = e.wearing_sizes;
          }
        }
      });
      if (this.productDetails.assign_tag && this.productDetails.assign_tag.length) {
        this.productDetails.assign_tag = this.productDetails.assign_tag;
      }
      if (this.productDetails.product_url) {
        this.productDetails.product_url = this.productDetails.product_url;
      }
    }
    if (this.productDetails && this.productDetails.measurement_detail && this.productDetails.measurement_detail.length) {
      this.measurementDetailObj.measurementDetailId = this.productDetails.measurement_detail[0].measurementDetailId;
      this.measurementDetailObj.size = this.productDetails.measurement_detail[0].size;
      this.measurementDetailObj.height = this.productDetails.measurement_detail[0].height;
      this.measurementDetailObj.bodyType = this.productDetails.measurement_detail[0].bodyType;
      this.measurementDetailObj.weight = this.productDetails.measurement_detail[0].weight;
      this.measurementDetailObj.hips = this.productDetails.measurement_detail[0].hips;
      this.measurementDetailObj.waist = this.productDetails.measurement_detail[0].waist;
      this.measurementDetailObj.category_id = this.productDetails.category_id;
      this.measurementDetailObj.bust = this.productDetails.measurement_detail[0].bust;
      this.measurementDetailObj.heightFeet = this.productDetails.measurement_detail[0].heightFeet;
      this.measurementDetailObj.heightInch = this.productDetails.measurement_detail[0].heightInch;
      this.measurementDetailObj.heightCentemeter = this.productDetails.measurement_detail[0].heightCentemeter;
      this.measurementDetailObj.weightKiloGram = this.productDetails.measurement_detail[0].weightKiloGram;
      this.measurementDetailObj.weightLbs = this.productDetails.measurement_detail[0].weightLbs;
      this.measurementDetailObj.heightMeasurement = this.productDetails.measurement_detail[0].heightMeasurement;
      this.measurementDetailObj.weightMeasurement = this.productDetails.measurement_detail[0].weightMeasurement;
      this.measurementDetailObj.hipsBustWaistMeasurement = this.productDetails.measurement_detail[0].hipsBustWaistMeasurement;
      this.measurementDetailObj.reflektmeOnTips = this.productDetails.measurement_detail[0].reflektmeOnTips;
      if (this.measurementDetailObj.weightMeasurement == 'LBS') {
        this.isweightInLbs = true;
      }
      if (this.measurementDetailObj.weightMeasurement == 'KG') {
        this.isweightInLbs = false;
      }
      if (this.measurementDetailObj.hipsBustWaistMeasurement == 'INCH') {
        this.ismeasurementInCm = false;
      }
      if (this.measurementDetailObj.hipsBustWaistMeasurement == 'CM') {
        this.ismeasurementInCm = true;
      }
      if (this.measurementDetailObj.heightMeasurement == 'FEET') {
        this.isHeightInCm = false;
      }
      if (this.measurementDetailObj.heightMeasurement == 'CM') {
        this.isHeightInCm = true;
      }
      this.productDetails.measurement_detail[0].media = JSON.parse(JSON.stringify(meds));
      this.productDetails.measurement_detail[0].media.forEach((el) => {
        if (mediaId === el.media_id) {
          el.selectedImg = true;
        } else {
          el.selectedImg = false;

        }
      });
    }
  }

  findMeasurementId() {
    if (this.measurements) {
      const obj = this.measurements.find((e: any) => e.size === this.productDetails.size_tag);
    }
  }
  getAllProductofAllInfluencersByCriteria(id?) {
    let reqObj: any = {};
    reqObj.page = this.selectedPageNumber;
    if (this.searchBasedOn) {
      reqObj.searchKeyword = this.searchBasedOn;
    }
    if (this.searchBasedOn) {
      reqObj.searchKeyword = this.searchBasedOn;
    }
    if (this.selectedInfluencerId) {
      reqObj.influencerId = this.selectedInfluencerId;
    }
    reqObj.mediatype = this.activePage;
    this.adminDashboardService.getAllProductofInfluencerOfLibraries(reqObj).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          const temp = this.sortByDate(result.data);
          this.influencerMedia = temp.map((element) => {
            if (element.product.product_id === id) {
              element.isEditMedia = true;
            } else {
              element.isEditMedia = false;
            }
            return element;
          });
        } else {
          this.influencerMedia = [];
        }
        if (result.total_element) {
          this.totalElement = result.total_element;
        }
        if (result.current_page_no) {
          this.selectedPageNumber = result.current_page_no;
        }
        if (result.total_page_no) {
          this.totalPages = result.totalPages;
        }
      } else {
        //
        this.influencerMedia = [];
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  sortByDate(arr) {
    arr.sort((a, b) => {
      return Number(new Date(a.created_date).getMilliseconds()) > Number(new Date(b.created_date).getMilliseconds()) ? -1 : 1;
    });
    return arr;
  }

  setPopupImage(mediaId, type?) {
    $('#openImgPopup').modal('show');
    this.currentMediaId = mediaId;
    this.influencerMedia.forEach((e: any) => {
      if (e.media_id === mediaId) {
        this.media = JSON.parse(JSON.stringify(e));
      }
    });
  }

  openFile() {
    document.getElementById("fileSelecter").click();
  }
  changeTab(mediaType) {
    this.searchBasedOn = '';
    this.selectedInfluencerId = '';
    this.activePage = mediaType;
    this.selectedPageNumber = 0;
    this.productDetails = {};
    this.isEditMedia = false;
    this.getAllProductofAllInfluencersByCriteria();
  }

  deleteMedia() {
    this.adminDashboardService.deleteMedia(this.currentMedia.media_id).subscribe(res => {
      if (res.status === 200) {
        if (this.activePage === this.mediaTypeEnum.Image) {
          this.toastrService.success('Image Deleted Successfully');
        } else {
          this.toastrService.success('Video Deleted Successfully');
        }
        this.isEditMedia = false;
        this.productDetails = {};
        this.isDisplayDeleteModal = false;
        setTimeout(() => {
          $('#openImgPopup').modal('hide');
        }, 100);
        $('.modal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-backdrop');
        this.getAllProductofAllInfluencersByCriteria();
        // this.changeTab(this.activePage);
      } else {
        this.toastrService.error(res.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  hideDetailsClick() {
    this.isLibraryHidden = true;
    this.isEditMedia = false;
    this.influencerMedia.forEach((element) => {
      element.isEditMedia = false;
    });
  }
  createProduct(form?: NgForm, isFromSave?) {
    if (this.productDetails.product_price > 0) {
      const currentMedias = this.productDetails.measurement_detail[0].media;
      this.productDetails.status = 'ACTIVE';
      this.productDetails.measurement_detail = [];
      this.productDetails.measurement_detail[0] = this.measurementDetailObj;
      this.productDetails.measurement_detail[0].media = currentMedias;
      if (this.isweightInLbs == true) {
        this.productDetails.measurement_detail[0].weightKiloGram = '';
        this.productDetails.measurement_detail[0].weightMeasurement = 'LBS';
      }
      if (this.isweightInLbs == false) {
        this.productDetails.measurement_detail[0].weightLbs = '';
        this.productDetails.measurement_detail[0].weightMeasurement = 'KG';
      }
      if (this.isHeightInCm == false) {
        this.productDetails.measurement_detail[0].heightCentemeter = '';
        this.productDetails.measurement_detail[0].heightMeasurement = 'FEET';
      }
      if (this.isHeightInCm == true) {
        this.productDetails.measurement_detail[0].heightFeet = '';
        this.productDetails.measurement_detail[0].heightInch = '';
        this.productDetails.measurement_detail[0].heightMeasurement = 'CM';
      }
      if (this.ismeasurementInCm == true) {
        this.productDetails.measurement_detail[0].hipsBustWaistMeasurement = 'CM';
      }
      if (this.ismeasurementInCm == false) {
        this.productDetails.measurement_detail[0].hipsBustWaistMeasurement = 'INCH';
      }
      this.adminDashboardService.createProduct(this.productDetails).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.toastrService.success('Product Updated Successfully');
            this.cd.detectChanges();

            if (isFromSave) {
              this.isEditMedia = false;
              this.getAllProductofAllInfluencersByCriteria();
            } else {
              this.isEditMedia = true;
              $('#openImgPopup .close').click();
              //  this.resetMediasEdit();
              this.getAllProductofAllInfluencersByCriteria(this.productDetails.product_id);
            }
          }
        },
        (error) => {
          this.toastrService.error(JSON.stringify(error));
        });
    } else {
      return;
    }
  }

  getAllCategory() {
    this.adminDashboardService.getSizeChartDetails().subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          this.allcategoryArr = result.data;
        } else {
          this.allcategoryArr = [];
        }
        this.dataService.sendCategories(result.data);
      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
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
    let count = files.length;
    files.forEach((f: any) => {
      count = count - 1;
      imageSizeLarge = imageSizeLarge + f.size;
      if (count == 0) {
        if ((imageSizeLarge / (1024 * 1024)) <= 15) {
          cb(true);
        } else {
          cb(false);
        }
      }
    });
  }

  // upload files
  getFilesAfterUpload(event, mediaId?) {
    let mediaType;
    var c = 0;
    let files: any = [];

    const ext = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);
    if ((ext === 'mp4' && this.activePage === 'VIDEO') ||
      ((ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'gif') && this.activePage === 'IMAGES')) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'video/mp4' || event.target.files[i].type === 'image/gif' || event.target.files[i].type === 'image/png') {
          files.push(event.target.files[i]);
          if (event.target.files[i].type === 'video/mp4') {
            mediaType = this.mediaTypeEnum.Video;
          } else {
            mediaType = this.mediaTypeEnum.Image;
          }
        }
        else {
          c++;
        }
      }
      if (c > 0) {
        this.toastrService.error("Only jpeg, png, gif and mp4 files with max size of 15 MB is allowed")
      }
      else {
        this.getImageSize(files, (isAllow) => {
          if (isAllow) {
            this.adminDashboardService.uploadMultipleImagesForInfluencer(files, mediaType).subscribe(
              (result) => {
                if (result.status === 200) {
                  if (result.data && result.data.length) {
                    this.toastrService.success('Uploaded Successfully');
                    let cnt = this.productDetails.measurement_detail[0].media.length;
                    if (this.productDetails && this.productDetails.measurement_detail &&
                      this.productDetails.measurement_detail.length && this.productDetails.measurement_detail[0]
                      && this.productDetails.measurement_detail[0].media && this.productDetails.measurement_detail[0].media.length) {
                      let tempMedias = this.productDetails.measurement_detail[0].media;
                      tempMedias.forEach((ele, ind) => {
                        cnt--;
                        if (ele.media_id === this.selectedMediaToReplace) {
                          this.productDetails.measurement_detail[0].media[ind] = JSON.parse(JSON.stringify(result.data[0]));
                        }
                        if (cnt === 0) {

                          this.media = JSON.parse(JSON.stringify(result.data[0]));
                          this.createProduct(null, false);
                        }
                      });
                    }
                  }
                }
              },
              (error) => {
                this.toastrService.error(JSON.stringify(error));
              });
          } else {
            this.toastrService.error('Only jpeg, png, gif and mp4 files with max size of 15 MB is allowed');
          }
        });
      }
    } else {
      if (this.activePage === 'VIDEO') {
        this.toastrService.error('File should be only mp4');
      } else {
        this.toastrService.error('File should be png or jpeg or gif');
      }
    }

  }
}
