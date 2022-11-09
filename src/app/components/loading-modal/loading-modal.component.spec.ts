import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingModalComponent } from './loading-modal.component';

import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('LoadingModalComponent', () => {
  let component: LoadingModalComponent;
  let fixture: ComponentFixture<LoadingModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatProgressSpinnerModule],
      declarations: [LoadingModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('spinner component should exist and have specified attributes', () => {
    const spinner = fixture.debugElement.query(By.directive(MatSpinner))
      .componentInstance;
    expect(spinner).toBeTruthy();
    expect(spinner.diameter).toEqual(component.diameter);
    expect(spinner.strokeWidth).toEqual(component.strokeWidth);
  });

  it('should create component without data', () => {
    component.data = undefined;

    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(component.title).toBeUndefined();
    expect(component.description).toBeUndefined();
    expect(component.spinnerClass).toBeUndefined();
  });

  it('should set title, description and spinnerClass', () => {
    component.data.title = 'My Title';
    component.data.description = 'My Description';
    component.data.spinnerClass = 'my-class';

    component.ngOnInit();

    expect(component.title).toEqual('My Title');
    expect(component.description).toEqual('My Description');
    expect(component.spinnerClass).toEqual('my-class');
  });
});
