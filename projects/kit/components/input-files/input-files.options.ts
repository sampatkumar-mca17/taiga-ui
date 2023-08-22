import {Provider} from '@angular/core';
import {tuiCreateToken, tuiProvideOptions} from '@taiga-ui/cdk';
import {TuiSizeL} from '@taiga-ui/core';

export interface TuiInputFilesOptions {
    /**
     * @description:
     * user - The user-facing camera and/or microphone should be used.
     * environment - The outward-facing camera and/or microphone should be used
     */
    capture: 'environment' | 'user' | null;
    accepts: string;
    multiple: boolean;
    size: TuiSizeL;
    maxFileSize: number;
}

export const TUI_INPUT_FILES_DEFAULT_OPTIONS: TuiInputFilesOptions = {
    capture: null,
    accepts: ``,
    multiple: false,
    size: `m`,
    maxFileSize: 30 * 1024 * 1024, // 30 MiB
};

/**
 * Default parameters for input files component
 */
export const TUI_INPUT_FILES_OPTIONS = tuiCreateToken(TUI_INPUT_FILES_DEFAULT_OPTIONS);

export function tuiInputFilesOptionsProvider(
    options: Partial<TuiInputFilesOptions>,
): Provider {
    return tuiProvideOptions(
        TUI_INPUT_FILES_OPTIONS,
        options,
        TUI_INPUT_FILES_DEFAULT_OPTIONS,
    );
}
