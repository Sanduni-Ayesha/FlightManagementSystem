import {AbstractControl} from '@angular/forms';

export function futureDateValidator(
    control: AbstractControl
): { [key: string]: boolean } | null {
    if (control.get('startDate')?.value) {
        const depart = new Date(control.get('startDate')?.value);
        const today = new Date();
        return depart && depart.toLocaleDateString() >= today.toLocaleDateString() ? null : {dateMismatch: true};
    }
    const depart = new Date(control.get('departureTime')?.value);
    const today = new Date();
    return depart && depart >= today ? null : {dateMismatch: true};
}
