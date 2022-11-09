import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingModalComponent } from '../components/loading-modal/loading-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerOverlayService {

  /**
   * @description handle global loader overlay
   * @param dialogRef dialog reference
   */
  constructor(private dialog: MatDialog) { }

  show() {
    const dialogInstance = this.tryGetDialogInstance();
    if (!dialogInstance) {
      this.dialog.open(LoadingModalComponent, {
        id: 'LOADING_MODAL_ID',
        disableClose: true
      });
    }
  }

  hide() {
    const dialogInstance = this.tryGetDialogInstance();
    dialogInstance?.close();
  }

  private tryGetDialogInstance = () => this.dialog.getDialogById('LOADING_MODAL_ID');

}
