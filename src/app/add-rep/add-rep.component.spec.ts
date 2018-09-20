import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepComponent } from './add-rep.component';

describe('AddRepComponent', () => {
  let component: AddRepComponent;
  let fixture: ComponentFixture<AddRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
