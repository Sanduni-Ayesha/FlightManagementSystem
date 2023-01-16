import { AbstractControl } from '@angular/forms';
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
