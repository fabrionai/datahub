import { Table } from 'antd';
import styled from 'styled-components';

import { ANTD_GRAY } from '@app/entity/shared/constants';

export const StyledTable = styled(Table)`
    overflow: inherit;
    height: inherit;

    &&& .ant-table-cell {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#fff'};
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
    &&& .ant-table-thead .ant-table-cell {
        font-weight: 600;
        font-size: 12px;
        color: ${(props) => props.theme.colors?.text || ANTD_GRAY[8]};
        background-color: ${(props) => props.theme.colors?.bgSurface || '#fff'};
    }
    &&& .ant-table-tbody > tr:hover > td {
        background-color: ${(props) => props.theme.colors?.bgHover || '#fafafa'} !important;
    }
    &&
        .ant-table-thead
        > tr
        > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
            [colspan]
        )::before {
        border: 1px solid ${(props) => props.theme.colors?.border || ANTD_GRAY[4]};
    }
` as typeof Table;
// this above line preserves the Table component's generic-ness
