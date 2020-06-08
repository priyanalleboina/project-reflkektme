import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DashboardTabs, PeriodTab, ApproveStatus } from '../../constants/enum';
import { AdminDashboardService } from '../service/admin-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Axis } from 'highcharts';
import { DataService } from 'src/app/services/data.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  // lineChart: any;
  barChart: any;
  heightGauge: any = {};
  weightGauge: any = {};
  activeTab: any;
  tabEnum: any;
  periodEnum: any;
  ReviewStatusEnum: any;
  ageTab: any;
  allReviews = [];
  ageData: any = {};
  selectedReportType: any = '';
  calendarObj: any = {
    toDate: null,
    fromDate: null
  };
  calendarAgeData: any = {};
  constructor(
    private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService,
    private dataService: DataService) {
    this.tabEnum = new DashboardTabs();
    this.periodEnum = new PeriodTab();
    this.ReviewStatusEnum = new ApproveStatus();
    this.activeTab = this.tabEnum.UserReviews;
    this.ageTab = this.periodEnum.Weekly;
  }

  ngOnInit() {
    // this.exportAsExcelFile();
    this.getAllSizeData();
    this.gaugeChart();
    this.getAllCategory();
    this.getAllReview();
    this.getAllMeasurments();
    this.getAgeData();
    this.ageData = {
      monthly: {
        '45': 0.0,
        '25-34': 0.0,
        '18-24': 0.0,
        '35-44': 0.0
      },
      yearly: {
        '45': 0.0,
        '25-34': 0.0,
        '18-24': 0.0,
        '35-44': 0.0
      },
      weekly: {
        '45': 0.0,
        '25-34': 0.0,
        '18-24': 0.0,
        '35-44': 0.0
      },
      calender: {
        '45': 0.0,
        '25-34': 0.0,
        '18-24': 0.0,
        '35-44': 0.0
      }
    };
  }

  public exportAsExcelFile() {
    this.adminDashboardService.generateReport(this.selectedReportType).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data && res.data.length) {
          let tempData = res.data.map((el) => {
            let tempObj: any = {};

            if (el.customerMeasurementId) {
              tempObj['Customer Measurement Id'] = el.customerMeasurementId;
            }
            if (el.size) {
              tempObj['Size'] = el.size;
            }
            if (el.age) {
              tempObj['Age'] = el.age;
            }
            if (el.heightMeasurement) {
              tempObj['Height Measurement'] = el.heightMeasurement;
            }
            if (el.feet) {
              tempObj['Feet'] = el.feet;
            }
            if (el.inch) {
              tempObj['Inch'] = el.inch;
            }
            if (el.centemeter) {
              tempObj['Centemeter'] = el.centemeter;
            }
            if (el.weightMeasurement) {
              tempObj['Weight Measurement'] = el.weightMeasurement;
            }
            if (el.kiloGram) {
              tempObj['Kilo Gram'] = el.kiloGram;
            }
            if (el.lbs) {
              tempObj['Lbs'] = el.lbs;
            }
            if (el.userId) {
              tempObj['User Id'] = el.userId;
            }
            if (el.userEmail) {
              tempObj['User Email'] = el.userEmail;
            }
            if (el.brand) {
              tempObj['Brand'] = el.brand;
            }
            if (el.productUrl && el.productUrl.length) {
              let tempURL = '';
              el.productUrl.forEach((ac) => {
                tempURL = tempURL + ', ' + ac;
              });
              tempObj['Product URL'] = tempURL;
            }
            if (el.created_date || el.createdDate) {
              if (el.created_date) {
                let tempDate = new Date(el.created_date);
                tempObj.Date = (tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate());
              } else {
                let tempDate = new Date(el.createdDate);
                tempObj.Date = (tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate());
              }
            }
            return tempObj;
          });
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tempData);
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, 'Report' + new Date().getMilliseconds());
        } else {
          this.toastrService.success('No Data available');
        }
      } else {
        this.toastrService.error(res.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public onRate(event) {
  }

  getAllCategory() {
    this.adminDashboardService.getSizeChartDetails().subscribe((result: any) => {
      if (result.status === 200) {
        // localStorage.setItem('allcategoryArr', JSON.stringify(result.data));
        this.dataService.sendCategories(result.data);
      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  // line_Chart() {
  //   this.lineChart = new Chart({
  //     chart: {
  //       type: 'line'
  //     },
  //     title: {
  //       text: ''
  //     },
  //     xAxis: {
  //       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //     },
  //     yAxis: {
  //       className: 'highcharts-color-0',
  //       title: {
  //         text: ''
  //       },
  //       categories: ['2K', '4K', '6K', '8K', '10k']
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     series: [
  //       {
  //         name: 'Line 1',
  //         data: [0.5, 0.5, 1, 2, 1.5, 3, 3.5, 4, 3, 4.5],
  //         color: '#f5c254',
  //         type: undefined
  //       }
  //     ]
  //   });
  // }

  columnChart(x_axis, y_axis, column_data) {
    this.barChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: x_axis
      },
      yAxis: {
        className: 'highcharts-color-0',
        title: {
          text: ''
        },
        categories: y_axis
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: '',
          data: column_data,
          color: '#f5c254',
          type: undefined,
          pointWidth: 22
        }
      ]
    });
  }

  gaugeChart() {
    this.heightGauge = {
      type: 'full',
      thickness: 10,
      value: 75,
      label: 'Speed',
      appendText: '%',
      cap: 'round',
      size: 250,
      foreColor: '#808184',
      backColor: '#d2d3d4',
    };
    this.weightGauge = {
      type: 'full',
      thickness: 10,
      value: 60,
      label: 'Speed',
      appendText: '%',
      cap: 'round',
      size: 250,
      foreColor: '#bdd9bf',
      backColor: '#e5f0e5',
    };
  }

  getAllReview(page?, size?) {
    this.adminDashboardService.getAllReview(page, size).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data && res.data.length) {
          this.allReviews = res.data;
        } else {
          this.allReviews = [];
        }
      } else {
        this.toastrService.error(res.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  approveUserReview(reviewId, reviewStatus) {
    this.adminDashboardService.approveUserReview(reviewId, reviewStatus).subscribe((res: any) => {
      if (res.status === 200) {
        this.toastrService.info('Review Status updated successfully');
        this.getAllReview();
      } else {
        this.toastrService.error(res.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  getAllSizeData() {
    this.adminDashboardService.getAllSizeData().subscribe((res: any) => {
      if (res.status === 200) {
        let x_axis = [];
        let y_axis = [];
        let column_data = [];
        res.data.forEach(element => {
          x_axis.push(element.xAxis)
          y_axis.push(element.yAxis)
          column_data.push(Number(element.data))
        });
        this.columnChart(x_axis, y_axis, column_data);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  getAllMeasurments() {
    let measurements = [];
    this.adminDashboardService.getMeasurements().subscribe((result: any) => {
      measurements = result.data.filter((s => a => !s.has(a.size) && s.add(a.size))(new Set));
      this.dataService.sendMeasurements(measurements);
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  getAgeData() {
    if (this.calendarObj.toDate && this.calendarObj.fromDate &&
      ((this.calendarObj.toDate).getTime()) < (this.calendarObj.fromDate).getTime()) {
      this.toastrService.error('From Date is less than To Date');
    } else {
      this.adminDashboardService.getAgeData(this.calendarObj).subscribe((res: any) => {
        if (res.status === 200) {
          if (this.calendarObj.toDate && this.calendarObj.fromDate) {
            this.ageData.calender = res.data;
          } else {
            this.ageData = res.data;
            this.ageData.calender = {
              '45': 0.0,
              '25-34': 0.0,
              '18-24': 0.0,
              '35-44': 0.0
            };
          }
        } else {
          this.toastrService.error(res.message);
        }
      },
        (error) => {
          this.toastrService.error(JSON.stringify(error.message));
        });
    }
  }
}
