import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPasswordNormalComponent } from './cambiar-password-normal.component';

describe('CambiarPasswordNormalComponent', () => {
  let component: CambiarPasswordNormalComponent;
  let fixture: ComponentFixture<CambiarPasswordNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarPasswordNormalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarPasswordNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
