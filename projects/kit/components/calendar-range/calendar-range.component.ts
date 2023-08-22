import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    Optional,
    Output,
    Self,
} from '@angular/core';
import {
    ALWAYS_FALSE_HANDLER,
    TUI_FIRST_DAY,
    TUI_LAST_DAY,
    TuiBooleanHandler,
    TuiDay,
    TuiDayLike,
    TuiDayRange,
    TuiDestroyService,
    tuiIsString,
    TuiMapper,
    TuiMonth,
    tuiNullableSame,
    tuiObjectFromEntries,
    tuiPure,
    tuiWatch,
} from '@taiga-ui/cdk';
import {
    TUI_COMMON_ICONS,
    TUI_DEFAULT_MARKER_HANDLER,
    TuiCommonIcons,
    TuiMarkerHandler,
    TuiWithOptionalMinMax,
} from '@taiga-ui/core';
import {TuiDayRangePeriod} from '@taiga-ui/kit/classes';
import {MAX_DAY_RANGE_LENGTH_MAPPER} from '@taiga-ui/kit/constants';
import {TUI_CALENDAR_DATE_STREAM, TUI_OTHER_DATE_TEXT} from '@taiga-ui/kit/tokens';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tui-calendar-range',
    templateUrl: './calendar-range.template.html',
    styleUrls: ['./calendar-range.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService],
})
export class TuiCalendarRangeComponent implements TuiWithOptionalMinMax<TuiDay> {
    @Input()
    defaultViewedMonth: TuiMonth = TuiMonth.currentLocal();

    @Input()
    disabledItemHandler: TuiBooleanHandler<TuiDay> = ALWAYS_FALSE_HANDLER;

    @Input()
    markerHandler: TuiMarkerHandler = TUI_DEFAULT_MARKER_HANDLER;

    @Input()
    items: readonly TuiDayRangePeriod[] = [];

    @Input()
    min: TuiDay | null = TUI_FIRST_DAY;

    @Input()
    max: TuiDay | null = TUI_LAST_DAY;

    @Input()
    minLength: TuiDayLike | null = null;

    @Input()
    maxLength: TuiDayLike | null = null;

    @Input()
    value: TuiDayRange | null = null;

    @Output()
    readonly valueChange = new EventEmitter<TuiDayRange | null>();

    previousValue: TuiDayRange | null = null;

    readonly maxLengthMapper: TuiMapper<TuiDay, TuiDay> = MAX_DAY_RANGE_LENGTH_MAPPER;

    get computedMin(): TuiDay {
        return this.min ?? TUI_FIRST_DAY;
    }

    get computedMax(): TuiDay {
        return this.max ?? TUI_LAST_DAY;
    }

    constructor(
        @Optional()
        @Inject(TUI_CALENDAR_DATE_STREAM)
        valueChanges: Observable<TuiDayRange | null> | null,
        @Inject(ChangeDetectorRef) cdr: ChangeDetectorRef,
        @Self() @Inject(TuiDestroyService) destroy$: TuiDestroyService,
        @Inject(TUI_OTHER_DATE_TEXT) readonly otherDateText$: Observable<string>,
        @Inject(TUI_COMMON_ICONS) readonly icons: TuiCommonIcons,
    ) {
        if (!valueChanges) {
            return;
        }

        valueChanges.pipe(tuiWatch(cdr), takeUntil(destroy$)).subscribe(value => {
            this.value = value;
        });
    }

    @HostListener('document:keydown.capture', ['$event'])
    onEsc(event: KeyboardEvent): void {
        if (event.key !== 'Escape' || !this.value?.isSingleDay) {
            return;
        }

        event.stopPropagation();
        this.value = this.previousValue;
    }

    readonly mapper: TuiMapper<
        readonly TuiDayRangePeriod[],
        ReadonlyArray<TuiDayRangePeriod | string>
    > = (
        items,
        min: TuiDay,
        max: TuiDay | null,
        minLength: TuiDayLike | null,
        otherDateText: string,
    ) => [
        ...items.filter(
            item =>
                (minLength === null ||
                    item.range.from.append(minLength).daySameOrBefore(item.range.to)) &&
                item.range.to.daySameOrAfter(min) &&
                (max === null || item.range.from.daySameOrBefore(max)),
        ),
        otherDateText,
    ];

    get calculatedDisabledItemHandler(): TuiBooleanHandler<TuiDay> {
        return this.calculateDisabledItemHandler(
            this.disabledItemHandler,
            this.value,
            this.minLength,
        );
    }

    get computedMonth(): TuiMonth {
        return this.value ? this.value.to : this.defaultViewedMonth;
    }

    isItemActive(item: TuiDayRangePeriod | string): boolean {
        const {activePeriod} = this;

        return (tuiIsString(item) && activePeriod === null) || activePeriod === item;
    }

    onRangeChange(dayRange: TuiDayRange): void {
        this.updateValue(dayRange);
    }

    onDayClick(day: TuiDay): void {
        const {value} = this;

        this.previousValue = value;

        if (value === null || !value.isSingleDay) {
            this.value = new TuiDayRange(day, day);

            return;
        }

        this.updateValue(TuiDayRange.sort(value.from, day));
    }

    onItemSelect(item: TuiDayRangePeriod | string): void {
        if (typeof item !== 'string') {
            this.updateValue(item.range.dayLimit(this.min, this.max));

            return;
        }

        if (this.activePeriod !== null) {
            this.updateValue(null);
        }
    }

    updateValue(value: TuiDayRange | null): void {
        this.value = value;
        this.valueChange.emit(value);
    }

    private get activePeriod(): TuiDayRangePeriod | null {
        return (
            this.items.find(item =>
                tuiNullableSame<TuiDayRange>(
                    this.value,
                    item.range,
                    (a, b) =>
                        a.from.daySame(b.from.dayLimit(this.min, this.max)) &&
                        a.to.daySame(b.to.dayLimit(this.min, this.max)),
                ),
            ) || null
        );
    }

    @tuiPure
    private calculateDisabledItemHandler(
        disabledItemHandler: TuiBooleanHandler<TuiDay>,
        value: TuiDayRange | null,
        minLength: TuiDayLike | null,
    ): TuiBooleanHandler<TuiDay> {
        return item => {
            if (!value?.isSingleDay || !minLength) {
                return disabledItemHandler(item);
            }

            const negativeMinLength = tuiObjectFromEntries(
                Object.entries(minLength).map(([key, value]) => [key, -value]),
            );
            const disabledBefore = value.from.append(negativeMinLength).append({day: 1});
            const disabledAfter = value.from.append(minLength).append({day: -1});
            const inDisabledRange =
                disabledBefore.dayBefore(item) && disabledAfter.dayAfter(item);

            return inDisabledRange || disabledItemHandler(item);
        };
    }
}
