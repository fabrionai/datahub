import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { useBaseEntity, useEntityData, useRouteToTab } from '@app/entity/shared/EntityContext';
import { EntityTab } from '@app/entity/shared/types';

type Props = {
    tabs: EntityTab[];
    selectedTab?: EntityTab;
};

const UnborderedTabs = styled(Tabs)`
    &&& .ant-tabs-nav {
        margin-bottom: 0;
        &:before {
            border-bottom: none;
        }
    }

    &&& .ant-tabs-tab {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.65)'};

        &:hover {
            color: ${(props) => props.theme.styles?.['primary-color'] || '#1890ff'};
        }
    }

    &&& .ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${(props) => props.theme.styles?.['primary-color'] || '#1890ff'};
    }

    &&& .ant-tabs-ink-bar {
        background: ${(props) => props.theme.styles?.['primary-color'] || '#1890ff'};
    }

    &&& .ant-tabs-tab-disabled {
        color: ${(props) => props.theme.colors?.textDisabled || 'rgba(0, 0, 0, 0.25)'};
    }
`;

const Tab = styled(Tabs.TabPane)`
    font-size: 14px;
    line-height: 22px;
`;

export const EntityTabs = <T,>({ tabs, selectedTab }: Props) => {
    const { entityData, loading } = useEntityData();
    const routeToTab = useRouteToTab();
    const baseEntity = useBaseEntity<T>();

    const enabledTabs = tabs.filter((tab) => tab.display?.enabled(entityData, baseEntity));

    useEffect(() => {
        if (!loading && !selectedTab && enabledTabs[0]) {
            routeToTab({ tabName: enabledTabs[0].name, method: 'replace' });
        }
    }, [loading, enabledTabs, selectedTab, routeToTab]);

    return (
        <UnborderedTabs
            data-testid="entity-tab-headers-test-id"
            animated={false}
            activeKey={selectedTab?.name || ''}
            size="large"
            onTabClick={(tab: string) => routeToTab({ tabName: tab })}
        >
            {tabs.map((tab) => {
                const tabName = (tab.getDynamicName && tab.getDynamicName(entityData, baseEntity)) || tab.name;
                if (!tab.display?.enabled(entityData, baseEntity)) {
                    return <Tab tab={tabName} key={tab.name} disabled />;
                }
                return <Tab tab={tabName} key={tab.name} />;
            })}
        </UnborderedTabs>
    );
};
