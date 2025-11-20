import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { ManagePolicies } from '@app/permissions/policy/ManagePolicies';
import { ManageRoles } from '@app/permissions/roles/ManageRoles';
import { RoutedTabs } from '@app/shared/RoutedTabs';

const PageContainer = styled.div`
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
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

const Content = styled.div`
    &&& .ant-tabs-nav {
        margin: 0;
    }
    color: ${(props) => props.theme.colors?.text || '#262626'};
    display: flex;
    flex-direction: column;
    overflow: auto;

    &&& .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
        padding-left: 28px;
    }

    &&& .ant-tabs-tab {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'};
    }

    &&& .ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${(props) => props.theme.colors?.textBrand || '#1890ff'};
    }

    &&& .ant-tabs-ink-bar {
        background: ${(props) => props.theme.colors?.borderBrand || '#1890ff'};
    }
`;

enum TabType {
    Roles = 'Roles',
    Policies = 'Policies',
}
const ENABLED_TAB_TYPES = [TabType.Roles, TabType.Policies];

export const ManagePermissions = () => {
    /**
     * Determines which view should be visible: roles or policies.
     */

    const getTabs = () => {
        return [
            {
                name: TabType.Roles,
                path: TabType.Roles.toLocaleLowerCase(),
                content: <ManageRoles />,
                display: {
                    enabled: () => true,
                },
            },
            {
                name: TabType.Policies,
                path: TabType.Policies.toLocaleLowerCase(),
                content: <ManagePolicies />,
                display: {
                    enabled: () => true,
                },
            },
        ].filter((tab) => ENABLED_TAB_TYPES.includes(tab.name));
    };

    const defaultTabPath = getTabs() && getTabs()?.length > 0 ? getTabs()[0].path : '';
    const onTabChange = () => null;

    return (
        <PageContainer>
            <PageHeaderContainer>
                <PageTitle level={3}>Manage Permissions</PageTitle>
                <PageDescription type="secondary">
                    View your DataHub permissions. Take administrative actions.
                </PageDescription>
            </PageHeaderContainer>
            <Content>
                <RoutedTabs defaultPath={defaultTabPath} tabs={getTabs()} onTabChange={onTabChange} />
            </Content>
        </PageContainer>
    );
};
