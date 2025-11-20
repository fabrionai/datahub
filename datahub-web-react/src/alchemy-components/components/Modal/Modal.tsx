import { Button, ButtonProps, Heading, Icon, Text, typography } from '@components';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { ModalContext } from '@app/sharedV2/modals/ModalContext';

const ModalGlobalStyles = createGlobalStyle`
    .ant-modal-wrap {
        ${(props) => props.theme.colors?.bg && `background-color: ${props.theme.colors.bg};`}
    }

    .ant-modal-mask {
        ${(props) => props.theme.colors?.bg && `background-color: ${props.theme.colors.bg} !important;`}
        opacity: 0.9 !important;
    }
`;

const StyledModal = styled(AntModal)<{ hasChildren: boolean }>`
    font-family: ${typography.fonts.body};

    &&& .ant-modal-content {
        box-shadow: 0px 4px 12px 0px rgba(9, 1, 61, 0.12);
        border-radius: 12px;
        background-color: ${(props) => props.theme.colors?.bgSurface || 'white'} !important;
    }

    .ant-modal-header {
        //margin-bottom: 24px;
        padding: 12px 20px;
        border-radius: ${({ hasChildren }) => (hasChildren ? '12px 12px 0 0' : '12px')};
        border-bottom: ${({ hasChildren, theme }) => (hasChildren ? `1px solid ${theme.colors?.border || '#F0F0F0'}` : '0')};
        background-color: ${(props) => props.theme.colors?.bgSurface || 'white'} !important;
    }

    .ant-modal-body {
        padding: ${({ hasChildren }) => (hasChildren ? '24px 20px' : '8px 20px')};
        background-color: ${(props) => props.theme.colors?.bgSurface || 'white'} !important;
    }

    .ant-modal-footer {
        padding: 12px 20px;
        background-color: ${(props) => props.theme.colors?.bgSurface || 'white'} !important;
    }

    .ant-modal-close {
        top: 16px;
        right: 16px;
        color: ${(props) => props.theme.colors?.icon || '#666'};

        .ant-modal-close-x {
            height: 24px;
            width: 24px;
        }

        &:hover {
            color: ${(props) => props.theme.colors?.text || '#333'};
            background-color: ${(props) => props.theme.colors?.bgHover || 'rgba(0, 0, 0, 0.06)'};
        }
    }

    .ant-modal-close-icon {
        color: inherit;
    }
`;

const HeaderContainer = styled.div<{ hasChildren: boolean }>`
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.colors?.text || '#2b2b2b'};
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    h1, h2, h3, h4, h5, h6 {
        color: ${(props) => props.theme.colors?.text || '#2b2b2b'} !important;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
    justify-content: end;

    button, span, p {
        color: ${(props) => props.theme.colors?.text || '#2b2b2b'} !important;
    }
`;

export interface ModalButton extends ButtonProps {
    text: string;
    key?: string;
    onClick: () => void;
    buttonDataTestId?: string;
}

export interface ModalProps {
    buttons?: ModalButton[];
    title: React.ReactNode;
    subtitle?: string;
    titlePill?: React.ReactNode;
    children?: React.ReactNode;
    onCancel: () => void;
    dataTestId?: string;
}

export function Modal({
    buttons,
    title,
    subtitle,
    titlePill,
    children,
    onCancel,
    dataTestId,
    ...props
}: ModalProps & AntModalProps) {
    return (
        <>
            <ModalGlobalStyles />
            <StyledModal
                open
                centered
                onCancel={onCancel}
                closeIcon={<Icon icon="X" source="phosphor" data-testid="modal-close-icon" />}
                hasChildren={!!children}
                data-testid={dataTestId}
            title={
                <HeaderContainer hasChildren={!!children}>
                    <TitleRow>
                        <Heading type="h1" color="inherit" weight="bold" size="lg">
                            {title}
                        </Heading>
                        {titlePill}
                    </TitleRow>
                    {!!subtitle && (
                        <Text type="span" color="inherit" weight="medium">
                            {subtitle}
                        </Text>
                    )}
                </HeaderContainer>
            }
            footer={
                !!buttons?.length && (
                    <ButtonsContainer>
                        {buttons.map(({ text, variant, onClick, key, buttonDataTestId, ...buttonProps }, index) => (
                            <Button
                                key={key || text}
                                data-testid={buttonDataTestId ?? (dataTestId && `${dataTestId}-${variant}-${index}`)}
                                variant={variant}
                                onClick={onClick}
                                {...buttonProps}
                            >
                                <Text type="span" weight="bold" lineHeight="none">
                                    {text}
                                </Text>
                            </Button>
                        ))}
                    </ButtonsContainer>
                )
            }
            {...props}
        >
            <ModalContext.Provider value={{ isInsideModal: true }}>{children}</ModalContext.Provider>
        </StyledModal>
        </>
    );
}
