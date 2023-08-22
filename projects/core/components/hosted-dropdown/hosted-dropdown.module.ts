import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiActiveZoneModule, TuiLetModule, TuiObscuredModule} from '@taiga-ui/cdk';
import {
    TuiDropdownModule,
    TuiDropdownOptionsDirective,
} from '@taiga-ui/core/directives/dropdown';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';

import {TuiAccessorProxyDirective} from './accessor-proxy.directive';
import {TuiDropdownOpenMonitorDirective} from './dropdown-open-monitor.directive';
import {TuiHostedDropdownComponent} from './hosted-dropdown.component';
import {TuiHostedDropdownConnectorDirective} from './hosted-dropdown-connector.directive';

@NgModule({
    imports: [
        CommonModule,
        PolymorpheusModule,
        TuiLetModule,
        TuiObscuredModule,
        TuiActiveZoneModule,
        TuiDropdownModule,
    ],
    declarations: [
        TuiAccessorProxyDirective,
        TuiDropdownOpenMonitorDirective,
        TuiHostedDropdownComponent,
        TuiHostedDropdownConnectorDirective,
    ],
    exports: [
        TuiHostedDropdownComponent,
        TuiHostedDropdownConnectorDirective,
        TuiDropdownOptionsDirective,
    ],
})
export class TuiHostedDropdownModule {}
