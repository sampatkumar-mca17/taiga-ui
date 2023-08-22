import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CHAR_HYPHEN, CHAR_MINUS} from '@taiga-ui/cdk';
import {TuiInputRangeComponent, TuiInputRangeModule} from '@taiga-ui/kit';
import {configureTestSuite, TuiNativeInputPO, TuiPageObject} from '@taiga-ui/testing';

describe(`InputRange`, () => {
    @Component({
        template: `
            <tui-input-range
                *ngIf="default"
                [formControl]="control"
            ></tui-input-range>
            <tui-input-range
                *ngIf="!default"
                [formControl]="control"
                [max]="max"
                [min]="min"
                [pluralize]="pluralize"
                [quantum]="quantum"
                [readOnly]="readOnly"
                [steps]="steps"
            ></tui-input-range>
        `,
    })
    class TestComponent {
        @ViewChild(TuiInputRangeComponent, {static: true})
        component!: TuiInputRangeComponent;

        control = new FormControl([0, 1]);
        default = false;
        max = 10;
        min = -10;
        quantum = 5;
        readOnly = false;
        steps = 0;
        pluralize = {one: `год`, few: `года`, many: `лет`, other: `лет`};
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let pageObject: TuiPageObject<TestComponent>;

    let leftInputWrapper: DebugElement;
    let rightInputWrapper: DebugElement;

    let inputPOLeft: TuiNativeInputPO;
    let inputPORight: TuiNativeInputPO;

    const testContext = {
        get prefix() {
            return `tui-input-range__`;
        },
        get nativeInputAutoId() {
            return `tui-primitive-textfield__native-input`;
        },
        get valueContentAutoId() {
            return `tui-primitive-textfield__value`;
        },
        get valueDecorationAutoId() {
            return `tui-primitive-textfield__value-decoration`;
        },
    };

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [TuiInputRangeModule, ReactiveFormsModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        pageObject = new TuiPageObject(fixture);
        testComponent = fixture.componentInstance;

        fixture.detectChanges();
        await fixture.whenStable();

        initializeInputsPO();
    });

    describe(`Default values`, () => {
        beforeEach(() => {
            testComponent.default = true;
            fixture.autoDetectChanges();

            initializeInputsPO();
        });

        it(`[leftValueContent] is missing`, () => {
            expect(getLeftValueContent()).toBeNull();
        });

        it(`[rightValueContent] is missing`, () => {
            testComponent.control.setValue([0, 10]);
            fixture.detectChanges();

            expect(getRightValueContent()).toBeNull();
        });

        it(`Plural signature missing`, () => {
            expect(getLeftValueContent()).toBeNull();
            expect(getRightValueContent()).toBeNull();
        });
    });

    describe(`Labels`, () => {
        beforeEach(() => fixture.autoDetectChanges());

        it(`Plural signature is present`, () => {
            expect(getLeftValueDecoration()).toContain(`лет`);
            expect(getRightValueDecoration()).toContain(`год`);
        });

        it(`[rightValueContent] missing on focus`, () => {
            testComponent.control.setValue([-10, 10]);
            inputPORight.focus();

            expect(getRightValueContent()).toBeNull();
            expect(getRightValueDecoration()).toBe(`10 лет`);
        });
    });

    describe(`quantum`, () => {
        beforeEach(() => fixture.autoDetectChanges());

        it(`Rounds the left value to the nearest quantum on loss of focus`, () => {
            inputPOLeft.sendTextAndBlur(`-7`);

            expect(testComponent.control.value[0]).toBe(-5);
        });

        it(`Rounds the left value of an input field to the nearest quantum when focus is lost`, () => {
            inputPOLeft.sendTextAndBlur(`-7`);

            expect(inputPOLeft.value).toBe(`${CHAR_MINUS}5 лет`);
        });

        it(`Rounds the right value to the nearest quantum on loss of focus`, () => {
            inputPORight.sendTextAndBlur(`7`);

            expect(testComponent.control.value[1]).toBe(5);
        });

        it(`Rounds the right value of an input field to the nearest quantum on loss of focus`, () => {
            inputPORight.sendTextAndBlur(`7`);

            expect(inputPORight.value).toBe(`5 лет`);
        });
    });

    describe(`Deleting Values`, () => {
        beforeEach(() => fixture.autoDetectChanges());

        it(`Doesn't change value when left content is removed`, () => {
            inputPOLeft.sendTextAndBlur(`-5`);
            inputPOLeft.sendTextAndBlur(``);

            expect(testComponent.control.value[0]).toBe(-5);
            expect(inputPOLeft.value).toBe(`${CHAR_MINUS}5 лет`);
        });

        it(`Doesn't change value when deleting right content`, () => {
            inputPORight.sendTextAndBlur(`5`);
            inputPORight.sendTextAndBlur(``);

            expect(testComponent.control.value[1]).toBe(5);
            expect(inputPORight.value).toBe(`5 лет`);
        });
    });

    describe(`Changing values`, () => {
        beforeEach(() => fixture.autoDetectChanges());

        it(`Prevents the left value from exceeding the right value when typing`, () => {
            inputPORight.sendTextAndBlur(`5`);
            inputPOLeft.sendTextAndBlur(`123`);

            expect(testComponent.control.value[0]).toBe(testComponent.control.value[1]);
            expect(inputPOLeft.value).toBe(
                `${testComponent.control.value[1].toString()} лет`,
            );
        });

        it(`Prevents the right value from becoming less than the left value when leaving the field`, () => {
            inputPOLeft.sendTextAndBlur(`-5`);
            fixture.detectChanges();

            inputPORight.sendTextAndBlur(`-10`);

            expect(testComponent.control.value[1]).toBe(testComponent.control.value[0]);
            expect(inputPORight.value).toBe(
                `${testComponent.control.value[0]
                    .toString()
                    .replace(CHAR_HYPHEN, CHAR_MINUS)} лет`,
            );
        });
    });

    describe(`Format`, () => {
        beforeEach(() => {
            testComponent.max = 100000;
            testComponent.quantum = 0.01;
            fixture.autoDetectChanges();
            inputPORight.sendTextAndBlur(`12345.67`);
        });

        it(`Formats input`, () => {
            expect(inputPORight.value).toBe(`12 345,67 лет`);
        });

        it(`Doesn't format the value`, () => {
            expect(testComponent.control.value[1]).toBe(12345.67);
        });
    });

    describe(`Arrows`, () => {
        beforeEach(() => {
            testComponent.min = 0;
            testComponent.max = 10;
            testComponent.quantum = 1;
            testComponent.control.setValue([2, 6]);
            fixture.autoDetectChanges();
        });

        describe(`readOnly`, () => {
            beforeEach(() => {
                testComponent.readOnly = true;
                fixture.detectChanges();
            });

            it(`The up arrow on the left margin does not increase the value`, () => {
                inputPOLeft.sendKeydown(`arrowUp`);

                expect(testComponent.control.value[0]).toBe(2);
            });

            it(`Down arrow on left margin does not decrease value`, () => {
                inputPOLeft.sendKeydown(`arrowDown`);

                expect(testComponent.control.value[0]).toBe(2);
            });

            it(`The up arrow on the right margin does not increase the value`, () => {
                inputPORight.sendKeydown(`arrowUp`);

                expect(testComponent.control.value[1]).toBe(6);
            });

            it(`Down arrow on right margin does not decrease value`, () => {
                inputPORight.sendKeydown(`arrowDown`);

                expect(testComponent.control.value[1]).toBe(6);
            });
        });

        describe(`Quantum`, () => {
            beforeEach(() => fixture.autoDetectChanges());

            it(`The up arrow on the left margin increases start by a quantum`, () => {
                inputPOLeft.sendKeydown(`arrowUp`);

                expect(testComponent.control.value[0]).toBe(3);
            });

            it(`The down arrow on the left margin decreases start by a quantum`, () => {
                inputPOLeft.sendKeydown(`arrowDown`);

                expect(testComponent.control.value[0]).toBe(1);
            });

            it(`The up arrow on the right margin increases end by a quantum`, () => {
                inputPORight.sendKeydown(`arrowUp`);

                expect(testComponent.control.value[1]).toBe(7);
            });

            it(`The down arrow on the right margin decreases end by a quantum`, () => {
                inputPORight.sendKeydown(`arrowDown`);

                expect(testComponent.control.value[1]).toBe(5);
            });
        });

        describe(`Steps`, () => {
            beforeEach(() => {
                testComponent.steps = 5;
                fixture.autoDetectChanges();
            });

            it(`The up arrow on the left margin increases start by one step`, () => {
                inputPOLeft.sendKeydown(`arrowUp`);

                expect(testComponent.control.value[0]).toBe(4);
            });

            it(`Down arrow on the left margin decreases start by one step`, () => {
                inputPOLeft.sendKeydown(`arrowDown`);

                expect(testComponent.control.value[0]).toBe(0);
            });

            it(`The up arrow on the right margin increases end by one step`, () => {
                inputPORight.sendKeydown(`arrowUp`);

                expect(testComponent.control.value[1]).toBe(8);
            });

            it(`Down arrow on the right margin decreases end by one step`, () => {
                inputPORight.sendKeydown(`arrowDown`);

                expect(testComponent.control.value[1]).toBe(4);
            });
        });

        describe(`Limitations`, () => {
            beforeEach(() => fixture.autoDetectChanges());

            it(`The up arrow on the left margin does not increase start to a value greater than end`, () => {
                testComponent.control.setValue([6, 6]);
                inputPOLeft.sendKeydown(`arrowUp`);

                expect(testComponent.control.value[0]).toBe(6);
            });

            it(`The down arrow on the left margin does not decrease start to a value less than min`, () => {
                testComponent.control.setValue([0, 6]);
                inputPOLeft.sendKeydown(`arrowDown`);

                expect(testComponent.control.value[0]).toBe(0);
            });

            it(`The up arrow on the right margin does not increase end to a value greater than max`, () => {
                testComponent.control.setValue([6, 10]);
                inputPORight.sendKeydown(`arrowUp`);

                expect(testComponent.control.value[1]).toBe(10);
            });

            it(`The down arrow on the right margin does not decrease end to a value less than start`, () => {
                testComponent.control.setValue([6, 6]);
                inputPORight.sendKeydown(`arrowDown`);

                expect(testComponent.control.value[1]).toBe(6);
            });

            it(`Keyboard input does not exceed max`, () => {
                inputPORight.sendText(`12345`);

                expect(inputPORight.value).toBe(`10 лет`);
            });

            it(`Keyboard input does not exceed min`, () => {
                testComponent.min = -10;
                inputPOLeft.sendText(`-123`);

                expect(inputPOLeft.value).toBe(`${CHAR_MINUS}10 лет`);
            });

            it(`Keyboard input does not go beyond value[1]`, () => {
                inputPOLeft.sendText(`12345`);

                expect(inputPOLeft.value).toBe(`6 лет`);
            });

            it(`Keyboard input does not output value[1] beyond value[0]`, () => {
                inputPORight.sendText(`1`);

                expect(inputPORight.value).toBe(
                    `1 лет`, // this plural form is expected because it is intermediate state and form control is not updated yet
                );
                expect(testComponent.control.value[1]).toBe(6);
            });
        });
    });

    function getLeftValueContent(): string | null {
        const valueContent = pageObject.getByAutomationId(
            testContext.valueContentAutoId,
            leftInputWrapper,
        );

        return valueContent?.nativeElement.textContent.trim() || null;
    }

    function getRightValueContent(): string | null {
        const valueContent = pageObject.getByAutomationId(
            testContext.valueContentAutoId,
            rightInputWrapper,
        );

        return valueContent?.nativeElement.textContent.trim() || null;
    }

    function getLeftValueDecoration(): string {
        return pageObject
            .getByAutomationId(testContext.valueDecorationAutoId, leftInputWrapper)
            ?.nativeElement.textContent.trim()
            .replace(`\n `, ``);
    }

    function getRightValueDecoration(): string {
        return pageObject
            .getByAutomationId(testContext.valueDecorationAutoId, rightInputWrapper)
            ?.nativeElement.textContent.trim()
            .replace(`\n `, ``);
    }

    function initializeInputsPO(): void {
        leftInputWrapper = pageObject.getByAutomationId(`tui-input-range__left-input`)!;
        rightInputWrapper = pageObject.getByAutomationId(`tui-input-range__right-input`)!;

        inputPOLeft = new TuiNativeInputPO(
            fixture,
            testContext.nativeInputAutoId,
            leftInputWrapper,
        );
        inputPORight = new TuiNativeInputPO(
            fixture,
            testContext.nativeInputAutoId,
            rightInputWrapper,
        );
    }
});
