import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesAdminDashComponent } from './vacaciones-admin-dash.component';

describe('VacacionesAdminDashComponent', () => {
  let component: VacacionesAdminDashComponent;
  let fixture: ComponentFixture<VacacionesAdminDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacacionesAdminDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacacionesAdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
