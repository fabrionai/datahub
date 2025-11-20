import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledInput = styled(Input)`
    && {
        background-color: ${(props) => props.theme.colors?.bgSurfaceDarker || '#ffffff'};
        border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};

        &::placeholder {
            color: ${(props) => props.theme.colors?.textTertiary || 'rgba(0, 0, 0, 0.25)'};
        }

        &:hover {
            border-color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'};
        }

        &:focus {
            border-color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'};
            box-shadow: 0 0 0 2px ${(props) => props.theme.colors?.textBrand || '#40a9ff'}20;
        }
    }
`;

interface Props {
    name: string;
    value: string;
    onChangeValue: (newValue: string) => void;
}

export default function TextValueInput({ name, value, onChangeValue }: Props) {
    return (
        <StyledInput
            placeholder={`Enter ${name.toLocaleLowerCase()}`}
            data-testid="edit-text-input"
            onChange={(e) => onChangeValue(e.target.value)}
            value={value}
        />
    );
}
