import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMsgesComponent } from './filter-msges.component';

describe('FilterMsgesComponent', () => {
  let component: FilterMsgesComponent;
  let fixture: ComponentFixture<FilterMsgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterMsgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterMsgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
