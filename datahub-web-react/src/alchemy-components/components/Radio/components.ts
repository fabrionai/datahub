import styled from 'styled-components';

import { getRadioBorderColor, getRadioCheckmarkColor } from '@components/components/Radio/utils';
import { borders, colors, radius, spacing, typography } from '@components/theme';

export const RadioWrapper = styled.div<{ disabled: boolean; error: string }>(({ disabled, error, theme }) => ({
    position: 'relative',
    margin: '20px',
    width: '20px',
    height: '20px',
    border: `${borders['2px']} ${getRadioBorderColor(disabled, error)}`,
    backgroundColor: theme.colors?.bgSurface || colors.white,
    borderRadius: radius.full,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: '40px',
    cursor: !disabled ? 'pointer' : 'none',
    transition: 'border 0.3s ease, outline 0.3s ease',
    '&:hover': {
        border: `${borders['2px']} ${!disabled && !error ? theme.styles['primary-color'] : getRadioBorderColor(disabled, error)}`,
        outline: !disabled && !error ? `${borders['2px']} ${theme.colors?.border || colors.gray[200]}` : 'none',
    },
}));

export const RadioBase = styled.div({});

export const Label = styled.div`
    font-weight: ${typography.fontWeights.normal};
    font-size: ${typography.fontSizes.md};
    color: ${(props) => props.theme.colors?.text || colors.gray[600]};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RadioLabel = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const Required = styled.span({
    color: colors.red[500],
    marginLeft: spacing.xxsm,
});

export const RadioHoverState = styled.div({
    border: `${borders['2px']} ${(props) => props.theme.styles['primary-color']}`,
    width: 'calc(100% - -3px)',
    height: 'calc(100% - -3px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.full,
});

export const Checkmark = styled.div<{ checked: boolean; disabled: boolean; error: string }>(
    ({ checked, disabled, error, theme }) => ({
        width: 'calc(100% - 6px)',
        height: 'calc(100% - 6px)',
        borderRadius: radius.full,
        background: getRadioCheckmarkColor(checked, disabled, error, theme.styles?.['primary-color']),
        display: checked ? 'inline-block' : 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }),
);

export const HiddenInput = styled.input<{ checked: boolean }>({
    opacity: 0,
    width: '20px',
    height: '20px',
});

export const RadioGroupContainer = styled.div<{ isVertical?: boolean }>(({ isVertical }) => ({
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: !isVertical ? spacing.md : spacing.none,
    margin: !isVertical ? spacing.xxsm : spacing.none,
}));
