import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackloadComponent } from './backload.component';

describe('BackloadComponent', () => {
  let component: BackloadComponent;
  let fixture: ComponentFixture<BackloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
