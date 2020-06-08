import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminDashboardService } from '../../admin-dashboard/service/admin-dashboard.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { mediaAction, MediaType } from '../../constants/enum';
import { FileHandle } from '../../../app/services/dragDrop.directive';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var $: any;
@Component({
  selector: 'app-influencer-videos',
  templateUrl: './influencer-videos.component.html',
  styleUrls: ['./influencer-videos.component.css']
})

export class InfluencerVideosComponent implements OnInit {
  profileImage;
  productDetails: any = {};
  measurementDetailObj: any = {};
  totalPages = 1;
  totalElement = 0;
  selectedPageNumber = 0;

  influencerMedia: any = [];
  public filesToUpload: any = [];
  mediaTypeEnum: any;
  fileList: any = [];
  isSearch = false;
  search = '';
  isFilterOpen = false;
  allcategoryArr: any = [];
  categorySizeArr: any = [];
  filtercategory: any = {};
  mediaActionEnum: any;
  files = [];
  selectedMediaIds: any = [];
  isMediaSelect = false;
  selectedImageAsFile: any = [];
  measurements: any = [];
  wearingSize: any = [];
  isHeightInCm = false;
  isweightInLbs = false;
  ismeasurementInCm = false;
  isLibraryHidden = false;
  influencerId: any;
  currentMedia: any = {};
  dropdownSettings: IDropdownSettings;
  selectedProducts = [];
  wearingSizeOfFilter = [];
  sizeEnum: any = {};
  allMediaOfInfluencer: any = [];
  selectedProfile: any = {};
  influencerVideos = [];
  isHeightInFeet = false;
  bodyTypes = [];
  statusList = [];
  isLoader = false;

  constructor(
    private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService,
    private dataService: DataService,
    private router: Router) {
    this.mediaActionEnum = new mediaAction();
    this.mediaTypeEnum = new MediaType();
  }

  ngOnInit() {
    this.productDetails.measurement_detail = [];
    this.productDetails.measurement_detail.push({});
    this.productDetails.measurement_detail[0].reflektmeOnTips = '';
    this.getAllCategory();
    this.getAllMeasurments();
    this.getAllSizes();
    this.getAllProducts();
    this.dropdownSettings = {
      selectAllText: 'Select All',
      unSelectAllText: 'De Select All',
      singleSelection: false,
      idField: 'category_id',
      textField: 'category_name',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.sizeEnum = {
      '2XL': 'TWOXL',
      '3XL': 'THREEXL',
      '4XL': 'FOURXL'
    };
    this.getAllMediaOfInfluencer();
    this.getBodyTypes();
    this.getAllMediaStatus();
    this.dataService.searchBarFlag.subscribe(res => {
      if (res === true && this.router.url == '/admin-dashboard/influencer-videos') {
        this.getAllProducts();
        this.getAllMediaOfInfluencer();
      }
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
  getAllMediaStatus() {
    this.adminDashboardService.getAllMediaStatus().subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          this.statusList = result.data;
        } else {
          this.statusList = [];
        }
      } else {
        // this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  getAllMediaOfInfluencer() {
    this.isLoader = false;
    this.adminDashboardService.getAllMediaByInfluencerAndMediaType(this.mediaTypeEnum.Video).subscribe((result: any) => {
      if (result.status === 200) {
        let isFound = false;
        let allVideoCount = 0;
        this.allMediaOfInfluencer = result.data.filter((e, index) => {
          if (e.influencerMedia.length !== 0) {
            allVideoCount = allVideoCount + e.influencerMedia.length;
            if (this.selectedProfile && this.selectedProfile.userId === e.userId) {
              isFound = true;
              this.selectedProfile = JSON.parse(JSON.stringify(e));
            }
            e.isSelected = false;
            return e;
          }
        });
        if (this.allMediaOfInfluencer && !this.allMediaOfInfluencer.length) {
          this.influencerVideos = [];
          this.dataService.setVideoCount(0);
        } else {
          this.dataService.setVideoCount(allVideoCount);
          if (this.selectedProfile && this.selectedProfile.userId && isFound) {
            this.selectProfile(this.selectedProfile);
          } else {
            this.selectedProfile = this.allMediaOfInfluencer[0];
            this.selectProfile(this.allMediaOfInfluencer[0]);
          }
        }

      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  changeMediaStatus(mediaid, mediaStatus) {
    this.isLoader = true;
    this.adminDashboardService.changeMediaStatus(mediaid, mediaStatus).subscribe((result: any) => {
      if (result.status === 200) {
        this.toastrService.info('Status is updated');
        this.getAllMediaOfInfluencer();
        this.resetFilter();
        this.productDetails = {};
        this.measurementDetailObj = {};
        this.isMediaSelect =false;
      } else {
        this.isLoader = false;
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  selectProfile(obj) {
    this.influencerVideos = [];
    this.selectedProfile = JSON.parse(JSON.stringify(obj));
    // this.influencerId = this.selectedProfile.userId;
    this.allMediaOfInfluencer.forEach((e) => {
      if (e.userId === obj.userId) {
        e.isSelected = true;
        this.influencerVideos = obj.influencerMedia.map((e) => {
          e.isPhotoSelected = false;
          return e;
        });
        // this.dataService.setVideoCount(this.influencerVideos.length);
        this.findProductByMedia(this.influencerVideos[0].media_id);
      } else {
        e.isSelected = false;
      }
    });
    // this.getAllProducts();
  }

  filesDropped(files: FileHandle[]): void {
    if (files.length) {
      let event: any = {};
      event.target = { files: [] }
      event.target.files = files.map((el) => {
        return el.file;
      });
      this.getFilesAfterUpload(event);
    }
  }
  getAlldata(search) {
    if (search == '') {
      this.getAllProducts();
    }
  }
  toggleSearch() {
    this.isSearch = !this.isSearch;
    if (!this.isSearch) {
      this.search = '';
    }
  }

  getNextProducts(type) {
    this.selectedPageNumber = type === 'prev' ? Number(this.selectedPageNumber) - 1 :
      Number(this.selectedPageNumber) + 1;
    this.getAllProducts();
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

  resetFilter() {
    this.filtercategory = {};
    this.selectedPageNumber = 0;
    this.selectedProducts = [];
    this.getAllProducts();
  }
  c: number = 0;
  onKeydownMain(e) {
    e.value = "$";
    if (this.c == 0 || this.productDetails.product_price == '') {
      this.productDetails.product_price = e.value + this.productDetails.product_price;
      this.c++
    }
  }
  getAllProducts() {
    let reqObj: any = {};
    reqObj.size = 6;
    reqObj.page = this.selectedPageNumber;
    reqObj.categories = [];
    if (this.search) {
      reqObj.searchKeyword = this.search;
    }
    if (this.search) {
      reqObj.searchKeyword = this.search;
    }
    if (this.filtercategory.size) {
      reqObj.sizeTagOfProduct = this.filtercategory.size;
    }
    if (this.filtercategory.mediaStatus) {
      reqObj.mediaStatus = this.filtercategory.mediaStatus;
    }
    if (this.selectedProducts.length) {
      reqObj.categories = this.selectedProducts.map((el) => {
        return el.category_id;
      })
    }
    if (reqObj.sizeTagOfProduct === '2XL' || reqObj.sizeTagOfProduct === '3XL' || reqObj.sizeTagOfProduct === '4XL') {
      reqObj.sizeTagOfProduct = this.sizeEnum[reqObj.sizeTagOfProduct];
    }
    // reqObj.influencerId = this.influencerId;
    reqObj.type = 'VIDEO';
    this.adminDashboardService.getAllProductofInfluencers(reqObj).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          this.influencerMedia = result.data.map((element) => {
            const date = element.modified_date;
            element.uploadeDays = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
            element.isViewimage = false;
            element.action = '';
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
        this.influencerMedia = [];
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  changeProfileImage(event) {
    this.profileImage = event;
  }

  viewImage(index) {
    this.influencerMedia[index].isViewimage = true;
    this.influencerMedia[index].action = this.mediaActionEnum.View;
  }
  editImage(index) {
    this.influencerMedia[index].isViewimage = true;
    this.influencerMedia[index].action = this.mediaActionEnum.Edit;
  }

  deleteMedia() {
    this.adminDashboardService.deleteMedia(this.currentMedia.media_id).subscribe(res => {
      if (res.status === 200) {
        this.currentMedia = {};
        this.toastrService.success('Deleted Successfully');
        this.resetFilter();
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  closePopup(event) {
    this.influencerMedia = this.influencerMedia.map(element => {
      element.isViewimage = false;
      return element;
    });
    // this.resetFilter();
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
  getFilesAfterUpload(event) {
    let mediaType;
    var c = 0;
    let files: any = [];
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
                  let cnt = result.data.length;
                  result.data.map((ele) => {
                    cnt--;
                    ele.isSelected = false;
                    this.fileList.push(ele);
                    if (cnt === 0) {
                      this.selectImage('SelectAll');
                    }
                  });

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
  }

  selectImage(type, image?) {
    if (type === 'Single') {
      this.fileList = this.fileList.map((elem) => {
        if (elem.media_id === image.media_id) {
          elem.isSelected = !elem.isSelected;
        }
        return elem;
      });
    } else if (type === 'SelectAll') {
      this.fileList = this.fileList.map((elem) => {
        elem.isSelected = true;
        return elem;
      });
    } else if (type === 'DeselectAll') {
      this.fileList = this.fileList.map((elem) => {
        elem.isSelected = false;
        return elem;
      });
    }
    this.selectedImageAsFile = this.fileList.filter((element, index) => {
      if (element.isSelected) {
        return element;
      }
    });
    if (this.selectedImageAsFile.length > 0) {
      this.isMediaSelect = true;
    } else {
      this.isMediaSelect = false;
    }

  }

  // delete uploaded media
  deleteUploadedImage(type, Id?) {
    this.selectedMediaIds = [];
    if (type === 'Single') {
      this.selectedMediaIds.push(Id);
    } else if (type === 'All') {
      this.selectedMediaIds = this.fileList.map((el) => {
        return el.media_id;
      });
    }
    if (this.selectedMediaIds && this.selectedMediaIds.length) {
      this.adminDashboardService.deleteUploadedImage(this.selectedMediaIds).subscribe(
        (result) => {
          if (result.status === 200) {
            this.toastrService.success('File deleted successfully');
            if (type === 'Single') {
              this.fileList = this.fileList.filter(element => {
                return element.media_id != this.selectedMediaIds[0];
              });
            } else if (type === 'All') {
              this.fileList = [];
              this.isMediaSelect = false;
            }
            if (this.selectedMediaIds.length === 0) {
              this.isMediaSelect = false;
            }
          }
        },
        (error) => {
          this.toastrService.error(JSON.stringify(error));
        }
      );
    }
  }

  createProduct(form: NgForm) {
    this.productDetails.product_id = 0;
    this.productDetails.status = 'ACTIVE';
    this.productDetails.measurement_detail = [];
    this.productDetails.measurement_detail[0] = this.measurementDetailObj;
    // this.productDetails.measurement_detail[0].media = [];
    let mediaImgs: any = {};
    this.selectedImageAsFile.forEach((selectedImg) => {
      mediaImgs.azure_file_Name = selectedImg.azure_file_Name;
      mediaImgs.media_id = selectedImg.media_id;
      mediaImgs.media_name = selectedImg.media_name;
      mediaImgs.media_type = selectedImg.media_type;
      mediaImgs.media_url = selectedImg.media_url;
      mediaImgs.status = selectedImg.status;
      this.productDetails.measurement_detail[0].media.push(mediaImgs);
      mediaImgs = {};
    });
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
    delete this.productDetails.userId;
    this.adminDashboardService.createProduct(this.productDetails).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.toastrService.success('Product Updated Successfully');
          this.fileList = [];
          // this.isMediaSelect = false;
          this.getAllProducts();
          this.getAllMediaOfInfluencer();
          form.resetForm();
          this.isMediaSelect = false;
        }
      },
      (error) => {
        this.toastrService.error(JSON.stringify(error));
      });
  }

  getAllMeasurments() {
    this.adminDashboardService.getMeasurements().subscribe((result: any) => {
      this.measurements = result.data.filter((s => a => !s.has(a.size) && s.add(a.size))(new Set));
      this.dataService.sendMeasurements(this.measurements);
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  getAllSizes() {
    this.adminDashboardService.getSize().subscribe((result: any) => {
      if (result.status === 200) {
        this.wearingSizeOfFilter = result.data;
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  findCategoryId(categoryName) {
    const categoryObj = this.allcategoryArr.filter((e) =>
      categoryName === e.category_name)[0];
    this.productDetails.category_id = categoryObj.category_id;
    this.wearingSize = categoryObj.wearing_sizes;
  }

  findMeasurementId() {
    if (this.measurements) {
      const obj = this.measurements.find((e: any) => e.size === this.productDetails.size_tag);
    }
  }

  onProductSelect(event) {
    // console.log(this.selectedProducts);
  }

  onSelectAll(items) {
    this.selectedProducts = items;
  }

  onUnSelectAll(items) {
    this.selectedProducts = this.selectedProducts.filter((el) => {
      if (el.category_id !== items.category_id) {
        return el;
      }
    });
  }

  findProductByMedia(mediaId, i?) {
    this.isMediaSelect = true;
    this.influencerVideos = this.influencerVideos.map((el) => {
      if (el.media_id == mediaId) {
        el.isPhotoSelected = true;
      } else {
        el.isPhotoSelected = false;
      }
      return el;
    });
    this.adminDashboardService.findProductByMedia(mediaId).subscribe((res: any) => {
      if (res.status === 200) {
        this.productDetails = res.data;
        this.productDetails = res.data;
        if (this.allcategoryArr && this.allcategoryArr.length) {
          this.allcategoryArr.forEach((e) => {
            if (res.data && res.data.category_id) {
              if (res.data.category_id === e.category_id) {
                this.productDetails.category_name = e.category_name;
                this.wearingSize = e.wearing_sizes;
              }
            }
          });
          if (res.data && res.data.assign_tag && res.data.assign_tag.length) {
            this.productDetails.assign_tag = res.data.assign_tag;
          }
          if (res.data && res.data.product_url) {
            this.productDetails.product_url = res.data.product_url;
          }
        }
        if (res.data && res.data.measurement_detail && res.data.measurement_detail.length) {
          if (/Edge/.test(navigator.userAgent)) {
            document.getElementById("weight_disable").removeAttribute("disabled");
          }
          if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
            alert("IE");
            document.getElementById("weight_disable").removeAttribute("disabled");
          }
          this.measurementDetailObj.size = res.data.measurement_detail[0].size;
          this.measurementDetailObj.height = res.data.measurement_detail[0].height;
          this.measurementDetailObj.bodyType = res.data.measurement_detail[0].bodyType;
          this.measurementDetailObj.weight = res.data.measurement_detail[0].weight;
          this.measurementDetailObj.hips = res.data.measurement_detail[0].hips;
          this.measurementDetailObj.waist = res.data.measurement_detail[0].waist;
          this.measurementDetailObj.category_id = res.data.category_id;
          this.measurementDetailObj.bust = res.data.measurement_detail[0].bust;
          this.measurementDetailObj.heightFeet = res.data.measurement_detail[0].heightFeet;
          this.measurementDetailObj.heightInch = res.data.measurement_detail[0].heightInch;
          this.measurementDetailObj.heightCentemeter = res.data.measurement_detail[0].heightCentemeter;
          this.measurementDetailObj.weightKiloGram = res.data.measurement_detail[0].weightKiloGram;
          this.measurementDetailObj.weightLbs = res.data.measurement_detail[0].weightLbs;
          this.measurementDetailObj.heightMeasurement = res.data.measurement_detail[0].heightMeasurement;
          this.measurementDetailObj.weightMeasurement = res.data.measurement_detail[0].weightMeasurement;
          this.measurementDetailObj.hipsBustWaistMeasurement = res.data.measurement_detail[0].hipsBustWaistMeasurement;
          this.measurementDetailObj.reflektmeOnTips = res.data.measurement_detail[0].reflektmeOnTips;
          this.measurementDetailObj.media = res.data.measurement_detail[0].media;
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
        }
      } else {
        this.toastrService.error(res.message);
      }
    }, (error) => {
      this.toastrService.error(JSON.stringify(error.message));
    });
  }

}

