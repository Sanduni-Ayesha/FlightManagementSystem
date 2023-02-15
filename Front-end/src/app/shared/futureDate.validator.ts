import {AbstractControl} from '@angular/forms';

export function futureDateValidator(
    control: AbstractControl
): { [key: string]: boolean } | null {
    const depart = new Date(control.get('departureTime')?.value);
    const today = new Date();
    return depart && depart >= today ? null : {dateMismatch: true};
}
