import { Component, OnInit, ViewEncapsulation, Input, ViewChild, DoCheck, OnChanges } from '@angular/core';
import { AdminDashboardService } from '../service/admin-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { UserRole, BodyType } from 'src/app/constants/enum';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit, DoCheck, OnChanges {
  productDetails: any;
  measurements: any;
  userRole: any;
  bodyTypes: any;
  roleEnum: any;
  measurement_detailObj: any;
  isHeightInCm: boolean;
  ismeasurementInCm: boolean;
  isweightInLbs: boolean;
  allcategoryArr = [];
  category_name: string;
  wearingSize: any[];
  isAllDetailsFill: boolean;
  @Input() isSave: boolean;
  @Input() isFormEnable: boolean;
  @Input() reset: boolean;
  @Input() reset_Id: number;
  @ViewChild('f', { static: false }) details_form: NgForm;
  constructor(private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService,
    private dataService: DataService) {
    this.productDetails = {
      'category_name': '',
      'size_tag': ''
    };
    this.productDetails.measurement_detail = [];
    this.measurement_detailObj = {
      'size': '',
      'bodyType': ''
    };
    this.measurements = [];
    this.roleEnum = new UserRole();
    this.bodyTypes = Constants.BODYTYPES;
    this.userRole = localStorage.getItem('userRole');
    this.isHeightInCm = false;
    this.ismeasurementInCm = false;
    this.isweightInLbs = false;
    this.isAllDetailsFill = false;
    // this.productDetails.assign_tag='shdfj';
  }

  ngOnInit() {
    // console.log('this.measurement_detailObj ==== ', this.measurement_detailObj);
    this.productDetails.measurement_detail.push(this.measurement_detailObj);
    // this.getAllMeasurments();
    //  this.getAllCategory();
  }
  ngOnChanges() {
    this.dataService.measurements.subscribe((result: any) => {
      this.measurements = result;
    });
    this.dataService.categoryArr.subscribe((result: any) => {
      this.allcategoryArr = result;
    });

    // alert(JSON.stringify(this.reset)+'===='+JSON.stringify(this.isSave));
    if (this.reset === true) {
      this.productDetails = {};
      this.productDetails.measurement_detail = [];
      this.measurement_detailObj = {
        'size': '',
        'bodyType': ''
      };
      this.productDetails.measurement_detail.push(this.measurement_detailObj);
    }
  }

  ngDoCheck() {
    if (this.isSave) {
      document.getElementById("submitDetails").click();
    }
  }

  // getAllMeasurments() {
  //   if (localStorage.getItem('measurements') === null) {
  //     this.adminDashboardService.getMeasurements().subscribe((result: any) => {
  //       this.measurements = result.data.filter((s => a => !s.has(a.size) && s.add(a.size))(new Set));
  //       localStorage.setItem('measurements', JSON.stringify(this.measurements));
  //     },
  //       (error) => {
  //         this.toastrService.error(JSON.stringify(error));
  //       });
  //   } else {
  //     this.measurements = JSON.parse(localStorage.getItem('measurements'));
  //   }
  // }

  findMeasurementId() {
    if (this.measurements) {
      const obj = this.measurements.find((e: any) => e.size === this.productDetails.size_tag);
      // this.productDetails.measurement_id = obj.measurementId;
    }
  }
  // getAllCategory() {
  //   this.adminDashboardService.getSizeChartDetails().subscribe((result: any) => {
  //     if (result.status === 200) {
  //       this.allcategoryArr = result.data;
  //       this.findCategoryId(this.allcategoryArr[0].category_name);
  //     } else {
  //       this.toastrService.error(result.message);
  //     }
  //   },
  //     (error) => {
  //       this.toastrService.error(JSON.stringify(error.message));
  //     });
  // }

  findCategoryId(categoryName) {
    const categoryObj = this.allcategoryArr.filter((e) => categoryName === e.category_name)[0];
    this.productDetails.category_id = categoryObj.category_id;
    this.wearingSize = categoryObj.wearing_sizes
    // console.log(JSON.stringify(this.productDetails.category_id));
  }
  validateForm() {
    this.isAllDetailsFill = true;
  }


}
