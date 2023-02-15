import {AbstractControl} from '@angular/forms';

export function airportValidator(
    control: AbstractControl
): { [key: string]: boolean } | null {
    const depart = control.get('departureAirport');
    const arrive = control.get('arrivalAirport');
    return depart && arrive && depart.value != arrive.value
        ? null
        : {equalDestination: true};
}

