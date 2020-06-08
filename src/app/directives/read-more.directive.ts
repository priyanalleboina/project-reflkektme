import { Component, ElementRef, Input, OnChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'read-more',
  template: `
        <div [innerHTML]="currentText">
        </div>
            <a class="pointer read-more-btn" [class.hidden]="hideToggle" (click)="toggleView()">Read {{!isCollapsed? 'less':'more'}}</a>
    `
})

export class ReadMoreComponent implements OnChanges {
  @Input() text: string;
  @Input() maxLength = 100;
  currentText: string;
  hideToggle = true;

  isCollapsed = true;

  constructor(private elementRef: ElementRef) {

  }
  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }
  determineView() {
    if (!this.text || this.text.length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed) {
      this.currentText = this.text.substring(0, this.maxLength) + '...';
    } else {
      this.currentText = this.text;
    }

  }
  ngOnChanges() {
    this.determineView();
  }
}
