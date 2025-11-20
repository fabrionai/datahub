import { colors } from '@components/theme';

const radioBorderColors = {
    default: colors.gray[400],
    disabled: colors.gray[300],
    error: colors.red[500],
};

const radioCheckmarkColors = {
    default: colors.white,
    disabled: colors.gray[300],
    error: colors.red[500],
};

export function getRadioBorderColor(disabled: boolean, error: string) {
    if (disabled) return radioBorderColors.disabled;
    if (error) return radioCheckmarkColors.error;
    return radioBorderColors.default;
}

export function getRadioCheckmarkColor(checked: boolean, disabled: boolean, error: string, primaryColor?: string) {
    if (disabled) return radioCheckmarkColors.disabled;
    if (error) return radioCheckmarkColors.error;
    if (checked) return primaryColor || colors.violet[500]; // Use theme primary color or fallback to violet
    return radioCheckmarkColors.default;
}
