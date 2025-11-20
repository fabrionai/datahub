import { Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { DomainsContext, UpdatedDomain } from '@app/domainV2/DomainsContext';
import { DomainsList } from '@app/domainV2/DomainsList';
import { GenericEntityProperties } from '@app/entity/shared/types';
import { useShowNavBarRedesign } from '@app/useShowNavBarRedesign';

const PageWrapper = styled.div<{ $isShowNavBarRedesign?: boolean }>`
    display: flex;
    flex: 1;
    height: 100%;
    background-color: ${(props) => props.theme.colors?.bgSurface || 'white'};
    border-radius: ${(props) =>
        props.$isShowNavBarRedesign ? props.theme.styles['border-radius-navbar-redesign'] : '8px'};
    ${(props) => props.$isShowNavBarRedesign && `box-shadow: ${props.theme.styles['box-shadow-navbar-redesign']}`};
`;

const PageContainer = styled.div`
    padding-top: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const PageHeaderContainer = styled.div`
    && {
        padding-left: 24px;
    }
`;

const PageTitle = styled(Typography.Title)`
    && {
        margin-bottom: 12px;
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
`;

const PageDescription = styled(Typography.Paragraph)`
    && {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'};
    }
`;

const ListContainer = styled.div``;

export const ManageDomainsPage = () => {
    const isShowNavBarRedesign = useShowNavBarRedesign();
    const [entityData, setEntityData] = useState<GenericEntityProperties | null>(null);
    const [newDomain, setNewDomain] = useState<UpdatedDomain | null>(null);
    const [deletedDomain, setDeletedDomain] = useState<UpdatedDomain | null>(null);
    const [updatedDomain, setUpdatedDomain] = useState<UpdatedDomain | null>(null);

    return (
        <DomainsContext.Provider
            value={{
                entityData,
                setEntityData,
                newDomain,
                setNewDomain,
                deletedDomain,
                setDeletedDomain,
                updatedDomain,
                setUpdatedDomain,
            }}
        >
            <PageWrapper $isShowNavBarRedesign={isShowNavBarRedesign}>
                <PageContainer>
                    <PageHeaderContainer>
                        <PageTitle level={3}>Domains</PageTitle>
                        <PageDescription type="secondary">
                            View your DataHub Domains. Take administrative actions.
                        </PageDescription>
                    </PageHeaderContainer>
                    <ListContainer>
                        <DomainsList />
                    </ListContainer>
                </PageContainer>
            </PageWrapper>
        </DomainsContext.Provider>
    );
};
