import { Button, Typography } from 'antd';
import styled from 'styled-components';

import { getColor } from '@components/theme/utils';

import { ANTD_GRAY } from '@app/entity/shared/constants';
import { REDESIGN_COLORS } from '@app/entityV2/shared/constants';

export const SearchFilterLabel = styled(Button)<{ $isActive: boolean }>`
    font-size: 14px;
    font-weight: 700;
    border: 1px solid ${(props) => props.theme.colors?.border || '#d9d9d9'};
    border-radius: 8px;
    display: flex;
    align-items: center;
    box-shadow: none;
    color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'};

    &:hover {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
        background-color: ${(props) => props.theme.colors?.bgHover || '#fafafa'};
        border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
    }

    ${(props) =>
        props.$isActive &&
        `
        background-color: ${props.theme.styles['primary-color']};
        border: 1px solid ${getColor('primary', 0, props.theme)};
        color: white;

        &:hover {
            color: white;
            background-color: ${props.theme.styles['primary-color']};
            border-color: ${getColor('primary', 0, props.theme)};
        }
    `}
`;

export const MoreFilterOptionLabel = styled.div<{ $isActive: boolean; isOpen?: boolean }>`
    padding: 5px 12px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};

    &:hover {
        background-color: ${(props) => props.theme.colors?.bgHover || ANTD_GRAY[3]};
    }

    ${(props) => props.$isActive && `color: ${props.theme.styles['primary-color']};`}
    ${(props) => props.isOpen && `background-color: ${props.theme.colors?.bgHover || ANTD_GRAY[3]};`}
`;

export const TextButton = styled(Button)<{ marginTop?: number; height?: number }>`
    color: ${(p) => p.theme.styles['primary-color']};
    padding: 0px 6px;
    margin-top: ${(props) => (props.marginTop !== undefined ? `${props.marginTop}px` : '8px')};
    ${(props) => props.height !== undefined && `height: ${props.height}px;`}

    &:hover {
        background-color: ${(props) => props.theme.colors?.bgSurface || 'white'};
        color: ${(p) => p.theme.styles['primary-color']};
    }
`;

export const Label = styled(Typography.Text)`
    max-width: 125px;
    && {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
`;

export const IconSpacer = styled.span`
    width: 4px;
`;
