import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';

@Component({
    selector: 'tui-line-clamp-example-2',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiLineClampExample2 {
    linesLimit = 2;

    toggle(): void {
        this.linesLimit = this.collapsed ? 12 : 2;
    }

    private get collapsed(): boolean {
        return this.linesLimit === 2;
    }
}
