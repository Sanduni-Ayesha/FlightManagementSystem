import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteScreenComponent } from './route-screen.component';

describe('CreateRouteTableComponent', () => {
  let component: RouteScreenComponent;
  let fixture: ComponentFixture<RouteScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
