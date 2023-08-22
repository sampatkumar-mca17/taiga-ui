import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    Output,
} from '@angular/core';
import {tuiIsObserved} from '@taiga-ui/cdk';
import {
    TUI_CLOSE_WORD,
    TUI_COMMON_ICONS,
    TUI_NOTIFICATION_OPTIONS,
    TuiCommonIcons,
    TuiNotificationDefaultOptions,
} from '@taiga-ui/core/tokens';
import {TuiNotificationT} from '@taiga-ui/core/types';
import {Observable} from 'rxjs';

@Component({
    selector: 'tui-notification',
    templateUrl: './notification.template.html',
    styleUrls: ['./notification.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiNotificationComponent {
    /**
     * @deprecated Use {@link TuiNotificationComponent.icon} input or TUI_NOTIFICATION_OPTIONS instead
     */
    @Input()
    hasIcon = this.options.hasIcon;

    @Input()
    icon = this.options.icon;

    @Input()
    @HostBinding('attr.data-status')
    status: TuiNotificationT = this.options.status;

    @Input()
    @HostBinding('attr.data-size')
    size = this.options.size;

    @Input()
    hideClose = false;

    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-native
    readonly close = new EventEmitter<void>();

    constructor(
        @Inject(TUI_CLOSE_WORD) readonly closeWord$: Observable<string>,
        @Inject(TUI_COMMON_ICONS) readonly icons: TuiCommonIcons,
        @Inject(TUI_NOTIFICATION_OPTIONS) readonly options: TuiNotificationDefaultOptions,
    ) {}

    get hasClose(): boolean {
        return !this.hideClose && tuiIsObserved(this.close);
    }
}
