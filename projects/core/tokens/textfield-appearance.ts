import {tuiCreateToken} from '@taiga-ui/cdk';
import {TuiAppearance} from '@taiga-ui/core/enums';

/**
 * Appearance for inputs
 * @deprecated use {@link TUI_TEXTFIELD_APPEARANCE_DIRECTIVE} instead
 * TODO: Remove in 4.0
 */
export const TUI_TEXTFIELD_APPEARANCE = tuiCreateToken<string>(TuiAppearance.Textfield);
