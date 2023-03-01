import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNormalUserComponent } from './sidebar-normal-user.component';

describe('SidebarNormalUserComponent', () => {
  let component: SidebarNormalUserComponent;
  let fixture: ComponentFixture<SidebarNormalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarNormalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarNormalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
