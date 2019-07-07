import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingdetailComponent } from './teachingdetail.component';

describe('TeachingdetailComponent', () => {
  let component: TeachingdetailComponent;
  let fixture: ComponentFixture<TeachingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
