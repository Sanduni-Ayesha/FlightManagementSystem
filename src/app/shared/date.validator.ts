import { AbstractControl } from '@angular/forms';

export function dateValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const depart = new Date(control.get('Departure_Time')?.value);
  const arrive = new Date(control.get('Arrival_Time')?.value);
  return arrive >= depart ? null : { durationError: true };
}
