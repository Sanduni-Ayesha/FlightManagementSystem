import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteFormComponent } from './add-route-form.component';

describe('AddRouteFormComponent', () => {
  let component: AddRouteFormComponent;
  let fixture: ComponentFixture<AddRouteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRouteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
