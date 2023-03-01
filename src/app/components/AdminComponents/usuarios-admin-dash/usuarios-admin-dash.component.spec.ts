import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAdminDashComponent } from './usuarios-admin-dash.component';

describe('UsuariosAdminDashComponent', () => {
  let component: UsuariosAdminDashComponent;
  let fixture: ComponentFixture<UsuariosAdminDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosAdminDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosAdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
