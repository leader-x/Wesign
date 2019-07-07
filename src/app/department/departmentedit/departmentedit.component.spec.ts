import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmenteditComponent } from './departmentedit.component';

describe('DepartmenteditComponent', () => {
  let component: DepartmenteditComponent;
  let fixture: ComponentFixture<DepartmenteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmenteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmenteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
