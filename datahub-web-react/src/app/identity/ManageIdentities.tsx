import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { GroupList } from '@app/identity/group/GroupList';
import { UserList } from '@app/identity/user/UserList';
import { RoutedTabs } from '@app/shared/RoutedTabs';

const PageContainer = styled.div`
    padding-top: 20px;
    width: 100%;
    overflow: auto;
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

const Content = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    &&& .ant-tabs-nav {
        margin: 0;
    }
    color: ${(props) => props.theme.colors?.text || '#262626'};

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
    Users = 'Users',
    Groups = 'Groups',
}
const ENABLED_TAB_TYPES = [TabType.Users, TabType.Groups];

interface Props {
    version?: string; // used to help with cypress tests bouncing between versions. wait till correct version loads
}

export const ManageIdentities = ({ version }: Props) => {
    /**
     * Determines which view should be visible: users or groups list.
     */

    const getTabs = () => {
        return [
            {
                name: TabType.Users,
                path: TabType.Users.toLocaleLowerCase(),
                content: <UserList />,
                display: {
                    enabled: () => true,
                },
            },
            {
                name: TabType.Groups,
                path: TabType.Groups.toLocaleLowerCase(),
                content: <GroupList />,
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
            <PageHeaderContainer data-testid={`manage-users-groups-${version}`}>
                <PageTitle level={3}>Manage Users & Groups</PageTitle>
                <PageDescription type="secondary">
                    View your DataHub users & groups. Take administrative actions.
                </PageDescription>
            </PageHeaderContainer>
            <Content>
                <RoutedTabs defaultPath={defaultTabPath} tabs={getTabs()} onTabChange={onTabChange} />
            </Content>
        </PageContainer>
    );
};
