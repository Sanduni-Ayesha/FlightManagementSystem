import { AbstractControl } from '@angular/forms';

export function dateValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const depart = new Date(control.get('departureTime')?.value);
  const arrive = new Date(control.get('arrivalTime')?.value);
  return arrive >= depart ? null : { durationError: true };
}
