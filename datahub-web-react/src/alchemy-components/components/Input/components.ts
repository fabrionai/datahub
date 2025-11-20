import styled from 'styled-components';

import type { InputProps } from '@components/components/Input/types';
import {
    INPUT_MAX_HEIGHT,
    formLabelTextStyles,
    inputPlaceholderTextStyles,
    inputValueTextStyles,
} from '@components/components/commonStyles';
import theme, { borders, colors, radius, spacing, typography } from '@components/theme';
import { getStatusColors } from '@components/theme/utils';

const defaultFlexStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const defaultMessageStyles = {
    marginTop: spacing.xxsm,
    fontSize: typography.fontSizes.sm,
};

export const InputWrapper = styled.div({
    ...defaultFlexStyles,
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '100%',
});

export const InputContainer = styled.div<InputProps>`
    ${({ isSuccess, warning, isDisabled, isInvalid, theme }) => `
        border: ${borders['1px']} ${getStatusColors(isSuccess, warning, isInvalid)};
        background-color: ${isDisabled ? (theme.colors?.bgSurface || colors.gray[1500]) : (theme.colors?.bgSurface || colors.white)};
        padding-right: ${spacing.md};
    `}
    ${defaultFlexStyles}
    width: 100%;
    max-height: ${INPUT_MAX_HEIGHT};
    overflow: hidden;
    border-radius: ${radius.md};
    flex: 1;
    color: ${(props) => props.theme.colors?.icon || colors.gray[400]};

    &:focus-within {
        border-color: ${(props) => props.theme.colors?.primary || colors.violet[200]};
        outline: ${borders['1px']} ${(props) => props.theme.colors?.primary || colors.violet[200]};
    }
`;

export const InputField = styled.input`
    padding: ${spacing.sm} ${spacing.md};
    line-height: ${typography.lineHeights.normal};
    max-height: ${INPUT_MAX_HEIGHT};
    border: ${borders.none};
    width: 100%;
    font-family: ${typography.fonts.body};
    font-weight: ${typography.fontWeights.normal};
    font-size: ${typography.fontSizes.md};
    color: ${(props) => props.theme.colors?.text || colors.gray[700]};
    background-color: ${(props) => props.theme.colors?.bgSurface || colors.white};

    &::placeholder {
        font-family: ${typography.fonts.body};
        font-weight: ${typography.fontWeights.normal};
        font-size: ${typography.fontSizes.md};
        color: ${(props) => props.theme.colors?.textSecondary || colors.gray[400]};
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: ${(props) => props.theme.colors?.bgSurface || colors.gray[1500]};
    }
`;

export const Required = styled.span({
    color: colors.red[500],
});

export const Label = styled.div`
    font-weight: ${typography.fontWeights.normal};
    font-size: ${typography.fontSizes.md};
    color: ${(props) => props.theme.colors?.text || colors.gray[600]};
    margin-bottom: ${spacing.xsm};
    text-align: left;
`;

export const ErrorMessage = styled.div({
    ...defaultMessageStyles,
    color: theme.semanticTokens.colors.error,
});

export const WarningMessage = styled.div({
    ...defaultMessageStyles,
    color: theme.semanticTokens.colors.warning,
});

export const HelperText = styled.div`
    ${defaultMessageStyles}
    color: ${(props) => props.theme.colors?.textSecondary || colors.gray[600]};
`;
