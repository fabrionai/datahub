import styled from 'styled-components';

import { Icon, IconNames } from '@components/components/Icon';
import { TextAreaProps } from '@components/components/TextArea/types';
import {
    formLabelTextStyles,
    inputPlaceholderTextStyles,
    inputValueTextStyles,
} from '@components/components/commonStyles';
import theme, { borders, colors, radius, sizes, spacing, typography } from '@components/theme';
import { getStatusColors } from '@components/theme/utils';

const minHeight = '100px';

const defaultFlexStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
};

const defaultMessageStyles = {
    marginTop: spacing.xxsm,
    fontSize: typography.fontSizes.sm,
};

export const TextAreaWrapper = styled.div({
    ...defaultFlexStyles,
    flexDirection: 'column',
    width: '100%',
});

export const StyledIcon = styled(Icon)({
    minWidth: '16px',
    paddingLeft: spacing.sm,
    marginTop: spacing.sm,
});

export const TextAreaContainer = styled.div<TextAreaProps>`
    ${({ isSuccess, warning, isDisabled, isInvalid, theme }) => `
        border: ${borders['1px']} ${getStatusColors(isSuccess, warning, isInvalid)};
        background-color: ${isDisabled ? (theme.colors?.bgSurface || colors.gray[1500]) : (theme.colors?.bgSurface || colors.white)};
        position: relative;
        min-width: 160px;
        min-height: ${minHeight};
        width: ${sizes.full};
        border-radius: ${radius.md};
        flex: 1;
        color: ${theme.colors?.icon || colors.gray[400]};
        display: ${defaultFlexStyles.display};
        justify-content: ${defaultFlexStyles.justifyContent};
        align-items: ${defaultFlexStyles.alignItems};

        &:focus-within {
            border-color: ${theme.styles?.['primary-color'] || colors.violet[200]};
            outline: ${borders['1px']} ${theme.styles?.['primary-color'] || colors.violet[200]};
        }
    `}
`;

export const TextAreaField = styled.textarea<{ icon?: IconNames }>`
    padding: ${spacing.sm} ${spacing.md};
    border-radius: ${radius.md};
    border: ${borders.none};
    width: 100%;
    min-height: ${minHeight};
    ${inputValueTextStyles()}
    color: ${(props) => props.theme.colors?.text || colors.gray[700]};
    background-color: ${(props) => props.theme.colors?.bgSurface || colors.white};

    ${({ icon }) => icon && `padding-left: ${spacing.xsm};`}

    &:focus {
        outline: none;
    }

    &::placeholder {
        ${inputPlaceholderTextStyles}
        color: ${(props) => props.theme.colors?.textSecondary || colors.gray[400]};
    }

    &:disabled {
        background-color: ${(props) => props.theme.colors?.bgSurface || colors.gray[1500]};
    }
`;

export const Label = styled.div`
    font-weight: ${typography.fontWeights.normal};
    font-size: ${typography.fontSizes.md};
    color: ${(props) => props.theme.colors?.text || colors.gray[600]};
    margin-bottom: ${spacing.xxsm};
    text-align: left;
`;

export const Required = styled.span({
    color: colors.red[500],
});

export const ErrorMessage = styled.div({
    ...defaultMessageStyles,
    color: theme.semanticTokens.colors.error,
});

export const WarningMessage = styled.div({
    ...defaultMessageStyles,
    color: theme.semanticTokens.colors.warning,
});

export const StyledStatusIcon = styled(Icon)({
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
});
