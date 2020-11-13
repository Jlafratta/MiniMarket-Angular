import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { ProductService } from '../services/product.service';

export class CustomValidators {

    static forbiddenWords(forbiddenWords: RegExp): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {

            /** Evaluo la regexp pasada por parametro */
            const forbidden = forbiddenWords.test(control.value);

            return forbidden ? { 'forbiddenWords': {value: control.value} } : null;
        };
    }

    static lettersOnly(): ValidatorFn {
        let regExp: RegExp = /^[a-zA-Z\s]*$/;

        return (control: AbstractControl): {[key: string]: any} | null => {

            /** control.value es el valor que evalua el validator (en este ej seria como name.value) */
            const lettersOnly = regExp.test(control.value);


            return !lettersOnly ? { 'lettersOnly': {value: control.value} } : null;
        };
    }

    static nameExists(productService: ProductService): AsyncValidatorFn {
        return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
            if(control.value == '') {
                return null;
            }else {
                return productService.getByName(control.value)
                    .then(response => {
                        return response ? { 'nameExists': { value: control.value } } : null;
                    })
            }
        }
    }
}
