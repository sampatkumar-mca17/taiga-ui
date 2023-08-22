import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiInputMode, TuiInputType} from '@taiga-ui/cdk';
import {TuiSizeL, TuiSizeS} from '@taiga-ui/core';

@Component({
    selector: 'example-tui-textfield-controller',
    templateUrl: './textfield-controller.template.html',
    changeDetection,
})
export class ExampleTuiTextfieldControllerComponent {
    readonly exampleModule = import('./examples/import/import-module.md?raw');
    readonly exampleHtml = import('./examples/import/insert-template.md?raw');

    readonly example1: TuiDocExample = {
        TypeScript: import('./examples/1/index.ts?raw'),
        HTML: import('./examples/1/index.html?raw'),
    };

    readonly sizeVariants: ReadonlyArray<TuiSizeL | TuiSizeS> = ['s', 'm', 'l'];

    readonly inputModeVariants: readonly TuiInputMode[] = ['text', 'numeric'];

    readonly maxLengthVariants: readonly number[] = [10];

    readonly typeVariants: readonly TuiInputType[] = [
        'text',
        'email',
        'password',
        'tel',
        'url',
    ];

    type: TuiInputType = this.typeVariants[0];

    readonly customContentVariants = ['', 'Bell'];

    customContentSelected = this.customContentVariants[0];

    cleaner = false;
    exampleText = '';
    labelOutside = false;
    size = this.sizeVariants[2];
    inputMode = this.inputModeVariants[0];
    maxLength: number | null = null;

    readonly control = new FormControl('111', Validators.required);
}
