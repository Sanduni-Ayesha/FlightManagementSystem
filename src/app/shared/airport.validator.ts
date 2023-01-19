import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function airportValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const depart = control.get('departureAirport');
  const arrive = control.get('arrivalAirport');
  return depart && arrive && depart.value != arrive.value
    ? null
    : { equalDestination: true };
}
export const AirportEquality: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const Departure = control.get('departureAirport');
  const arrival = control.get('arrivalAirport');

  return Departure && arrival && Departure.value != arrival.value
    ? null
    : { equalAirport: true };
};
