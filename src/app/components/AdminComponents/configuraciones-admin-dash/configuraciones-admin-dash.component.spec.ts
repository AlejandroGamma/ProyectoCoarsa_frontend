import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionesAdminDashComponent } from './configuraciones-admin-dash.component';

describe('ConfiguracionesAdminDashComponent', () => {
  let component: ConfiguracionesAdminDashComponent;
  let fixture: ComponentFixture<ConfiguracionesAdminDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionesAdminDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionesAdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
