import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { ANTD_GRAY } from '@app/entity/shared/constants';

const EmptyDomainContainer = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: auto;
`;

const StyledEmpty = styled(Empty)`
    width: 35vw;
    @media screen and (max-width: 1300px) {
        width: 50vw;
    }
    @media screen and (max-width: 896px) {
        overflow-y: auto;
        max-height: 75vh;
        &::-webkit-scrollbar {
            width: 5px;
            background: #d6d6d6;
        }
    }
    padding: 20px;
    .ant-empty-image {
        display: none;
    }
    .ant-typography {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
    .ant-typography-secondary {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'} !important;
    }
`;

const StyledButton = styled(Button)`
    margin: 18px 8px 0 0;
    background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'};
    border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
    color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};

    &:hover {
        background-color: ${(props) => props.theme.colors?.bgHover || '#fafafa'};
        border-color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'};
        color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'};
    }

    .anticon {
        color: ${(props) => props.theme.colors?.icon || 'rgba(0, 0, 0, 0.45)'};
    }

    &:hover .anticon {
        color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'};
    }
`;

const IconContainer = styled.span`
    color: ${(props) => props.theme.colors?.icon || ANTD_GRAY[7]};
    font-size: 40px;
`;

interface Props {
    title?: string;
    setIsCreatingDomain: React.Dispatch<React.SetStateAction<boolean>>;
    description?: React.ReactNode;
    icon?: React.ReactNode;
}

function EmptyDomainsSection(props: Props) {
    const { title, description, setIsCreatingDomain, icon } = props;
    return (
        <EmptyDomainContainer>
            <StyledEmpty
                description={
                    <>
                        <IconContainer>{icon}</IconContainer>
                        <Typography.Title level={4}>{title}</Typography.Title>
                        {description}
                    </>
                }
            >
                <StyledButton onClick={() => setIsCreatingDomain(true)}>
                    <PlusOutlined /> Create Domain
                </StyledButton>
            </StyledEmpty>
        </EmptyDomainContainer>
    );
}

export default EmptyDomainsSection;
