import { Button } from '@components';
import { Checkbox } from 'antd';
import styled from 'styled-components';

import { Icon } from '@components/components/Icon';
import { SelectLabelVariants, SelectSizeOptions, SelectStyleProps } from '@components/components/Select/types';
import {
    getDropdownStyle,
    getOptionLabelStyle,
    getSelectFontStyles,
    getSelectStyle,
} from '@components/components/Select/utils';
import {
    formLabelTextStyles,
    inputPlaceholderTextStyles,
    inputValueTextStyles,
} from '@components/components/commonStyles';
import { colors, radius, shadows, spacing, transition, typography, zIndices } from '@components/theme';

const sharedTransition = `${transition.property.colors} ${transition.easing['ease-in-out']} ${transition.duration.normal}`;

/**
 * Base Select component styling
 */
export const SelectBase = styled.div<SelectStyleProps>(
    ({ isDisabled, isReadOnly, fontSize, isOpen, width, position, theme }) => ({
        ...getSelectStyle({ isDisabled, isReadOnly, fontSize, isOpen }),
        display: 'flex',
        flexDirection: 'row' as const,
        gap: spacing.xsm,
        transition: sharedTransition,
        justifyContent: 'space-between',
        alignSelf: position || 'end',
        minHeight: '36px',
        alignItems: 'center',
        overflow: 'auto',
        textWrapMode: 'nowrap',
        backgroundColor: isDisabled ? (theme.colors?.bgSurface || colors.gray[1500]) : (theme.colors?.bgSurface || colors.white),
        color: theme.colors?.text || colors.gray[600],
        width: width === 'full' ? '100%' : 'max-content',
        // Override outline color when open to use theme primary color
        ...(isOpen ? {
            outline: `1px solid ${theme.styles?.['primary-color'] || colors.violet[200]}`,
        } : {}),
    }),
);

export const SelectLabelContainer = styled.div({
    display: 'flex',
    flexDirection: 'row' as const,
    gap: spacing.xsm,
    lineHeight: typography.lineHeights.none,
    alignItems: 'center',
    maxWidth: 'calc(100% - 10px)',
});

/**
 * Styled components specific to the Basic version of the Select component
 */

// Container for the Basic Select component
interface ContainerProps {
    size: SelectSizeOptions;
    width?: number | 'full' | 'fit-content';
    $selectLabelVariant?: SelectLabelVariants;
    isSelected?: boolean;
}

export const Container = styled.div<ContainerProps>(({ size, width, $selectLabelVariant, isSelected }) => {
    const getMinWidth = () => {
        if (width === 'fit-content') return 'undefined';
        if ($selectLabelVariant === 'labeled') {
            return isSelected ? '145px' : '103px';
        }
        return '175px';
    };

    const getWitdh = () => {
        switch (width) {
            case 'full':
                return '100%';
            case 'fit-content':
                return 'fit-content';
            default:
                return `${width}px`;
        }
    };

    return {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: getWitdh(),
        gap: '4px',
        transition: sharedTransition,
        minWidth: getMinWidth(),
        ...getSelectFontStyles(size),
        ...inputValueTextStyles(size),
    };
});

export const DropdownContainer = styled.div<{ ignoreMaxHeight?: boolean }>`
    ${({ ignoreMaxHeight, theme }) => `
        ${getDropdownStyle()};
        border-radius: ${radius.md};
        background: ${theme.colors?.bgSurface || colors.white};
        z-index: ${zIndices.dropdown};
        transition: ${sharedTransition};
        box-shadow: ${shadows.dropdown};
        padding: ${spacing.xsm};
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 4px;
        overflow: auto;
        width: 100%;
        max-height: ${ignoreMaxHeight ? 'none' : '360px'};
    `}
`;

// Styled components for SelectValue (Selected value display)
export const SelectValue = styled.span`
    ${inputValueTextStyles()}
    color: ${(props) => props.theme.colors?.text || colors.gray[600]};
`;

export const Placeholder = styled.span`
    ${inputPlaceholderTextStyles}
    color: ${(props) => props.theme.colors?.textSecondary || colors.gray[1800]};
`;

export const ActionButtonsContainer = styled.div({
    display: 'flex',
    gap: '6px',
    flexDirection: 'row',
    alignItems: 'center',
});

/**
 * Components that can be reused to create new Select variants
 */

export const OptionList = styled.div({
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'auto',
});

export const LabelContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    gap: '12px',
});

export const OptionContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
});

export const DescriptionContainer = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    color: ${(props) => props.theme.colors?.textSecondary || colors.gray[500]};
    line-height: normal;
    font-size: ${typography.fontSizes.sm};
    margin-top: ${spacing.xxsm};
`;

export const LabelsWrapper = styled.div<{ shouldShowGap?: boolean }>(({ shouldShowGap = false }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: shouldShowGap ? spacing.xxsm : '0px',
    maxHeight: '150px',
    maxWidth: '100%',
}));

export const OptionLabel = styled.label<{
    isSelected: boolean;
    isMultiSelect?: boolean;
    isDisabled?: boolean;
    applyHoverWidth?: boolean;
}>(({ isSelected, isMultiSelect, isDisabled, applyHoverWidth }) => ({
    ...getOptionLabelStyle(isSelected, isMultiSelect, isDisabled, applyHoverWidth),
}));

export const SelectLabel = styled.label`
    font-weight: ${typography.fontWeights.normal};
    font-size: ${typography.fontSizes.md};
    color: ${(props) => props.theme.colors?.text || colors.gray[600]};
    margin-bottom: ${spacing.xxsm};
    text-align: left;
`;

export const StyledIcon = styled(Icon)`
    flex-shrink: 0;
    color: ${(props) => props.theme.colors?.icon || colors.gray[1800]};
`;

export const StyledClearButton = styled(Button).attrs({
    variant: 'text',
})`
    color: ${(props) => props.theme.colors?.icon || colors.gray[1800]};
    padding: 0px;

    &:hover {
        border: none;
        background-color: ${colors.transparent};
        border-color: ${colors.transparent};
        box-shadow: ${shadows.none};
    }

    &:focus {
        border: none;
        background-color: ${colors.transparent};
        box-shadow: 0 0 0 2px ${(props) => props.theme.colors?.bgSurface || colors.white}, 0 0 0 4px ${(props) => props.theme.styles?.['primary-color'] || colors.violet[50]};
    }
`;

export const ClearIcon = styled.span({
    cursor: 'pointer',
    marginLeft: '8px',
});

export const ArrowIcon = styled.span<{ isOpen: boolean }>`
    margin-left: auto;
    border: solid ${(props) => props.theme.colors?.text || 'black'};
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    transform: ${(props) => props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
`;

export const StyledCheckbox = styled(Checkbox)({
    '.ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner': {
        backgroundColor: `${(props) => props.theme.styles['primary-color']}`,
        borderColor: `${(props) => props.theme.styles['primary-color']} !important`,
    },
});

export const StyledBubbleButton = styled(Button)`
    background-color: ${(props) => props.theme.colors?.bgHover || colors.gray[200]};
    border: 1px solid ${(props) => props.theme.colors?.border || colors.gray[200]};
    color: ${(props) => props.theme.colors?.text || colors.black};
    padding: 1px;
`;

export const HighlightedLabel = styled.span`
    background-color: ${(props) => props.theme.colors?.bgHover || colors.gray[100]};
    padding: 4px 6px;
    border-radius: 8px;
    font-size: ${typography.fontSizes.sm};
    color: ${(props) => props.theme.colors?.textSecondary || colors.gray[500]};
`;
