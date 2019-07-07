import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermdetailComponent } from './permdetail.component';

describe('PermdetailComponent', () => {
  let component: PermdetailComponent;
  let fixture: ComponentFixture<PermdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
