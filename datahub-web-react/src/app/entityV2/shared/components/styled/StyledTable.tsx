import { Table } from 'antd';
import styled from 'styled-components';

import { ANTD_GRAY, REDESIGN_COLORS } from '@app/entityV2/shared/constants';

export const StyledTable = styled(Table)`
    overflow: inherit;
    height: inherit;

    &&& .ant-table-cell {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#fff'};
    }
    &&& .ant-table-thead .ant-table-cell {
        font-weight: 700;
        font-size: 12px;
        color: ${(props) => props.theme.colors?.text || REDESIGN_COLORS.HEADING_COLOR};
        background-color: ${(props) => props.theme.colors?.bgSurfaceDarker || REDESIGN_COLORS.LIGHT_GREY};
    }
    &&& .ant-table-thead > tr > th {
        padding-left: 10px;
    }

    &&
        .ant-table-thead
        > tr
        > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
            [colspan]
        )::before {
        border: 1px solid ${(props) => props.theme.colors?.border || ANTD_GRAY[4]};
    }

    &&& tr {
        height: 32px;
    }

    &&& td {
        background-color: inherit;
    }

    &&& .ant-table-tbody > tr:hover > td {
        background-color: ${(props) => props.theme.colors?.bgHover || 'rgba(0, 0, 0, 0.02)'};
    }
` as typeof Table;
// this above line preserves the Table component's generic-ness

export const CompactStyledTable = styled(Table)`
    overflow: inherit;
    height: inherit;

    &&& .ant-table-cell {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#fff'};
    }
    &&& .ant-table-thead .ant-table-cell {
        font-weight: 600;
        font-size: 12px;
        color: ${(props) => props.theme.colors?.text || ANTD_GRAY[8]};
        background-color: ${(props) => props.theme.colors?.bgSurfaceDarker || REDESIGN_COLORS.LIGHT_GREY};
    }
    &&
        .ant-table-thead
        > tr
        > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
            [colspan]
        )::before {
        border: 1px solid ${(props) => props.theme.colors?.border || ANTD_GRAY[4]};
    }

    &&& td {
        background-color: inherit;
    }

    &&& .ant-table-tbody > tr:hover > td {
        background-color: ${(props) => props.theme.colors?.bgHover || 'rgba(0, 0, 0, 0.02)'};
    }
` as typeof Table;
