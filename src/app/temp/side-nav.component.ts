import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReflektmeService } from '../reflekt-tool-new/service/reflektme.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class TempComponent implements OnInit, AfterViewInit {
  status: boolean = false;
  public role: any;
  isLoggedIn: any;
  currentPage = '';
  photoCount = 0;
  videoCount = 0;
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  @ViewChild('ProfileModal', { static: false }) profileModal;
  constructor(
    sanitizer: DomSanitizer,
    private reflektmeService: ReflektmeService,
    private toastrService: ToastrService
  ) {
    //
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    // this.iframe.nativeElement.setAttribute('src', '52.183.132.17/login');
  }
  openPopup() {
    const jwt = localStorage.getItem('cusromerloginToken');
    if (jwt) {
      // this.reflektmecomponent.opnReflektModal();
      this.profileModal.openmodal();
    }
    else {
      $('#tempPopup').modal('show');
      // 52.183.132.17/reflektme-tool-new
      this.iframe.nativeElement.setAttribute('src', 'http://52.183.132.17/reflektme-tool-new');
    }
  }
  checkEcommerceToken() {
    const token = "123456";
    this.reflektmeService.checkEcommerceToken(token).subscribe((result: any) => {
      if (result.status === 3008) {
        this.openPopup();
      }
    }, (error) => {
      this.toastrService.error(JSON.stringify(error.message));
    });
  }
}
