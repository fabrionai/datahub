import { Select } from 'antd';
import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
    max-width: 300px;

    .ant-select-selector {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'} !important;
        border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'} !important;
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-select-selection-item {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-select-arrow {
        color: ${(props) => props.theme.colors?.icon || 'rgba(0, 0, 0, 0.45)'};
    }
`;

type Props = {
    value: string;
    onChange: (newTimezone: any) => void;
};

export const TimezoneSelect = ({ value, onChange }: Props) => {
    const timezones = moment.tz.names();
    return (
        <>
            <StyledSelect showSearch value={value} onChange={onChange}>
                {timezones.map((timezone) => (
                    <Select.Option key={timezone} value={timezone}>
                        {timezone}
                    </Select.Option>
                ))}
            </StyledSelect>
        </>
    );
};
