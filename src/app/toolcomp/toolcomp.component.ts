import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-toolcomp',
  templateUrl: './toolcomp.component.html',
  styleUrls: ['./toolcomp.component.css']
})
export class ToolcompComponent implements OnInit {

  constructor(
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }
  openmodal() {
    $('#reflektSize').modal('show');
  }
  removeData() {
    localStorage.clear();
    this.toastrService.success("Logout successfully");
    $('#reflektSize').modal('hide');
  }
}
