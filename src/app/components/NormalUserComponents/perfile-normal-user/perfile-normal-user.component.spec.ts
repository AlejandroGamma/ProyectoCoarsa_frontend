import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfileNormalUserComponent } from './perfile-normal-user.component';

describe('PerfileNormalUserComponent', () => {
  let component: PerfileNormalUserComponent;
  let fixture: ComponentFixture<PerfileNormalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfileNormalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfileNormalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
