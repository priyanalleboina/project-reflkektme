import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ReflektmeService } from '../service/reflektme.service';
import { MediaType } from 'src/app/constants/enum';
import { isEmpty } from 'lodash'
declare var $: any;
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  items: MenuItem[];
  createAccountData: any;
  customerData: any;
  measurements: any[];
  isHeightInFeet: boolean;
  isWeightInKG: boolean;
  activeIndex: number;
  brandsArr: any[];
  mediaTypeEnum: any;
  customerDataCopy: any;
  reviewData: any;
  reviewImage: any;
  reviewVideo: any;
  filesToUpload: any;
  customerCreated: boolean;
  customerMeasurements: any;
  brandName: string;
  _setIndex: number;
  step1tab: boolean = false;
  step2tab: boolean = false;
  isSuccesTab0: boolean = false;
  isSuccesTab1: boolean = false;
  isSuccesTab2: boolean = false;
  step1tabactive: boolean = false;
  step2tabactive: boolean = false;
  ageInfo: boolean = true;
  prefernces: boolean = true;
  @Output() activeInd = new EventEmitter<any>();
  @Input()
  get setIndex(): number {
    return this._setIndex;
  }
  set setIndex(index: number) {
    this._setIndex = index;
    if (index === 2) {
      this.gotoNext(this.PreferencesForm, index);
    } else if (index === 3) {
      this.gotoNext(this.PreferencesForm, index);
    }
  }
  @Input() prodcutId: any;
  @ViewChild('basicInfoForm', { static: false }) basicInfoForm: NgForm;
  @ViewChild('ageBMIForm', { static: false }) ageBMIForm: NgForm;
  @ViewChild('PreferencesForm', { static: false }) PreferencesForm: NgForm;
  @ViewChild('closebutton', { static: false }) closebutton: ElementRef;

  constructor(
    private reflektmeService: ReflektmeService,
    private toastrService: ToastrService,
    private dataService: DataService) {
    this.isHeightInFeet = false;
    this.isWeightInKG = false;
    this.reviewData = {};
    this.customerMeasurements = {};
    this.customerCreated = false;
    this.mediaTypeEnum = new MediaType();
    this.activeIndex = 0;
  }

  ngOnInit() {
    this.customerData = {};
    this.reviewImage = [];
    this.reviewVideo = [];
    this.customerMeasurements.weightMeasurement = 'KG';
    this.customerMeasurements.heightMeasurement = 'FEET';
    this.dataService.allBrandData.subscribe((res: any) => {
      this.brandsArr = res;
    });
    this.dataService.measurements.subscribe((res: any) => {
      this.measurements = res;
    });
    this.validateStepper();
    this.reviewData.reviewStar = 5;
    this.reviewData.media = [];
  }

  validateStepper() {
    this.items = [
      {
        id: 'basicInfoItem',
        label: 'Basic Info',
        target: 'disp',
        command: (event: any) => {
          const lastIndex = Number(this.activeIndex);
          this.setActiveIndex('0');
          if (this.activeIndex == 0) {
            event.item.label = 'Basic Info';
            event.item.target = 'disp';
            delete this.items[lastIndex].label;
            if (lastIndex > this.activeIndex) {
              // this.items[lastIndex].target = '';
            } else if (lastIndex === this.activeIndex) {
              event.item.label = 'Basic Info';
              event.item.target = 'disp';
            } else {
              this.items[lastIndex].target = 'complete';
            }
          } else {
            delete event.item.label;
          }
        }
      },
      {
        id: 'ageAndBmiItem',
        command: (event: any) => {
          const lastIndex = Number(this.activeIndex);
          if (1 < lastIndex) {
            this.setActiveIndex('1');
            if (this.activeIndex == 1) {
              event.item.label = 'Age & BMI';
              event.item.target = 'disp';
              delete this.items[lastIndex].label;
              if (lastIndex > this.activeIndex) {
                this.items[lastIndex].target = '';
                // if(lastIndex-1 > this.activeIndex){
                //   this.items[lastIndex-1].target = '';
                // }
              } else if (lastIndex === this.activeIndex) {
                event.item.label = 'Age & BMI';
                event.item.target = 'disp';
              } else {
                this.items[lastIndex].target = 'complete';
              }
            } else {
              delete event.item.label;
            }
          }

        }
      },
      {
        id: 'preferencesItem',
        command: (event: any) => {
          const lastIndex = Number(this.activeIndex);
          if (2 < lastIndex) {
            this.setActiveIndex('2');
            if (this.activeIndex === 2) {
              event.item.label = 'Preferences';
              event.item.target = 'disp';
              delete this.items[lastIndex].label;
              if (lastIndex > this.activeIndex) {
                this.items[lastIndex].target = '';
                // if(lastIndex-1 >  this.activeIndex){
                //   this.items[lastIndex-1].target = '';
                // }
              } else if (lastIndex === this.activeIndex) {
                event.item.label = 'Preferences';
                event.item.target = 'disp';
              } else {
                this.items[lastIndex].target = 'complete';
              }
            } else {
              delete event.item.label;
            }
          }
        }
      },
      {
        id: 'reviewItem',
        command: (event: any) => {
          const lastIndex = Number(this.activeIndex);
          this.setActiveIndex('3');
          if (this.activeIndex === 3) {
            event.item.label = 'Review';
            event.item.target = 'disp';
            delete this.items[lastIndex].label;
            if (lastIndex > this.activeIndex) {
              this.items[lastIndex].target = '';
            } else if (lastIndex === this.activeIndex) {
              event.item.label = 'Review';
              event.item.target = 'disp';
            }
            // else {
            //   this.items[lastIndex].target = 'complete';
            // }
          } else {
            delete event.item.label;
          }
        }
      }
    ];
  }
  setActiveIndex(index) {
    switch (this.activeIndex) {
      case 0: {
        if (this.basicInfoForm.valid) {
          this.activeIndex = Number(index);
        }
        break;
      };
      case 1: {
        if (this.activeIndex < index) {
          if (this.ageBMIForm.valid) {
            this.activeIndex = Number(index);
          }
        } else {
          this.activeIndex = Number(index);
        }
        break;
      };
      case 2: {
        if (this.activeIndex < index) {
          if (this.PreferencesForm.valid && this.customerMeasurements.selectSizeInfo) {
            this.activeIndex = Number(index);
          }
        } else {
          this.activeIndex = Number(index);
        }

        break;
      };
      case 3: {
        this.activeIndex = Number(index);
        break;
      }
    }
  }
  switchTabs(event) {
    if (event == '0') {
      this.activeIndex = 0;
      this.isSuccesTab1 = false;
      this.isSuccesTab0 = false;
      this.ageInfo = true;
      this.step1tabactive = false;
      this.prefernces = true;
      this.step2tabactive = false;
    } else if (event == '1') {
      this.activeIndex = 1;
      this.isSuccesTab0 = true;
      this.isSuccesTab1 = false;
      this.step1tabactive = true;
      this.prefernces = true;
      this.step2tabactive = false;
    } else if (event == '2') {
      this.activeIndex = 2;
      this.isSuccesTab1 = true;
      this.isSuccesTab0 = true;
      this.step2tabactive = true;
      this.step1tabactive = false;
      this.ageInfo = false;
      this.prefernces = false;
    }
  }
  public gotoNext(form: NgForm, nextIndex: number): void {
    const lastIndex = Number(this.activeIndex);
    if (form.valid) {
      this.activeIndex = nextIndex;
      if (this.activeIndex == 1) {
        this.items[this.activeIndex].label = 'Age & BMI';
        // this.createCustomer();
        this.step1tab = true;
        this.isSuccesTab0 = true;
        this.step1tabactive = true;
      } else if (this.activeIndex == 2) {
        this.items[this.activeIndex].label = 'Preferences';
        this.step2tab = true;
        this.isSuccesTab1 = true;
        this.step2tabactive = true;
        this.ageInfo = false;
        this.step1tabactive = false;
        this.isSuccesTab2 = false;
      } else if (this.activeIndex == 3) {
        this.items[this.activeIndex].label = 'Review';
        this.isSuccesTab2 = true;
        this.step2tabactive = false;
        this.prefernces = false;
      }
      delete this.items[lastIndex].label;
      this.items[this.activeIndex].target = 'disp';
      this.items[this.activeIndex - 1].target = 'complete';
    }
  }

  // saveCustomerMeasurements
  public goToFourthStepOfstepper() {
    if (JSON.stringify(this.customerData) !== JSON.stringify(this.customerDataCopy)) {
      if (isEmpty(this.customerDataCopy)) {
        this.reflektmeService.createCustomer(this.customerData).subscribe((res: any) => {
          if (res.status === 200) {
            this.customerMeasurements.userId = res.data;
            if (this.customerMeasurements.weightMeasurement === 'KG') {
              this.customerMeasurements.lbs = '';
            } else {
              this.customerMeasurements.kiloGram = '';
            }
            if (this.customerMeasurements.heightMeasurement === 'FEET') {
              this.customerMeasurements.centemeter = '';
            } else {
              this.customerMeasurements.feet = '';
              this.customerMeasurements.inch = '';
            }
            this.brandsArr.forEach((ele) => {
              if (ele.brandName === this.brandName) {
                this.customerMeasurements.brandId === ele.brand_id;
              }
            });
            this.reflektmeService.saveCustomerMeasurements(this.customerMeasurements).subscribe((res: any) => {
              if (res.status === 200) {
                this.toastrService.info('Account created successfully and Please check your mail for verification');
                this.closebutton.nativeElement.click();
                this.activeInd.emit('landing');
                this.resetCustomerForm();
              } else {
                this.activeInd.emit('landing');
                this.toastrService.error(res.message);
                this.resetCustomerForm();
              }
            },
              (error) => {
                this.toastrService.error(JSON.stringify(error.message));
              });

          } else {
            this.activeInd.emit('landing');
            this.toastrService.error(res.message);
            this.resetCustomerForm(true);
          }
        },
          (error) => {
            this.toastrService.error(JSON.stringify(error.message));
          });
      } else {
        this.updateCustomer();
      }
    }
    this.customerDataCopy = JSON.parse(JSON.stringify(this.customerData));
  }

  // onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
  //   this.reviewData.reviewStar = $event.newValue;
  // }

  createCustomer() {
    if (JSON.stringify(this.customerData) !== JSON.stringify(this.customerDataCopy)) {
      if (isEmpty(this.customerDataCopy)) {
        this.reflektmeService.createCustomer(this.customerData).subscribe((res: any) => {
          if (res.status === 200) {
            this.customerMeasurements.userId = res.data;
          } else {
            this.activeInd.emit('landing');
            this.toastrService.error(res.message);
            this.resetCustomerForm(true);
          }
        },
          (error) => {
            this.toastrService.error(JSON.stringify(error.message));
          });
      } else {
        this.updateCustomer();
      }
    }
    this.customerDataCopy = JSON.parse(JSON.stringify(this.customerData));
  }

  updateCustomer() {
    this.reflektmeService.updateCustomer(this.customerData).subscribe((res: any) => {
      if (res.status === 200) {
        // this.activeInd.emit('landing');
        // this.resetCustomerForm();
      } else {
        // this.activeInd.emit('landing');
        this.toastrService.error(res.message);
        // this.resetCustomerForm();
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  openFile() {
    document.getElementById('fileSelecter').click();
  }
  resetCustomerForm(isFromParent?) {
    setTimeout(() => {
      this.activeIndex = 0;
    }, 1000);
    this.customerData = {};
    this.customerDataCopy = {};
    this.switchTabs('0');
    this.step1tab = false;
    this.isSuccesTab0 = false;
    this.step1tabactive = false;
    this.customerCreated = false;
    this.step2tab = false;
    this.isSuccesTab1 = false;
    this.step2tabactive = false;
    this.validateStepper();
    if (!isFromParent) {
      setTimeout(() => {
        $('#createAccStepper').modal('hide');
      }, 100);
    }
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-backdrop');
  }
}
