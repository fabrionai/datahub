import { Select } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { ANTD_GRAY } from '@app/entity/shared/constants';
import { UnionType } from '@app/search/utils/constants';

type Props = {
    unionType: UnionType;
    onUpdate: (newValue: UnionType) => void;
    disabled?: boolean;
};

const { Option } = Select;

const StyledSelect = styled(Select)`
    border-radius: 5px;
    background: ${(props) => props.theme.colors?.bgHover || ANTD_GRAY[4]};
    color: ${(props) => props.theme.colors?.text || 'inherit'};
    :hover {
        background: ${(props) => props.theme.colors?.bgSurface || ANTD_GRAY[4.5]};
    }

    .ant-select-selector {
        background: transparent !important;
        color: ${(props) => props.theme.colors?.text || 'inherit'};
    }
`;

export const AdvancedSearchFilterOverallUnionTypeSelect = ({ unionType, onUpdate, disabled = false }: Props) => {
    return (
        <>
            <StyledSelect
                showArrow={false}
                bordered={false}
                disabled={disabled}
                // these values are just for display purposes- the actual value is the unionType prop
                value={unionType === UnionType.AND ? 'all filters' : 'any filter'}
                onChange={(newValue) => {
                    if ((newValue as any) !== unionType) {
                        onUpdate(newValue as any);
                    }
                }}
                size="small"
                dropdownMatchSelectWidth={false}
            >
                <Option value={UnionType.AND}>all filters</Option>
                <Option value={UnionType.OR}>any filter</Option>
            </StyledSelect>
        </>
    );
};
