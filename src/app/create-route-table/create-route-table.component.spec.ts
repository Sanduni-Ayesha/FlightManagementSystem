import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteTableComponent } from './create-route-table.component';

describe('CreateRouteTableComponent', () => {
  let component: CreateRouteTableComponent;
  let fixture: ComponentFixture<CreateRouteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRouteTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRouteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
