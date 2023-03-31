import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosAdminDashComponent } from './prestamos-admin-dash.component';

describe('PrestamosAdminDashComponent', () => {
  let component: PrestamosAdminDashComponent;
  let fixture: ComponentFixture<PrestamosAdminDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosAdminDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosAdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
