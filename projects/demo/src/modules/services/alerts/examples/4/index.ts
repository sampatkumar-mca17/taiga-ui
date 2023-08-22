import {Component, Inject, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiAlertService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';

import {AlertExampleWithDataComponent} from './alert-example-with-data/alert-example-with-data.component';

@Component({
    selector: 'tui-alerts-example-4',
    templateUrl: './index.html',
    changeDetection,
    encapsulation,
})
export class TuiAlertsExampleComponent4 {
    readonly notification: Observable<void>;

    constructor(
        @Inject(TuiAlertService) alerts: TuiAlertService,
        @Inject(Router) router: Router,
        @Inject(Injector) private readonly injector: Injector,
    ) {
        this.notification = alerts
            .open<number>(
                new PolymorpheusComponent(AlertExampleWithDataComponent, this.injector),
                {
                    label: 'Heading is so long that it should be shown in two lines of text',
                    data: 237,
                    status: 'warning',
                    autoClose: false,
                },
            )
            .pipe(
                switchMap(response =>
                    alerts.open(`Got a value — ${response}`, {
                        label: 'Information',
                    }),
                ),
                takeUntil(router.events),
            );
    }

    showNotification(): void {
        this.notification.subscribe();
    }
}
