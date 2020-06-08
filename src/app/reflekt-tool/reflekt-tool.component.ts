import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ReflektmeService } from './service/reflektme.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { AdminLoginService } from '../admin-login/admin-login.service';
import { UserRole, MediaType } from '../constants/enum';
import { FileHandle } from '../services/dragDrop.directive';
import { GuestModelComponent } from './guest-model/guest-model.component';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConstantPool } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-reflekt-tool',
  templateUrl: './reflekt-tool.component.html',
  styleUrls: ['./reflekt-tool.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReflektToolComponent implements OnInit {
  activeIndex: number;
  imagesUrl: string;
  isGuest = false;
  isSignIn = false;
  isRatingClicked = false;
  createAccountData: any;
  measurements: any[];
  selectedsize: any;
  isGuestCame: boolean;
  isCreateAccountCame: boolean;
  iseditRefleKtSize: boolean;
  editRefleKtSize: string;
  mediaProductData: any;
  modelsMeasurement: any = {};
  prodcutId: number;
  loginData: any;
  forgot: any;
  email: any;
  rememberMeCred;
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  mediaTypeEnum: any;
  isUserLoggedIn = false;

  // New From Swati
  wearingSize: any = [];
  size: any;
  product: any = {};
  reviews: any = [];
  totalReviewCount = 0;
  userRoleEnum: any;
  reviewData: any = {};
  fileList: any = [];
  public filesToUpload: any = [];
  uploadedFiles = [];
  medias = [];
  slideNumber = 0;
  currentMediaId: any;
  rating = 5;
  isShowAll = false;
  reviewsOne = [];
  isCustomer = false;
  sizeEnum: any = {};
  influencerList = [];
  productRatingStar = 0;
  productRecmmendations = [];
  totalPages = 1;
  totalElement = 0;
  selectedPageNumber = 0;
  isViewAll = false;
  viewAll = false;
  latestSize: any;
  constructor(
    private reflektmeService: ReflektmeService,
    private toastrService: ToastrService,
    private dataService: DataService,
    private adminLoginService: AdminLoginService,
    private cookieServiceTool: CookieService,
    private cd: ChangeDetectorRef,
    private router: Router) {
    this.isGuestCame = false;
    this.isCreateAccountCame = false;
    this.iseditRefleKtSize = false;
    this.loginData = { email: '', password: '' };
    this.forgot = { fEmail: '' }
    this.userRoleEnum = new UserRole();
    this.mediaTypeEnum = new MediaType();
  }

  ngOnInit() {
    this.activeIndex = 0;
    this.createAccountData = {};
    $('.myCarousel').carousel('pause');
    this.sizeEnum = {
      '2XL': 'TWOXL',
      '3XL': 'THREEXL',
      '4XL': 'FOURXL'
    };
    this.rememberData();
    const jwt = localStorage.getItem('loginToken');
    const role = localStorage.getItem('userRole');
    if (jwt) {
      if ((this.userRoleEnum.roleAdmin === role || this.userRoleEnum.roleSuperAdmin === role)) {
        this.router.navigate(['/admin-dashboard']);
      } else if (this.userRoleEnum.roleInfluencer === role) {
        this.router.navigate(['/influencer-dashboard']);
        this.dataService.logoutUser(false);
      }
    }
  }
  rememberData() {
    const remembervalue = this.cookieServiceTool.get('rememberMeTool');
    if (this.cookieServiceTool.get('rememberMeTool') === remembervalue) {
      this.loginData.email = this.cookieServiceTool.get('emailTool');
      this.loginData.password = this.cookieServiceTool.get('passwordTool');
      this.rememberMeCred = remembervalue;
    }
  }
  initData() {
    const jwt = localStorage.getItem('loginToken');
    const role = localStorage.getItem('userRole');
    if (jwt && role === this.userRoleEnum.roleCustomer) {
      this.getAllSizes();
      // this.getProductByProductURL();
      this.getProductDetails();
      // this.getProductRecommendations();
      this.getProductReview();
    }
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.rating = $event.newValue;
  }

  public changeIndex(event) {
    this.isGuest = false;
    if (event === 'landing') {
      this.isGuestCame = false;
      this.isGuest = false;
      this.isCreateAccountCame = true;
      setTimeout(() => {
        $('#landingModal').modal('show');
      }, 100);
    } else {
      this.isGuestCame = true;
      this.isCreateAccountCame = false;
      setTimeout(() => {
        $('#reflektSize').modal('show');
      }, 100);
      const data = JSON.parse(localStorage.getItem('custermInfo'));
      const latest = localStorage.getItem('latestSize');
      if (latest != null) {
        data.size = latest;
      }
      if (data && data.size) {
        this.size = data.size;
      } else {
        this.size = 'XS';
      }
      this.getAllSizes();
      // this.findProductByMediaId();
      this.getProductDetails();
      // this.getProductRecommendations();
      this.getProductReview();
      this.getReviews();
    }
  }
  findProductByMediaId(id) {
    this.reflektmeService.findProductByMediaID(id).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data) {
          this.product = result.data;
          const isProduct = JSON.parse(localStorage.getItem('isViewAllProductRecommendation'));
          console.log('isProduct', isProduct);
          console.log('isProduct', typeof isProduct);
          // if (this.isViewAll || isProduct) {
          //   this.getViewAllProducts();
          // } else {
          //   this.getProductRecommendations();
          // }
          this.getProductRecommendations();
          this.modelsMeasurement = this.product.measurement_detail[0];
          $('video').each(function (index) {
            $(this).attr("disablepictureinpicture", true);
          });
        }
      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  removeBackDrop() {
    $('body').removeClass('modal-backdrop');
  }

  public changeIndOfCreateAccStepper(event) {
    if (event === 'landing') {
      this.isGuestCame = false;
      this.activeIndex = 0;
      this.isSignIn = false;
      this.isCreateAccountCame = true;
      setTimeout(() => {
        $('#landingModal').modal('show');
      }, 100);
    } else {
      this.isGuestCame = false;
      this.activeIndex = 0;
      this.isSignIn = false;
      this.isCreateAccountCame = true;
      setTimeout((e) => {
        document.getElementById('openModalStepper2').click();
      }, 100);
    }
    this.isCustomer = false;
  }

  selectNavMedia(ind) {
    this.influencerList.forEach((ele, index) => {
      if (index === (ind)) {
        ele.isActive = true;
        this.medias = JSON.parse(JSON.stringify(ele.medias));
      } else {
        ele.isActive = false;
      }
    });
  }

  setIndex(index) {
    this.activeIndex = index;
  }

  login() {
    localStorage.clear();
    this.adminLoginService.login(this.loginData).subscribe((res: any) => {
      if (res.status === 200 && res.token) {
        this.isUserLoggedIn = true;
        if (this.rememberMeCred) {
          this.cookieServiceTool.set('emailTool', this.loginData.email);
          this.cookieServiceTool.set('passwordTool', this.loginData.password);
          this.cookieServiceTool.set('rememberMeTool', this.rememberMeCred.checked);
        }
        else {
          this.cookieServiceTool.delete('emailTool');
          this.cookieServiceTool.delete('passwordTool');
          this.cookieServiceTool.delete('rememberMeTool');
        }
        localStorage.setItem('loginToken', res.token);
        const jwt = localStorage.getItem('loginToken');
        const jwtToken = jwt.split('.')[1]
        const decodedJwtJsonData = window.atob(jwtToken)
        const decodedJwtToken = JSON.parse(decodedJwtJsonData)
        if (decodedJwtToken.scopes === this.userRoleEnum.roleCustomer) {
          localStorage.setItem('custermInfo', JSON.stringify(res.data));
          if (res.data.size) {
            this.size = res.data.size;
          }
          this.loginData = {};
          this.toastrService.success('Login Successfull');
          localStorage.setItem('userRole', this.userRoleEnum.roleCustomer);
          setTimeout(() => {
            $('#reflektSize').modal('show');
          }, 100);
          setTimeout(() => {
            $('#signInModal').modal('hide');
          }, 100);
          this.getAllSizes();
          // this.getProductByProductURL();
          this.getProductDetails();
          // this.getProductRecommendations();
          this.getProductReview();
          this.getReviews();
        } else {
          this.toastrService.error('You are not registered as customer portal.');
        }
      } else if (res.status === 4002) {
        this.toastrService.error('Email or Password is Incorrect');
      } else {
        this.toastrService.error('The email Id is not associated with Reflektme tool or there is an Error.');
      }
      this.loginData = {};
      this.rememberMeCred = '';
    }, (error) => {
      this.loginData = {};
      this.toastrService.error(JSON.stringify(error.message));
    });
  }

  removeData() {
    if (localStorage.length !== 0) {
      this.toastrService.success('Logout Successfull');
    }
    setTimeout(() => {
      $('#reflektSize').modal('hide');
    }, 100);
    localStorage.clear();
  }

  forgotPassword() {
    this.adminLoginService.forgotPassword(this.forgot.fEmail).subscribe((result: any) => {
      if (result.status === 200) {
        this.closeModal();
        this.toastrService.success('Reset password link is sent on email');
      } else {
        this.toastrService.error(JSON.stringify(result.message));
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  closeModal(): void {
    this.closeBtn.nativeElement.click();
    this.email = '';
  }

  getNextREcommendedProducts(type) {
    this.selectedPageNumber = type === 'prev' ? Number(this.selectedPageNumber) - 1 :
      Number(this.selectedPageNumber) + 1;
    if (this.viewAll) {
      this.getViewAllProducts();
    } else {
      this.getProductRecommendations();
    }
  }

  getProductRecommendations() {
    let reqObj: any = {};
    // this.productRecmmendations = [];
    // reqObj.size = this.size;
    // if (reqObj.size === '2XL' || reqObj.size === '3XL' || reqObj.size === '4XL') {
    //   reqObj.size = this.sizeEnum[reqObj.size];
    // }
    const role = localStorage.getItem('userRole');
    if (role === this.userRoleEnum.roleGuestCustomer) {
      const userData = JSON.parse(localStorage.getItem('custermInfo'));
      reqObj.guestUserId = userData.id;
    }
    reqObj.productCategoryId = this.product.category_id;
    reqObj.page = this.selectedPageNumber;
    reqObj.size = 3;
    reqObj.productId = this.product.product_id;

    this.reflektmeService.getProductRecommendationData(reqObj).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          this.productRecmmendations = result.data;
          this.isViewAll = false;
          if (result.total_element) {
            this.totalElement = result.total_element;
          }
        } else {
          this.productRecmmendations = [];
        }
      } else {
        this.productRecmmendations = [];
        if (result.status === 9004) {
          this.totalElement = 0;
          this.toastrService.error('No product for recommendation');
          this.selectedPageNumber = 0;
          localStorage.setItem('isViewAllProductRecommendation', JSON.stringify(true));
          this.isViewAll = true;
        }
      }
    }, (error) => {
      this.productRecmmendations = [];
      this.isViewAll = true;
      this.totalElement = 0;
      this.toastrService.error(JSON.stringify(error.message));
    });
  }
  getViewAllProducts() {
    let reqObj: any = {};
    const role = localStorage.getItem('userRole');
    if (role === this.userRoleEnum.roleGuestCustomer) {
      const userData = JSON.parse(localStorage.getItem('custermInfo'));
      reqObj.guestUserId = userData.id;
    }
    reqObj.productCategoryId = this.product.category_id;
    reqObj.page = this.selectedPageNumber;
    reqObj.size = 3;
    reqObj.productId = this.product.product_id;

    this.reflektmeService.getViewAllProductRecommendationData(reqObj).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          this.viewAll = true;
          this.isViewAll = false;
          this.productRecmmendations = result.data;
          if (result.total_element) {
            this.totalElement = result.total_element;
          }
        } else {
          this.isViewAll = false;
          this.productRecmmendations = [];
        }
      } else {
        this.productRecmmendations = [];
        if (result.status === 9004) {
          this.totalElement = 0;
          this.isViewAll = false;
          this.toastrService.error('No more products found');
        }
        // if (result.status === 9004) {
        //   this.toastrService.error('No product for recommendation');
        //   this.selectedPageNumber = 0;
        //   this.getViewAllProducts();
        // }
      }
    }, (error) => {
        this.isViewAll = false;
      this.toastrService.error(JSON.stringify(error.message));
    });
  }
  getProductDetails() {
    let reqObj = {
      productURL: window.location.href,
      size: this.size,
    };

    if (reqObj.size === '2XL' || reqObj.size === '3XL' || reqObj.size === '4XL') {
      reqObj.size = this.sizeEnum[reqObj.size];
    }
    this.reflektmeService.getProductData(reqObj).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          //  this.influencerList = result.data;
          this.influencerList = result.data.map((ele, index) => {
            if (index === 0) {
              ele.isActive = true;
              this.medias = JSON.parse(JSON.stringify(ele.medias));
              this.findProductByMediaId(ele.medias[0].media_id);
            } else {
              ele.isActive = false;
            }
            return ele;
          });
          this.cd.reattach();

        } else {
          this.toastrService.error(result.message);
        }
      } else {
        this.toastrService.error(result.message);
        this.medias = [];
        this.influencerList = [];
      }
    }, (error) => {
      this.toastrService.error(JSON.stringify(error.message));
    });
  }

  getAllSizes() {
    this.reflektmeService.getSize().subscribe((result: any) => {
      if (result.status === 200) {
        this.wearingSize = result.data;
        this.dataService.sendMeasurements(this.wearingSize);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  getMeasurements(id) {
    this.reflektmeService.getMeasurmentDetailByID(id).subscribe((result: any) => {
      if (result.status === 200 && result.data) {
        this.modelsMeasurement = result.data;
      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  getProductReview() {
    this.reflektmeService.getReviewOfProduct(window.location.href).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data) {
          this.productRatingStar = Number(result.data);
        }
      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  inviteFriend(type) {
    const url = 'http://54.69.99.238:4600/reflektme-tool';
    switch (type) {
      case 'Facebook':
        window.open('http://www.facebook.com/sharer.php?u=' + window.location.href, '', 'width=500, height=500, scrollbars=yes, resizable=no');
        break;
      case 'Mail':
        window.open('mailto:?subject=ZodiLuv&body=' + window.location.href);
        break;
      case 'Instagram':
        // code block
        break;
      case 'Twitter':
        window.open("https://twitter.com/share?url=" + encodeURIComponent(window.location.href));
        break;
    }
  }

  addReview(data, f: NgForm) {
    // if (this.uploadedFiles && this.uploadedFiles.length) {
    let cust = JSON.parse(localStorage.getItem('custermInfo'));
    if (this.uploadedFiles && this.uploadedFiles.length) {
      data.media = this.uploadedFiles.map((el) => {
        delete el.media_id;
        return el;
      });
    }
    data.productId = this.product.product_id;
    data.reviewStar = this.rating;
    data.userId = cust.userId;
    this.reflektmeService.createReview(data).subscribe(
      (result) => {
        if (result.status === 200) {
          this.toastrService.info('Thank you for reviewing');
          f.resetForm();
          this.uploadedFiles = [];
          setTimeout(() => {
            $('#reviewBox').modal('hide');
          }, 100);
        } else {
          this.toastrService.error(result.message);
        }
      },
      (error) => {
        this.toastrService.error(JSON.stringify(error));
        setTimeout(() => {
          $('#reviewBox').modal('hide');
        }, 100);
      });
    // } else {
    //   this.toastrService.error('Please add image');
    // }
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
    let c = 0;
    let files: any = [];
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'video/mp4' || event.target.files[i].type === 'image/gif' || event.target.files[i].type === 'image/png') {
        files.push(event.target.files[i]);
        if (event.target.files[i].type === 'video/mp4') {
          mediaType = this.mediaTypeEnum.ReviewVideo;
        } else {
          mediaType = this.mediaTypeEnum.ReviewImage;
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
          this.reflektmeService.uploadMultipleImagesForInfluencer(files, mediaType).subscribe(
            (result) => {
              if (result.status === 200) {
                if (result.data && result.data.length) {
                  result.data.forEach((e) => {
                    this.uploadedFiles.push(e);
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
  selectValue() {
    this.latestSize = this.size;
    localStorage.setItem('latestSize', this.latestSize);
  }

  showModal() {
    const jwt = localStorage.getItem('loginToken');
    const role = localStorage.getItem('userRole');
    const data = JSON.parse(localStorage.getItem('custermInfo'));
    const latest = localStorage.getItem('latestSize');
    if (latest != null) {
      data.size = latest;
    }
    if (data && data.size) {
      this.size = data.size;
    } else {
      this.size = 'XS';
    }
    if (jwt && (role === this.userRoleEnum.roleCustomer ||
      role === this.userRoleEnum.roleGuestCustomer)) {
      this.getAllSizes();
      // this.getProductByProductURL();
      //  this.getMeasurements();
      this.getProductDetails();
      // this.getProductRecommendations();
      this.selectedPageNumber = 0;
      this.getProductReview();
      this.getReviews();
      setTimeout(() => {
        $('#reflektSize').modal('show');
      }, 100);
      if (role === this.userRoleEnum.roleGuestCustomer) {
        this.isUserLoggedIn = false;
      } else {
        this.isUserLoggedIn = true;
      }
    } else {
      this.getAllSizes();
      this.activeIndex = 0;
      setTimeout(() => {
        $('#landingModal').modal('show');
      }, 100);
    }
    this.rememberData();
  }

  getReviews() {
    this.reflektmeService.getAllReviews(window.location.href).subscribe((result: any) => {
      if (result.status === 200) {
        if (result.data && result.data.length) {
          this.reviewsOne = [];
          this.reviews = this.sortByDate(result.data);
          this.reviewsOne.push(this.reviews[0]);
          this.totalReviewCount = result.data.length;
        }
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  sortByDate(arr) {
    arr.sort((a, b) => {
      return Number(new Date(a.created_date).getMilliseconds()) > Number(new Date(b.created_date).getMilliseconds()) ? 1 : -1;
    });
    return arr;
  }
  clearLocalStorage(type?) {
    localStorage.clear();
    if (type === 'create') {
      setTimeout(() => {
        $('#landingModal').modal('show');
      }, 100);
    }
  }
}
