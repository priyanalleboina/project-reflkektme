import {
  Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, ViewChild,
  ElementRef, OnChanges, AfterContentInit, AfterViewInit, AfterViewChecked
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ReflektmeService } from '../service/reflektme.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { UserRole } from 'src/app/constants/enum';
declare var $: any;

@Component({
  selector: 'app-guest-model',
  templateUrl: './guest-model.component.html',
  styleUrls: ['./guest-model.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GuestModelComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit {
  userRoleEnum;
  guestStepper: MenuItem[];
  activeIndex: number;
  isHeightinFeet: boolean;
  isWeightinKg: boolean;
  measurements: any;
  guestData: any;
  brandsArr: any[];
  _brand: string;
  isSuccesTab0: boolean = false;
  isSuccesTab1: boolean = false;
  isSuccesTab2: boolean = false;
  step1tabactive: boolean = false;
  step2tabactive: boolean = false;
  ageInfo: boolean = true;
  prefernces: boolean = true;
  @Output() activeInd = new EventEmitter<any>();
  @Input() setIndex: any;
  @Input() isGuest: any;
  @ViewChild('selectSizeForm', { static: false }) selectSizeForm: NgForm;
  @ViewChild('preferencesForm', { static: false }) preferencesForm: NgForm;
  @ViewChild('brandForm', { static: false }) brandForm: NgForm;
  @ViewChild('closebutton', { static: false }) public closebtn: ElementRef;

  constructor(
    private reflektmeService: ReflektmeService,
    private toastrService: ToastrService,
    private dataService: DataService) {
    this.isHeightinFeet = false;
    this.isWeightinKg = false;
    this.userRoleEnum = new UserRole();

    // this.templogin();
  }

  ngOnInit() {
    this.activeIndex = 0;
    this.guestData = {};
    this.guestData.weightMeasurement = 'KG';
    this.guestData.heightMeasurement = 'FEET';
    this.initStepper();
    this.dataService.allBrandData.subscribe((res: any) => {
      this.brandsArr = res;
    });
    this.dataService.measurements.subscribe((res: any) => {
      this.measurements = res;
    });
    // this.templogin();
  }
  ngOnChanges() {
    // this.templogin();
  }
  ngAfterContentInit() {
    //  this.templogin();
  }
  ngAfterViewInit() {
    //  this.templogin();
  }
  initStepper() {
    this.guestStepper = [
      {
        label: 'Select Size',
        target: 'disp',
        command: (event: any) => {
          const lastIndex = Number(this.activeIndex);
          this.setActiveIndex('0');
          if (this.activeIndex == 0) {
            event.item.label = 'Select Size';
            event.item.target = 'disp';
            delete this.guestStepper[lastIndex].label;
            if (lastIndex > this.activeIndex) {
              this.guestStepper[lastIndex].target = '';
            } else if (lastIndex === this.activeIndex) {
              event.item.label = 'Select Size';
              event.item.target = 'disp';
            } else {
              this.guestStepper[lastIndex].target = 'complete';
            }
          } else {
            // delete event.item.label;
          }
        }
      },
      {
        command: (event: any) => {
          const lastIndex = Number(this.activeIndex);
          if (1 < lastIndex) {
            this.setActiveIndex('1');
            if (this.activeIndex === 1) {
              event.item.label = 'Preferences';
              event.item.target = 'disp';
              delete this.guestStepper[lastIndex].label;
              if (lastIndex > this.activeIndex) {
                this.guestStepper[lastIndex].target = '';
              } else if (lastIndex === this.activeIndex) {
                event.item.label = 'Preferences';
                event.item.target = 'disp';
              } else {
                this.guestStepper[lastIndex].target = 'complete';
              }
            } else {
              // delete event.item.label;
            }
          }
        }
      },
      {
        command: (event: any) => {
          const lastIndex = Number(this.activeIndex);
          if (2 < lastIndex) {
            this.setActiveIndex('2');
          }
        }
      },
    ];
  }
  templogin() {
    localStorage.clear();
    this.reflektmeService.getTempLogin().subscribe((result: any) => {
      if (result.status === 200 && result.token) {
        localStorage.setItem('loginToken', result.token);
        const jwt = localStorage.getItem('loginToken');
        const jwtToken = jwt.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtToken);
        const decodedJwtToken = JSON.parse(decodedJwtJsonData);
        console.log('decodedJwtToken==', decodedJwtToken);
        if (decodedJwtToken.scopes === this.userRoleEnum.roleGuestCustomer) {
          localStorage.setItem('userRole', this.userRoleEnum.roleGuestCustomer);
          localStorage.setItem('custermInfo', JSON.stringify(result.data));
          this.getAllSizes();
        }
        this.reflektmeService.createGuestUser(this.guestData).subscribe((res: any) => {
          if (res.status === 200) {
            this.closebtn.nativeElement.click();
            localStorage.setItem('custermInfo', JSON.stringify(res.data));
            setTimeout(() => {
              this.activeIndex = 0;
            }, 1000);
            this.guestData = {};
            this.preferencesForm.resetForm();
            this.activeInd.emit({ activeIndex: 1 });
          } else {
            setTimeout(() => {
              $('#guestModal').modal('hide');
            }, 100);
            this.guestData = {};
            this.activeInd.emit('landing');
            localStorage.clear();
          }
        },
          (error) => {
            this.toastrService.error(JSON.stringify(error.message));
          });
      } else {
        this.toastrService.error(result.message);
        localStorage.clear();
        // setTimeout(() => {
        //   $('#guestModal').modal('hide');
        // }, 100);
        this.guestData = {};
        this.activeInd.emit('landing');
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  switchTabs(event) {
    if (event == '0') {
      this.activeIndex = 0;
      this.isSuccesTab1 = false;
      this.isSuccesTab0 = false;
      this.ageInfo = true;
      this.step1tabactive = false;
      this.prefernces = false;
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
  getAllSizes() {
    this.reflektmeService.getSize().subscribe((result: any) => {
      if (result.status === 200) {
        this.measurements = result.data;
        console.log(this.measurements);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  setActiveIndex(index) {
    switch (this.activeIndex) {
      case 0:
        if (this.guestData.size) {
          this.activeIndex = Number(index);
        }
        break;
      case 1:
        if (this.activeIndex < index) {
          if (this.preferencesForm.valid) {
            this.activeIndex = Number(index);
          }
        } else {
          this.activeIndex = Number(index);
        }
        break;
      case 2:
        this.activeIndex = Number(index);
        break;
    }
  }
  public gotoNext(form: NgForm, nextIndex: number): void {
    const lastIndex = Number(this.activeIndex);
    if (form.valid) {
      this.activeIndex = nextIndex;
      if (this.activeIndex == 1) {
        //  this.step1tab = true;
        this.isSuccesTab0 = true;
        this.step1tabactive = true;
        this.guestStepper[this.activeIndex].label = 'Preferences';
      } else if (this.activeIndex == 2) {
        // this.step2tab = true;
        this.isSuccesTab1 = true;
        this.step2tabactive = true;
        this.ageInfo = false;
        this.step1tabactive = false;
        this.isSuccesTab2 = false;
        this.guestStepper[this.activeIndex].label = 'Brand';
      }
      delete this.guestStepper[lastIndex].label;
      this.guestStepper[this.activeIndex].target = 'disp';
      this.guestStepper[this.activeIndex - 1].target = 'complete';
    }
    this.guestStepper[this.activeIndex - 1].target = 'complete';
  }

  goToFourthStepOfstepper() {
    if (this.guestData.weightMeasurement === 'KG') {
      this.guestData.lbs = '';
    } else {
      this.guestData.kiloGram = '';
    }
    if (this.guestData.heightMeasurement === 'FEET') {
      this.guestData.centemeter = '';
    } else {
      this.guestData.feet = '';
      this.guestData.inch = '';
    }
    this.templogin();
  }
  resetGuestForm(isFromParent?) {
    setTimeout(() => {
      this.activeIndex = 0;
    }, 1000);
    this.guestData = {};
    this.switchTabs('0');
    this.initStepper();
    this.isSuccesTab0 = false;
    this.isSuccesTab0 = false;
    if (!isFromParent) {
      setTimeout(() => {
        $('#guestModal').modal('hide');
      }, 100);
    }
  }
}
