import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichainComponent } from './multichain.component';

describe('MultichainComponent', () => {
  let component: MultichainComponent;
  let fixture: ComponentFixture<MultichainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultichainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultichainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
