import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesDashComponent } from './vacaciones-dash.component';

describe('VacacionesDashComponent', () => {
  let component: VacacionesDashComponent;
  let fixture: ComponentFixture<VacacionesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacacionesDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacacionesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
