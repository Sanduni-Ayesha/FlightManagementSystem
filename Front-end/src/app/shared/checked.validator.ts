import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export function checkedValidator(
    control: AbstractControl
): { [key: string]: boolean } | null {
    const depart = control.get('departureAirport');
    const arrive = control.get('arrivalAirport');
    return depart && arrive && depart.value != arrive.value
        ? null
        : {equalDestination: true};
}
//
// export function checkedValidator(): ValidatorFn {
//     return function validate(formGroup: FormGroup) {
//         let checked = 0
//         Object.keys(formGroup.controls).forEach(key => {
//             const control = formGroup.controls[key]
//
//             if (control.value) {
//                 checked++
//             }
//         })
//
//         if (checked < 1) {
//             return {
//                 requireCheckboxToBeChecked: true,
//             }
//         }
//
//         return null
//     }
// }
