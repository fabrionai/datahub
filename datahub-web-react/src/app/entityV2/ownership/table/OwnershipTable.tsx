import { Empty } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { ActionsColumn } from '@app/entityV2/ownership/table/ActionsColumn';
import { DescriptionColumn } from '@app/entityV2/ownership/table/DescriptionColumn';
import { NameColumn } from '@app/entityV2/ownership/table/NameColumn';
import { StyledTable } from '@app/entityV2/shared/components/styled/StyledTable';

import { OwnershipTypeEntity } from '@types';

const StyledEmpty = styled(Empty)`
    .ant-empty-description {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'};
    }
`;

type Props = {
    ownershipTypes: OwnershipTypeEntity[];
    setIsOpen: (isOpen: boolean) => void;
    setOwnershipType: (ownershipType: OwnershipTypeEntity) => void;
    refetch: () => void;
};

export const OwnershipTable = ({ ownershipTypes, setIsOpen, setOwnershipType, refetch }: Props) => {
    const tableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a?.info?.name?.localeCompare(b?.info?.name),
            key: 'name',
            render: (_, record: any) => <NameColumn ownershipType={record} />,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (_, record: any) => <DescriptionColumn ownershipType={record} />,
        },
        {
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record: any) => (
                <ActionsColumn
                    ownershipType={record}
                    setIsOpen={setIsOpen}
                    setOwnershipType={setOwnershipType}
                    refetch={refetch}
                />
            ),
        },
    ];

    const getRowKey = (ownershipType: OwnershipTypeEntity) => {
        return ownershipType?.info?.name || ownershipType.urn;
    };

    return (
        <StyledTable
            columns={tableColumns}
            dataSource={ownershipTypes}
            rowKey={getRowKey}
            locale={{
                emptyText: <StyledEmpty description="No Ownership Types found!" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
            }}
            pagination={false}
        />
    );
};
