import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface LoadingDialogData {
  title?: string;
  description?: string;
  spinnerClass?: string;
}

@Component({
  selector: 'gfs-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss']
})
export class LoadingModalComponent implements OnInit {
  readonly diameter: number = 70;
  readonly strokeWidth: number = 7;
  title: string;
  description: string;
  spinnerClass: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: LoadingDialogData) {
    console.log(`LoadingModalComponent ctor`)
  }

  ngOnInit() {
    console.log(`LoadingModalComponent init`)
    
    if (this.data) {
      this.title = this.data.title;
      this.description = this.data.description;
      this.spinnerClass = this.data.spinnerClass;
    }
  }
}
