import { CaretDownFilled } from '@ant-design/icons';
import { Tooltip } from '@components';
import { Select } from 'antd';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { ANTD_GRAY } from '@app/entity/shared/constants';
import { DEFAULT_SORT_OPTION } from '@app/searchV2/context/constants';
import useGetSortOptions from '@app/searchV2/sorting/useGetSortOptions';

const SortSelectDropdownStyles = createGlobalStyle`
    .ant-select-dropdown {
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}
        ${(props) => props.theme.colors?.border && `border: 1px solid ${props.theme.colors.border} !important;`}
    }

    .ant-select-item {
        ${(props) => props.theme.colors?.text && `color: ${props.theme.colors.text} !important;`}
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}

        &:hover {
            ${(props) => props.theme.colors?.bgHover && `background-color: ${props.theme.colors.bgHover} !important;`}
        }
    }

    .ant-select-item-option-selected {
        ${(props) => props.theme.colors?.bgHover && `background-color: ${props.theme.colors.bgHover} !important;`}
    }

    .ant-select-item-option-active {
        ${(props) => props.theme.colors?.bgHover && `background-color: ${props.theme.colors.bgHover} !important;`}
    }
`;

const SelectWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    margin-right: 0px;
    && {
        padding: 0px;
        margin: 0px;
    }

    .ant-select-selector {
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}
        ${(props) => props.theme.colors?.border && `border: 1px solid ${props.theme.colors.border} !important;`}
    }

    .ant-select-focused .ant-select-selector,
    .ant-select-open .ant-select-selector {
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}
        ${(props) => props.theme.colors?.border && `border: 1px solid ${props.theme.colors.border} !important;`}
        box-shadow: none !important;
    }

    .ant-select-selection-item {
        // !important is necessary because updating Select styles for antd is impossible
        color: ${(props) => props.theme.colors?.text || ANTD_GRAY[8]} !important;
        font-weight: 700;
    }

    .ant-select-selection-placeholder {
        color: ${(props) => props.theme.colors?.textSecondary || ANTD_GRAY[8]};
        font-weight: 700;
    }

    .ant-select-arrow {
        color: ${(props) => props.theme.colors?.icon || ANTD_GRAY[8]};
    }
`;

type Props = {
    selectedSortOption: string | undefined;
    setSelectedSortOption: (option: string) => void;
};

export default function SearchSortSelect({ selectedSortOption, setSelectedSortOption }: Props) {
    const sortOptions = useGetSortOptions();
    const options = Object.entries(sortOptions).map(([value, option]) => ({ value, label: option.label }));

    return (
        <>
            <SortSelectDropdownStyles />
            <Tooltip title="Sort search results" showArrow={false} placement="left">
                <SelectWrapper>
                    <Select
                        placeholder="Sort by"
                        value={selectedSortOption === DEFAULT_SORT_OPTION ? null : selectedSortOption}
                        options={options}
                        bordered={false}
                        onChange={(option) => setSelectedSortOption(option)}
                        dropdownStyle={{ minWidth: 'max-content' }}
                        placement="bottomRight"
                        suffixIcon={<CaretDownFilled />}
                    />
                </SelectWrapper>
            </Tooltip>
        </>
    );
}
