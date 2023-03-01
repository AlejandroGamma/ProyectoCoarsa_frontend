import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNuevoUsuarioAdminComponent } from './crear-nuevo-usuario-admin.component';

describe('CrearNuevoUsuarioAdminComponent', () => {
  let component: CrearNuevoUsuarioAdminComponent;
  let fixture: ComponentFixture<CrearNuevoUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNuevoUsuarioAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNuevoUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
