import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Inject,
    Input,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {maskitoDateOptionsGenerator} from '@maskito/kit';
import {
    AbstractTuiControl,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    TuiAutofillFieldName,
    TuiFocusableElementAccessor,
} from '@taiga-ui/cdk';
import {
    TUI_TEXTFIELD_SIZE,
    TuiPrimitiveTextfieldComponent,
    TuiSizeL,
    TuiSizeS,
    TuiTextfieldSizeDirective,
} from '@taiga-ui/core';

@Component({
    selector: 'tui-input-expire',
    templateUrl: './input-expire.template.html',
    styleUrls: ['./input-expire.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiInputExpireComponent),
        tuiAsControl(TuiInputExpireComponent),
    ],
})
export class TuiInputExpireComponent
    extends AbstractTuiControl<string>
    implements TuiFocusableElementAccessor
{
    @ViewChild(TuiPrimitiveTextfieldComponent)
    private readonly input?: TuiPrimitiveTextfieldComponent;

    @Input()
    autocompleteEnabled = false;

    readonly maskOptions = maskitoDateOptionsGenerator({
        mode: 'mm/yy',
        separator: '/',
    });

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) cdr: ChangeDetectorRef,
        @Inject(TUI_TEXTFIELD_SIZE)
        private readonly textfieldSize: TuiTextfieldSizeDirective,
    ) {
        super(control, cdr);
    }

    @HostBinding('attr.data-size')
    get size(): TuiSizeL | TuiSizeS {
        return this.textfieldSize.size;
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        return this.input ? this.input.nativeFocusableElement : null;
    }

    get focused(): boolean {
        return !!this.input && this.input.focused;
    }

    get autocomplete(): TuiAutofillFieldName {
        return this.autocompleteEnabled ? 'cc-exp' : 'off';
    }

    onFocused(focused: boolean): void {
        this.updateFocused(focused);
    }

    protected getFallbackValue(): string {
        return '';
    }
}
