import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { InputTestComponent } from './components/test2/input-test/input-test.component';
import { MyComponentComponent } from './components/test2/my-component/my-component.component';
import { AppAngularCDKModule } from './glue/angular-cdk.module';
import { AppMaterialModule } from './glue/material.module';
import { LoadingSpinnerOverlayService } from './services/loading-spinner-overlay.service';

@NgModule({
  declarations: [
    AppComponent,
    LoadingModalComponent,
    MyComponentComponent,
    InputTestComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    AppAngularCDKModule
  ],
  providers: [
    LoadingSpinnerOverlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
