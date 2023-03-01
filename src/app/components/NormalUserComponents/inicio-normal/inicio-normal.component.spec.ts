import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioNormalComponent } from './inicio-normal.component';

describe('InicioNormalComponent', () => {
  let component: InicioNormalComponent;
  let fixture: ComponentFixture<InicioNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioNormalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
