import {NgModule} from '@angular/core';
import {TuiActiveZoneModule, TuiHoveredModule, TuiOverscrollModule} from '@taiga-ui/cdk';
import {TuiScrollbarModule} from '@taiga-ui/core/components/scrollbar';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';

import {TuiDropdownComponent} from './dropdown.component';
import {TuiDropdownDirective} from './dropdown.directive';
import {TuiDropdownContextDirective} from './dropdown-context.directive';
import {TuiDropdownDriverDirective} from './dropdown-driver.directive';
import {TuiDropdownHostDirective} from './dropdown-host.directive';
import {TuiDropdownHoverDirective} from './dropdown-hover.directive';
import {TuiDropdownManualDirective} from './dropdown-manual.directive';
import {TuiDropdownOpenDirective} from './dropdown-open.directive';
import {TuiDropdownOptionsDirective} from './dropdown-options.directive';
import {TuiDropdownPositionDirective} from './dropdown-position.directive';
import {TuiDropdownPositionSidedDirective} from './dropdown-position-sided.directive';
import {TuiDropdownSelectionDirective} from './dropdown-selection.directive';

@NgModule({
    imports: [
        PolymorpheusModule,
        TuiActiveZoneModule,
        TuiOverscrollModule,
        TuiScrollbarModule,
        TuiHoveredModule,
    ],
    declarations: [
        TuiDropdownDirective,
        TuiDropdownComponent,
        TuiDropdownOpenDirective,
        TuiDropdownOptionsDirective,
        TuiDropdownHostDirective,
        TuiDropdownDriverDirective,
        TuiDropdownManualDirective,
        TuiDropdownHoverDirective,
        TuiDropdownContextDirective,
        TuiDropdownPositionDirective,
        TuiDropdownPositionSidedDirective,
        TuiDropdownSelectionDirective,
    ],
    exports: [
        TuiDropdownDirective,
        TuiDropdownComponent,
        TuiDropdownOpenDirective,
        TuiDropdownOptionsDirective,
        TuiDropdownHostDirective,
        TuiDropdownDriverDirective,
        TuiDropdownManualDirective,
        TuiDropdownHoverDirective,
        TuiDropdownContextDirective,
        TuiDropdownPositionDirective,
        TuiDropdownPositionSidedDirective,
        TuiDropdownSelectionDirective,
    ],
})
export class TuiDropdownModule {}
