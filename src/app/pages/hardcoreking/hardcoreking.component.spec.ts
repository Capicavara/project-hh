import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardcorekingComponent } from './hardcoreking.component';

describe('HardcorekingComponent', () => {
  let component: HardcorekingComponent;
  let fixture: ComponentFixture<HardcorekingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardcorekingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardcorekingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
