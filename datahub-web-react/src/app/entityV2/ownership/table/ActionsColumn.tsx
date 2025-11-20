import { CopyOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Popconfirm, Typography, message, notification } from 'antd';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';

import { useDeleteOwnershipTypeMutation } from '@graphql/ownership.generated';
import { OwnershipTypeEntity } from '@types';

const DROPDOWN_TEST_ID = 'ownership-table-dropdown';
const EDIT_OWNERSHIP_TYPE_TEST_ID = 'edit-ownership-type';
const DELETE_OWNERSHIP_TYPE_TEST_ID = 'delete-ownership-type';

const DropdownStyles = createGlobalStyle`
    .ant-dropdown-menu {
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}
        ${(props) => props.theme.colors?.border && `border: 1px solid ${props.theme.colors.border} !important;`}

        .ant-dropdown-menu-item {
            ${(props) => props.theme.colors?.text && `color: ${props.theme.colors.text} !important;`}

            &:hover {
                ${(props) => props.theme.colors?.bgHover && `background-color: ${props.theme.colors.bgHover} !important;`}
            }

            .anticon {
                ${(props) => props.theme.colors?.text && `color: ${props.theme.colors.text} !important;`}
            }
        }
    }

    .ant-popover-inner {
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}
    }

    .ant-popover-inner-content {
        ${(props) => props.theme.colors?.text && `color: ${props.theme.colors.text} !important;`}
    }

    .ant-popover-message-title {
        ${(props) => props.theme.colors?.text && `color: ${props.theme.colors.text} !important;`}
    }
`;

const StyledDropdown = styled(Dropdown)``;

const MenuButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MenuButtonText = styled(Typography.Text)`
    font-size: 14px;
    font-weight: 400;
    margin-left: 8px;
    && {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
`;

const StyledMoreOutlined = styled(MoreOutlined)`
    width: 20px;
    &&& {
        padding-left: 0px;
        padding-right: 0px;
        font-size: 18px;
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
    :hover {
        cursor: pointer;
    }
`;

const StyledPopconfirmText = styled(Typography.Text)`
    && {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
`;

type Props = {
    ownershipType: OwnershipTypeEntity;
    setIsOpen: (isOpen: boolean) => void;
    setOwnershipType: (ownershipType: OwnershipTypeEntity) => void;
    refetch: () => void;
};

export const ActionsColumn = ({ ownershipType, setIsOpen, setOwnershipType, refetch }: Props) => {
    const editOnClick = () => {
        setIsOpen(true);
        setOwnershipType(ownershipType);
    };

    const onCopy = () => {
        navigator.clipboard.writeText(ownershipType.urn);
    };

    const [deleteOwnershipTypeMutation] = useDeleteOwnershipTypeMutation();

    const onDelete = () => {
        deleteOwnershipTypeMutation({
            variables: {
                urn: ownershipType.urn,
            },
        })
            .then(() => {
                notification.success({
                    message: `Success`,
                    description: 'You have deleted an ownership type.',
                    placement: 'bottomLeft',
                    duration: 3,
                });
                setTimeout(() => {
                    refetch();
                }, 3000);
            })
            .catch((e: unknown) => {
                message.destroy();
                if (e instanceof Error) {
                    message.error({
                        content: `Failed to delete an ownership type`,
                        duration: 3,
                    });
                }
            });
    };

    const items: MenuProps['items'] = [
        {
            key: 'edit',
            icon: (
                <MenuButtonContainer data-testid={EDIT_OWNERSHIP_TYPE_TEST_ID}>
                    <EditOutlined />
                    <MenuButtonText>Edit</MenuButtonText>
                </MenuButtonContainer>
            ),
        },
        {
            key: 'delete',
            icon: (
                <Popconfirm
                    title={<StyledPopconfirmText>Are you sure you want to delete this ownership type?</StyledPopconfirmText>}
                    placement="left"
                    onCancel={() => {}}
                    onConfirm={onDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <MenuButtonContainer data-testid={DELETE_OWNERSHIP_TYPE_TEST_ID}>
                        <DeleteOutlined />
                        <MenuButtonText>Delete</MenuButtonText>
                    </MenuButtonContainer>
                </Popconfirm>
            ),
        },
        {
            key: 'copy',
            icon: (
                <MenuButtonContainer>
                    <CopyOutlined />
                    <MenuButtonText>Copy Urn</MenuButtonText>
                </MenuButtonContainer>
            ),
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        const key = e.key as string;
        if (key === 'edit') {
            editOnClick();
        } else if (key === 'copy') {
            onCopy();
        }
    };

    const menuProps: MenuProps = {
        items,
        onClick,
    };

    return (
        <>
            <DropdownStyles />
            <StyledDropdown menu={menuProps}>
                <StyledMoreOutlined data-testid={DROPDOWN_TEST_ID} style={{ display: undefined }} />
            </StyledDropdown>
        </>
    );
};
