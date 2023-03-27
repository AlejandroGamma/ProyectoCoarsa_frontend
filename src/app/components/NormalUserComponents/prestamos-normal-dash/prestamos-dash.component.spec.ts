import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosDashComponent } from './prestamos-dash.component';

describe('PrestamosDashComponent', () => {
  let component: PrestamosDashComponent;
  let fixture: ComponentFixture<PrestamosDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
