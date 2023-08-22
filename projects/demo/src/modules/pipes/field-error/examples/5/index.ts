import {Component, Inject} from '@angular/core';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TUI_IS_E2E, TuiValidationError} from '@taiga-ui/cdk';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

const latinChars = /^[a-zA-Z]+$/;

function asyncValidatorFn(isE2E: boolean): AsyncValidatorFn {
    return (field: AbstractControl) => {
        return field.value && latinChars.test(field.value)
            ? of(null)
            : of({
                  error: new TuiValidationError('Only latin letters allowed'),
              }).pipe(isE2E ? delay(0) : delay(5000));
    };
}

@Component({
    selector: 'tui-field-error-pipe-example-5',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiFieldErrorPipeExample5 {
    readonly form: FormGroup;

    constructor(
        @Inject(FormBuilder) private readonly fb: FormBuilder,
        @Inject(TUI_IS_E2E) isE2E: boolean,
    ) {
        this.form = this.fb.group({
            text: ['русский текст', Validators.required],
        });

        this.form.controls['text'].setAsyncValidators(asyncValidatorFn(isE2E));
        this.form.controls['text'].markAsTouched();
    }
}
