import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminDashboardService } from '../admin-dashboard/service/admin-dashboard.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { mediaAction, MediaType } from '../constants/enum';
import { FileHandle } from '../../app/services/dragDrop.directive';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var $: any;

@Component({
  selector: 'app-influencer-dashboard',
  templateUrl: './influencer-dashboard.component.html',
  styleUrls: ['./influencer-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InfluencerDashboardComponent implements OnInit {
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
  hipsbustwaist = [];
  wearingSizeOfFilter = [];
  sizeEnum: any = {};
  isHeightInFeet = false;
  bodyTypes = [];
  statusList = [];
  @ViewChild('f', { static: false }) f: NgForm;

  constructor(
    private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService,
    private dataService: DataService,
    private router: Router) {
    this.mediaActionEnum = new mediaAction();
    this.mediaTypeEnum = new MediaType();
  }

  ngOnInit() {
    this.manageProfiles();
    this.getAllCategory();
    this.getAllMeasurments();
    this.getAllSizes();
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
    this.measurementDetailObj.heightMeasurement = 'FEET';
    this.measurementDetailObj.weightMeasurement = 'KG';
    this.measurementDetailObj.hipsBustWaistMeasurement = 'INCH';
    this.getBodyTypes();
    this.getAllMediaStatus();
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

  toggleSearch() {
    this.isSearch = !this.isSearch;
    if (!this.isSearch) {
      this.search = '';
    }
  }
  getAlldata(search) {
    if (search == '') {
      this.getAllProducts();
    }
  }
  getNextProducts(type) {
    this.selectedPageNumber = type === 'prev' ? Number(this.selectedPageNumber) - 1 :
      Number(this.selectedPageNumber) + 1;
    this.getAllProducts()
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
    reqObj.influencerId = this.influencerId;
    this.adminDashboardService.getAllProductofInfluencers(reqObj).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          const tempSorted = result.data;
          this.influencerMedia = tempSorted.map((element) => {
            const date = element.modified_date;// this.ISODateString(new Date(element.modified_date));
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
  ISODateString(d) {
    function pad(n) { return n < 10 ? '0' + n : n }
    return d.getUTCFullYear() + '-'
      + pad(d.getUTCMonth() + 1) + '-'
      + pad(d.getUTCDate()) + 'T'
      + pad(d.getUTCHours()) + ':'
      + pad(d.getUTCMinutes()) + ':'
      + pad(d.getUTCSeconds()) + 'Z'
  }
  sortByDate(arr) {
    arr.sort((a, b) => {
      return Number(new Date(a.created_date).getMilliseconds()) > Number(new Date(b.created_date).getMilliseconds()) ? 1 : -1;
    });
    return arr;
  }
  manageProfiles() {
    const InfluencerEmail = localStorage.getItem('Influencer_email');
    this.adminDashboardService.getManageProfiles().subscribe((result: any) => {
      if (result.status === 200) {
        result.data.data.forEach(element => {
          if (element.email === InfluencerEmail) {
            this.influencerId = element.userId;
            localStorage.setItem('InfluencerData', (JSON.stringify(element)));
            this.dataService.logoutUser(true);
            if (element.media && element.media.media_url) {
              this.profileImage = element.media.media_url;
            }
            this.dataService.sendInfluencerData(element);
          }
        });
        this.getAllProducts();
      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error));
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
    // this.getAllProducts();
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
                  document.getElementById("priceFiled").setAttribute('placeholder' ,"$");
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
      if (/Edge/.test(navigator.userAgent)) {
        document.getElementById("weight_disable").removeAttribute("disabled");
      }
      if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
        document.getElementById("weight_disable").removeAttribute("disabled");
      }
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
            this.f.reset();
          }
        },
        (error) => {
          this.toastrService.error(JSON.stringify(error));
        }
      );
    }
  }

  createProduct(form: NgForm) {
    if (this.productDetails.product_price < 1 || !this.productDetails.assign_tag) {
      return;
    }
    this.productDetails.product_id = 0;
    this.productDetails.status = 'ACTIVE';
    this.productDetails.measurement_detail = [];
    if (this.isweightInLbs == true) {
      this.measurementDetailObj.weightKiloGram = '';
      this.measurementDetailObj.weightMeasurement = 'LBS';
    }
    if (this.isweightInLbs == false) {
      this.measurementDetailObj.weightLbs = '';
      this.measurementDetailObj.weightMeasurement = 'KG';
    }
    if (this.isHeightInCm == false) {
      this.measurementDetailObj.heightCentemeter = '';
      this.measurementDetailObj.heightMeasurement = 'FEET';
    }
    if (this.isHeightInCm == true) {
      this.measurementDetailObj.heightFeet = '';
      this.measurementDetailObj.heightInch = '';
      this.measurementDetailObj.heightMeasurement = 'CM';
    }
    if (this.ismeasurementInCm == true) {
      this.measurementDetailObj.hipsBustWaistMeasurement = 'CM';
    }
    if (this.ismeasurementInCm == false) {
      this.measurementDetailObj.hipsBustWaistMeasurement = 'INCH';
    }
    this.productDetails.measurement_detail[0] = this.measurementDetailObj;
    this.productDetails.measurement_detail[0].media = [];
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
    if (this.selectedImageAsFile.length > 0) {
      this.adminDashboardService.createProduct(this.productDetails).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.toastrService.success('Product Created Successfully');
            this.measurementDetailObj = {};
            form.resetForm();
            this.fileList = [];
            this.isMediaSelect = false;
            this.getAllProducts();
          }
        },
        (error) => {
          this.toastrService.error(JSON.stringify(error));
        });
    } else {
      this.toastrService.warning('Please uploade media');
    }

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
}
