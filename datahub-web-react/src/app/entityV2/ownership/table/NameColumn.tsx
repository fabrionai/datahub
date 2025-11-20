import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { OwnershipTypeEntity } from '@types';

const NameText = styled(Typography.Text)`
    font-size: 12px;
    font-weight: 700;
    && {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
`;

type Props = {
    ownershipType: OwnershipTypeEntity;
};

export const NameColumn = ({ ownershipType }: Props) => {
    const name = ownershipType?.info?.name || ownershipType?.urn;

    return <NameText>{name}</NameText>;
};
