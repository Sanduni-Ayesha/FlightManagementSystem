import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFlightFormComponent } from './schedule-flight-form.component';

describe('ScheduleFlightFormComponent', () => {
  let component: ScheduleFlightFormComponent;
  let fixture: ComponentFixture<ScheduleFlightFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleFlightFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleFlightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
