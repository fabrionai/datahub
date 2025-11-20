import { colors } from '@components';
import { CaretDown, CaretRight } from '@phosphor-icons/react';
import { Collapse, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { CountStyle } from '@app/entityV2/shared/SidebarStyledComponents';

const Container = styled.div`
    margin-left: 7px;
    width: 100%;
`;

const StyledCollapse = styled(Collapse)`
    .ant-collapse-header {
        padding: 0px 0px !important;
        align-items: center;
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }

    .ant-collapse-content-box {
        padding-top: 4px !important;
        padding-bottom: 0px !important;
    }

    .ant-collapse-arrow {
        margin-right: 5px !important;
        line-height: 32px;
    }

    .ant-collapse-expand-icon {
        height: 22px;
    }

    .ant-collapse-item-disabled > .ant-collapse-header {
        cursor: default;

        > .ant-collapse-extra {
            cursor: pointer;
        }
    }

    .ant-collapse-header-text {
        max-width: calc(100% - 50px);
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }

    &.ant-collapse {
        border-radius: 0 !important;
        background-color: transparent;
        border: none;
    }

    .ant-collapse-item {
        border-radius: 0 !important;
        border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
    }

    .ant-collapse-content {
        background-color: transparent;
        border-top-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
    }
`;

const SectionHeader = styled.span<{ collapsible?: boolean }>`
    display: flex;
    align-items: center;
    ${(props) => !props.collapsible && 'margin-left: 8px;'}
`;

const Title = styled(Typography.Text)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.colors?.text || colors.gray[600]};
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
`;

const StyledIcon = styled.div`
    svg {
        height: 16px;
        width: 16px;
        color: ${(props) => props.theme.colors?.icon || colors.gray[1800]};
    }
`;

type Props = {
    title: string;
    content: React.ReactNode;
    extra?: React.ReactNode;
    count?: number;
    collapsedContent?: React.ReactNode;
    collapsible?: boolean;
    expandedByDefault?: boolean;
    showFullCount?: boolean;
};

export const SidebarSection = ({
    title,
    content,
    extra,
    count = 0,
    collapsedContent,
    collapsible = true,
    expandedByDefault = true,
    showFullCount,
}: Props) => {
    return (
        <StyledCollapse
            ghost
            expandIcon={({ isActive }) => <StyledIcon>{isActive ? <CaretDown /> : <CaretRight />} </StyledIcon>}
            defaultActiveKey={expandedByDefault ? title : ''}
        >
            <Collapse.Panel
                header={
                    <>
                        <SectionHeader collapsible={collapsible}>
                            <Title ellipsis={{ tooltip: true }}>{title}</Title>
                            {count > 0 && (
                                <CountStyle>
                                    {showFullCount ? <>{count}</> : <>{count > 10 ? '10+' : count}</>}
                                </CountStyle>
                            )}
                        </SectionHeader>
                        {collapsedContent}
                    </>
                }
                key={title}
                extra={extra}
                collapsible={!collapsible ? 'disabled' : undefined}
                showArrow={collapsible}
            >
                <Container data-testid={`sidebar-section-content-${title}`}>{content}</Container>
            </Collapse.Panel>
        </StyledCollapse>
    );
};
