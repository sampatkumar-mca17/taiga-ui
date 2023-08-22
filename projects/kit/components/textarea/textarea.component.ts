import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
    AbstractTuiControl,
    TUI_IS_IOS,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    TuiContextWithImplicit,
    TuiFocusableElementAccessor,
    tuiIsNativeFocused,
} from '@taiga-ui/cdk';
import {
    MODE_PROVIDER,
    TEXTFIELD_CONTROLLER_PROVIDER,
    TUI_ICON_PADDINGS,
    TUI_MODE,
    TUI_TEXTFIELD_WATCHED_CONTROLLER,
    TuiBrightness,
    tuiGetBorder,
    TuiHintOptionsDirective,
    TuiSizeL,
    TuiSizeS,
    TuiTextfieldComponent,
    TuiTextfieldController,
} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';

export const DEFAULT_ROWS = 20;
export const LINE_HEIGHT_M = 20;
export const LINE_HEIGHT_L = 24;

@Component({
    selector: 'tui-textarea',
    templateUrl: './textarea.template.html',
    styleUrls: ['./textarea.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiTextareaComponent),
        tuiAsControl(TuiTextareaComponent),
        TEXTFIELD_CONTROLLER_PROVIDER,
        MODE_PROVIDER,
    ],
    host: {
        '($.data-mode.attr)': 'mode$',
        '[class._ios]': 'isIOS',
    },
})
export class TuiTextareaComponent
    extends AbstractTuiControl<string>
    implements TuiFocusableElementAccessor
{
    @ViewChild('focusableElement')
    private readonly focusableElement?: ElementRef<HTMLTextAreaElement>;

    @ContentChild(TuiTextfieldComponent, {read: ElementRef})
    private readonly textfield?: ElementRef<HTMLTextAreaElement>;

    @Input()
    rows = DEFAULT_ROWS;

    @Input()
    maxLength: number | null = null;

    @Input()
    @HostBinding('class._expandable')
    expandable = false;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) cdr: ChangeDetectorRef,
        @Inject(TUI_IS_IOS) readonly isIOS: boolean,
        @Inject(TUI_MODE) readonly mode$: Observable<TuiBrightness | null>,
        @Inject(TUI_TEXTFIELD_WATCHED_CONTROLLER)
        readonly controller: TuiTextfieldController,
        @Optional()
        @Inject(TuiHintOptionsDirective)
        readonly hintOptions: TuiHintOptionsDirective | null,
    ) {
        super(control, cdr);
    }

    @HostBinding('class._label-outside')
    get labelOutside(): boolean {
        return this.controller.labelOutside;
    }

    get nativeFocusableElement(): HTMLTextAreaElement | null {
        if (this.computedDisabled) {
            return null;
        }

        return (
            this.textfield?.nativeElement || this.focusableElement?.nativeElement || null
        );
    }

    get focused(): boolean {
        return tuiIsNativeFocused(this.nativeFocusableElement);
    }

    get appearance(): string {
        return this.controller.appearance;
    }

    @HostBinding('attr.data-size')
    get size(): TuiSizeL | TuiSizeS {
        return this.controller.size;
    }

    @HostBinding('style.--border-start.rem')
    get borderStart(): number {
        return this.iconLeftContent ? TUI_ICON_PADDINGS[this.size] : 0;
    }

    @HostBinding('style.--border-end.rem')
    get borderEnd(): number {
        return tuiGetBorder(
            !!this.iconContent,
            this.hasCleaner,
            this.hasTooltip,
            this.hasCustomContent,
            this.size,
        );
    }

    get hasCleaner(): boolean {
        return this.controller.cleaner && this.hasValue && this.interactive;
    }

    @HostBinding('class._has-tooltip')
    get hasTooltip(): boolean {
        return (
            !!this.hintOptions?.content &&
            (this.controller.options.hintOnDisabled || !this.computedDisabled)
        );
    }

    @HostBinding('class._has-value')
    get hasValue(): boolean {
        return this.value !== '';
    }

    @HostBinding('class._has-counter')
    get hasCounter(): boolean {
        return !!this.maxLength && this.interactive;
    }

    get hasPlaceholder(): boolean {
        return this.placeholderRaisable || (!this.hasValue && !this.hasExampleText);
    }

    get hasCustomContent(): boolean {
        return !!this.controller.customContent;
    }

    get iconLeftContent(): PolymorpheusContent<
        TuiContextWithImplicit<TuiSizeL | TuiSizeS>
    > {
        return this.controller.iconLeft;
    }

    get iconContent(): PolymorpheusContent<TuiContextWithImplicit<TuiSizeL | TuiSizeS>> {
        return this.controller.icon;
    }

    get iconCleaner(): PolymorpheusContent<TuiContextWithImplicit<TuiSizeL | TuiSizeS>> {
        return this.controller.options.iconCleaner;
    }

    get hasExampleText(): boolean {
        return (
            !!this.textfield?.nativeElement.placeholder &&
            this.focused &&
            !this.hasValue &&
            !this.readOnly
        );
    }

    get computeMaxHeight(): number | null {
        return this.expandable ? this.rows * this.lineHeight : null;
    }

    get placeholderRaised(): boolean {
        return (
            this.placeholderRaisable &&
            ((this.computedFocused && !this.readOnly) || this.hasValue)
        );
    }

    get fittedContent(): string {
        return this.value.slice(0, this.maxLength || Infinity);
    }

    get extraContent(): string {
        return this.value.slice(this.maxLength || Infinity);
    }

    @HostListener('focusin', ['true'])
    @HostListener('focusout', ['false'])
    onFocused(focused: boolean): void {
        this.updateFocused(focused);
    }

    onValueChange(value: string): void {
        this.value = value;
    }

    onMouseDown(event: MouseEvent): void {
        if (event.target === this.nativeFocusableElement) {
            return;
        }

        event.preventDefault();

        if (this.nativeFocusableElement) {
            this.nativeFocusableElement.focus();
        }
    }

    protected getFallbackValue(): string {
        return '';
    }

    private get lineHeight(): number {
        return this.controller.size === 'm' ? LINE_HEIGHT_M : LINE_HEIGHT_L;
    }

    private get placeholderRaisable(): boolean {
        return this.size !== 's' && !this.controller.labelOutside;
    }
}
