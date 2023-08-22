import {Component, Inject, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiAlertService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AlertExampleWithCustomLabelComponent} from './alert-example-with-custom-label/alert-example-with-custom-label.component';
import {CustomLabelComponent} from './custom-label/custom-label.component';

@Component({
    selector: 'tui-alerts-example-5',
    templateUrl: './index.html',
    changeDetection,
    encapsulation,
})
export class TuiAlertsExampleComponent5 {
    readonly notification: Observable<void>;
    readonly notificationWithCustomLabel: Observable<void>;

    constructor(
        @Inject(TuiAlertService) alerts: TuiAlertService,
        @Inject(Router) router: Router,
        @Inject(Injector) private readonly injector: Injector,
    ) {
        this.notification = alerts
            .open(
                new PolymorpheusComponent(
                    AlertExampleWithCustomLabelComponent,
                    this.injector,
                ),
                {
                    label: ({status}) =>
                        status === 'error'
                            ? 'Error label from function'
                            : 'Info label from function',
                    status: 'error',
                    autoClose: false,
                },
            )
            .pipe(takeUntil(router.events));

        this.notificationWithCustomLabel = alerts
            .open(
                new PolymorpheusComponent(
                    AlertExampleWithCustomLabelComponent,
                    this.injector,
                ),
                {
                    label: new PolymorpheusComponent(CustomLabelComponent, this.injector),
                    status: 'warning',
                    autoClose: false,
                },
            )
            .pipe(takeUntil(router.events));
    }

    showNotification(): void {
        this.notification.subscribe();
    }

    showNotificationWithCustomLabel(): void {
        this.notificationWithCustomLabel.subscribe();
    }
}
