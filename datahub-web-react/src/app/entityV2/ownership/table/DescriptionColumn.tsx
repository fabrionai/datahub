import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { OwnershipTypeEntity } from '@types';

const DescriptionText = styled(Typography.Text)`
    font-size: 12px;
    font-weight: 400;
    && {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
`;

type Props = {
    ownershipType: OwnershipTypeEntity;
};

export const DescriptionColumn = ({ ownershipType }: Props) => {
    const description = ownershipType?.info?.description || '';

    return <DescriptionText>{description}</DescriptionText>;
};
