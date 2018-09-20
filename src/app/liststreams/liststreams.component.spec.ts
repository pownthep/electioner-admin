import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstreamsComponent } from './liststreams.component';

describe('ListstreamsComponent', () => {
  let component: ListstreamsComponent;
  let fixture: ComponentFixture<ListstreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListstreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListstreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
