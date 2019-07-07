import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajoreditComponent } from './majoredit.component';

describe('MajoreditComponent', () => {
  let component: MajoreditComponent;
  let fixture: ComponentFixture<MajoreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajoreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
