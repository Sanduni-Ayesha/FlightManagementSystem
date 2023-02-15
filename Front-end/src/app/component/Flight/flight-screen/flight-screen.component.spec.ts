import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FlightScreenComponent} from './flight-screen.component';

describe('FlightScreenComponent', () => {
    let component: FlightScreenComponent;
    let fixture: ComponentFixture<FlightScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FlightScreenComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FlightScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
