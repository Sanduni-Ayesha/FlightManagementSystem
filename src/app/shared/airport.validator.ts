import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { formatDate } from '@angular/common';

export function airportValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const depart = control.get('Departure_Airport');
  const arrive = control.get('Arrival_Airport');
  return depart && arrive && depart.value != arrive.value
    ? null
    : { equalDestination: true };
}
export const AirportEquality: ValidatorFn = (control: AbstractControl): ValidationErrors| null => {
  const Departure = control.get('departureAirport');
  const arrival = control.get('arrivalAirport');

  return Departure && arrival && Departure.value != arrival.value ?   null:{ equalAirport: true };
};
