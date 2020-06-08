import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../service/admin-dashboard.service';
import { clothingType } from 'src/app/constants/enum';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-size-chart',
  templateUrl: './size-chart.component.html',
  styleUrls: ['./size-chart.component.css']
})
export class SizeChartComponent implements OnInit {
  activeTab: any;
  allcategoryArr: any = [];
  allcategory: any = [];
  clothingTypeEnum: any;
  newSize: any = {};
  sizeChartData:any=[];
  constructor(private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService) {
    this.clothingTypeEnum = new clothingType();
  }

  ngOnInit() {
  //  this.getSizeChartDetails();
  this.getSizeChart();
  }
  getSizeChart() {
    this.adminDashboardService.getSizeChart().subscribe((result: any) => {
      if (result.status === 200) {
        this.sizeChartData = result.data;
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  // getSizeChartDetails() {
  //   this.adminDashboardService.getSizeChartDetails().subscribe((result: any) => {
  //     if (result.status === 200) {
  //       this.allcategoryArr = result.data;
  //       this.findAllcategoryObj(this.clothingTypeEnum.TopsTShirtsShirts);
  //     } else {
  //       this.toastrService.error(result.message);
  //     }
  //   },
  //     (error) => {
  //       this.toastrService.error(JSON.stringify(error.message));
  //     });
  // }

  // findAllcategoryObj(value) {
  //   this.activeTab = value;
  //   const sizeInfoObj = this.allcategoryArr.filter((e) => this.activeTab === e.category_name)[0];
  //   this.allcategory = sizeInfoObj.wearing_sizes;
  // }

  // updateSizeValue(id, value) {
  //   this.adminDashboardService.updateSizeValue({
  //     "size_id": id,
  //     "value": value
  //   }).subscribe((result: any) => {
  //     this.getSizeChartDetails();
  //   },
  //     (error) => {
  //       this.toastrService.error(JSON.stringify(error.message));
  //     });
  // }
}

