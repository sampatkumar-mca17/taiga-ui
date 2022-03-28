import {Component, ElementRef, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TuiKeySteps} from '@taiga-ui/kit';
import {configureTestSuite} from '@taiga-ui/testing';

import {TuiSliderModule} from '../slider.module';

describe('TuiSliderKeyStepsDirective', () => {
    @Component({
        template: `
            <input
                #slider
                tuiSlider
                type="range"
                [keySteps]="keySteps"
                [max]="max"
                [min]="min"
                [formControl]="control"
            />
        `,
    })
    class TestComponent {
        @ViewChild('slider', {static: true, read: ElementRef})
        inputElRef!: ElementRef<HTMLInputElement>;

        control = new FormControl(720_000);

        keySteps: TuiKeySteps = [
            [0, 5_000],
            [100 / 3, 100_000],
            [(100 / 3) * 2, 300_000],
            [100, 1_000_000],
        ];

        max = 30;
        min = 0;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, TuiSliderModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
    });

    describe("correctly sets initial value on native input (values satisfy input's steps)", () => {
        it('720_000 => 26/30', () => {
            fixture.detectChanges();
            expect(testComponent.inputElRef.nativeElement.value).toBe('26');
        });

        const controlNativeValuesMap = [
            {controlValue: 1_000_000, nativeValue: 30},
            {controlValue: 930_000, nativeValue: 29},
            {controlValue: 860_000, nativeValue: 28},
            {controlValue: 790_000, nativeValue: 27},
            {controlValue: 650_000, nativeValue: 25},
            {controlValue: 580_000, nativeValue: 24},
            {controlValue: 510_000, nativeValue: 23},
            {controlValue: 440_000, nativeValue: 22},
            {controlValue: 370_000, nativeValue: 21},
            {controlValue: 300_000, nativeValue: 20},
            {controlValue: 280_000, nativeValue: 19},
            {controlValue: 260_000, nativeValue: 18},
            {controlValue: 240_000, nativeValue: 17},
            {controlValue: 220_000, nativeValue: 16},
            {controlValue: 200_000, nativeValue: 15},
            {controlValue: 180_000, nativeValue: 14},
            {controlValue: 160_000, nativeValue: 13},
            {controlValue: 140_000, nativeValue: 12},
            {controlValue: 120_000, nativeValue: 11},
            {controlValue: 100_000, nativeValue: 10},
            {controlValue: 90_500, nativeValue: 9},
            {controlValue: 81_000, nativeValue: 8},
            {controlValue: 71_500, nativeValue: 7},
            {controlValue: 62_000, nativeValue: 6},
            {controlValue: 52_500, nativeValue: 5},
            {controlValue: 43_000, nativeValue: 4},
            {controlValue: 33_500, nativeValue: 3},
            {controlValue: 24_000, nativeValue: 2},
            {controlValue: 14_500, nativeValue: 1},
            {controlValue: 5_000, nativeValue: 0},
        ] as const;

        for (const {controlValue, nativeValue} of controlNativeValuesMap) {
            it(`${controlValue} => ${nativeValue}/30`, () => {
                testComponent.control = new FormControl(controlValue);
                fixture.detectChanges();

                expect(testComponent.inputElRef.nativeElement.value).toBe(
                    `${nativeValue}`,
                );
            });
        }
    });

    describe("makes correct approximation for native input value on initial values (which don't satisfy input's steps)", () => {
        const testsConditions = [
            {controlValue: 999_999, expectedNativeValue: 30},
            {controlValue: 945_000, expectedNativeValue: 29},
            {controlValue: 850_000, expectedNativeValue: 28},
            {controlValue: 790_001, expectedNativeValue: 27},
            {controlValue: 649_999, expectedNativeValue: 25},
            {controlValue: 545_001, expectedNativeValue: 24},
            {controlValue: 545_000, expectedNativeValue: 24},
            {controlValue: 544_999, expectedNativeValue: 23},
            {controlValue: 200_300, expectedNativeValue: 15},
            {controlValue: 172_040, expectedNativeValue: 14},
            {controlValue: 64_000, expectedNativeValue: 6},
            {controlValue: 50_500, expectedNativeValue: 5},
            {controlValue: 12_500, expectedNativeValue: 1},
        ] as const;

        for (const {controlValue, expectedNativeValue} of testsConditions) {
            it(`${controlValue} => ${expectedNativeValue}/30`, () => {
                testComponent.control = new FormControl(controlValue);
                fixture.detectChanges();

                expect(testComponent.inputElRef.nativeElement.value).toBe(
                    `${expectedNativeValue}`,
                );
            });
        }
    });

    describe("works with float numbers (even if value doesn't satisfy input's steps)", () => {
        beforeEach(() => {
            testComponent.control = new FormControl(null);
            testComponent.keySteps = [
                [0, 0],
                [25, 0.5],
                [50, 0.9],
                [75, 0.99],
                [100, 1],
            ];
            testComponent.max = 100;
            fixture.detectChanges();
        });

        const testsConditions = [
            // Q1 (every step increase by 0.02 control value)
            {controlValue: 0.11, expectedNativeValue: 6},
            {controlValue: 0.221, expectedNativeValue: 11},
            {controlValue: 0.322, expectedNativeValue: 16},
            {controlValue: 0.433, expectedNativeValue: 22},

            // Q2 (every step increase by 0.016 control value)
            {controlValue: 0.54, expectedNativeValue: 28},
            {controlValue: 0.64, expectedNativeValue: 34},
            {controlValue: 0.78, expectedNativeValue: 43},

            // Q3 (every step increase by 0.0036 control value)
            {controlValue: 0.901, expectedNativeValue: 50},
            {controlValue: 0.912, expectedNativeValue: 53},
            {controlValue: 0.925, expectedNativeValue: 57},

            // Q4 (every step increase by 0.0004 control value)
            {controlValue: 0.99, expectedNativeValue: 75},
            {controlValue: 0.991, expectedNativeValue: 78},
            {controlValue: 0.992, expectedNativeValue: 80},
            {controlValue: 0.993, expectedNativeValue: 83},
            {controlValue: 0.994, expectedNativeValue: 85},
            {controlValue: 0.999, expectedNativeValue: 98},
            {controlValue: 0.9995, expectedNativeValue: 99},
            {controlValue: 1, expectedNativeValue: 100},
        ] as const;

        for (const {controlValue, expectedNativeValue} of testsConditions) {
            it(`${controlValue} => ${expectedNativeValue}/100`, () => {
                testComponent.control = new FormControl(controlValue);
                fixture.detectChanges();

                expect(testComponent.inputElRef.nativeElement.value).toBe(
                    `${expectedNativeValue}`,
                );
            });
        }
    });
});