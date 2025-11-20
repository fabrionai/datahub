import styled from 'styled-components';

import { colors, radius, spacing, typography } from '@src/alchemy-components/theme';
import { IconAlignmentOptions } from '@src/alchemy-components/theme/config';

export const CardContainer = styled.div<{ isClickable?: boolean; width?: string; maxWidth?: string; height?: string }>`
    border: 1px solid ${({ theme }) => theme.colors?.border || colors.gray[100]};
    border-radius: ${radius.lg};
    padding: ${spacing.md};
    display: flex;
    flex: ${({ maxWidth }) => (maxWidth ? `1 1 ${maxWidth}` : '1 1 auto')};
    min-width: 150px;
    box-shadow: 0px 1px 2px 0px rgba(33, 23, 95, 0.07);
    background-color: ${({ theme }) => theme.colors?.bgSurface || colors.white};
    flex-direction: column;
    gap: ${spacing.md};
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
    ${({ width }) => width && `width: ${width};`}
    ${({ height }) => height && `height: ${height};`}

    ${({ isClickable, theme }) =>
        isClickable &&
        `
        &:hover {
            border: 1px solid ${theme.styles['primary-color']};
            cursor: pointer;
        }
    `}
`;

export const Header = styled.div<{ iconAlignment?: IconAlignmentOptions }>(({ iconAlignment }) => ({
    display: 'flex',
    flexDirection: iconAlignment === 'horizontal' ? 'row' : 'column',
    alignItems: iconAlignment === 'horizontal' ? 'center' : 'start',
    gap: spacing.sm,
    width: '100%',
}));

export const TitleContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    width: '100%',
});

export const Title = styled.div<{ $isEmpty?: boolean }>`
    font-size: ${typography.fontSizes.lg};
    font-weight: ${typography.fontWeights.bold};
    color: ${({ $isEmpty, theme }) =>
        $isEmpty ? theme.colors?.textDisabled || colors.gray[1800] : theme.colors?.text || colors.gray[600]};
    display: flex;
    align-items: center;
    gap: ${spacing.xsm};
`;

export const SubTitleContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const SubTitle = styled.div`
    font-size: ${typography.fontSizes.md};
    font-weight: ${typography.fontWeights.normal};
    color: ${({ theme }) => theme.colors?.textSecondary || colors.gray[1700]};
`;
