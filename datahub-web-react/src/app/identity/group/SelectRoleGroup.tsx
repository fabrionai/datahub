import { UserOutlined } from '@ant-design/icons';
import { useApolloClient } from '@apollo/client';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { ANTD_GRAY } from '@app/entity/shared/constants';
import AssignRoletoGroupConfirmation from '@app/identity/group/AssignRoletoGroupConfirmation';
import { mapRoleIcon } from '@app/identity/user/UserUtils';
import { clearRoleListCache } from '@app/permissions/roles/cacheUtils';

import { CorpGroup, DataHubRole } from '@types';

const NO_ROLE_TEXT = 'No Role';
const NO_ROLE_URN = 'urn:li:dataHubRole:NoRole';

type Props = {
    group: CorpGroup;
    groupRoleUrn: string;
    selectRoleOptions: Array<DataHubRole>;
    refetch?: () => void;
};

const RoleSelectDropdownStyles = createGlobalStyle`
    .ant-select-dropdown {
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}
        ${(props) => props.theme.colors?.border && `border: 1px solid ${props.theme.colors.border} !important;`}
    }

    .ant-select-item {
        ${(props) => props.theme.colors?.text && `color: ${props.theme.colors.text} !important;`}
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}

        &:hover {
            ${(props) => props.theme.colors?.bgHover && `background-color: ${props.theme.colors.bgHover} !important;`}
        }
    }

    .ant-select-item-option-selected {
        ${(props) => props.theme.colors?.bgHover && `background-color: ${props.theme.colors.bgHover} !important;`}
    }

    .ant-select-item-option-active {
        ${(props) => props.theme.colors?.bgHover && `background-color: ${props.theme.colors.bgHover} !important;`}
    }
`;

const RoleSelect = styled(Select)<{ color?: string }>`
    min-width: 105px;
    ${(props) => (props.color ? ` color: ${props.color};` : '')}

    .ant-select-selector {
        ${(props) => props.theme.colors?.bgSurface && `background-color: ${props.theme.colors.bgSurface} !important;`}
        ${(props) => props.theme.colors?.border && `border: 1px solid ${props.theme.colors.border} !important;`}
    }

    .ant-select-selection-item {
        ${(props) => props.theme.colors?.text && `color: ${props.theme.colors.text} !important;`}
    }

    .ant-select-arrow {
        ${(props) => props.theme.colors?.icon && `color: ${props.theme.colors.icon} !important;`}
    }
`;

const RoleIcon = styled.span`
    margin-right: 6px;
    font-size: 12px;
`;

export default function SelectRoleGroup({ group, groupRoleUrn, selectRoleOptions, refetch }: Props) {
    const client = useApolloClient();
    const rolesMap: Map<string, DataHubRole> = new Map();
    selectRoleOptions.forEach((role) => {
        rolesMap.set(role.urn, role);
    });
    const allSelectRoleOptions = [{ urn: NO_ROLE_URN, name: NO_ROLE_TEXT }, ...selectRoleOptions];
    const selectOptions = allSelectRoleOptions.map((role) => {
        return (
            <Select.Option key={role.urn} value={role.urn}>
                <RoleIcon>{mapRoleIcon(role.name)}</RoleIcon>
                {role.name}
            </Select.Option>
        );
    });

    const defaultRoleUrn = groupRoleUrn || NO_ROLE_URN;
    const [currentRoleUrn, setCurrentRoleUrn] = useState<string>(defaultRoleUrn);
    const [isViewingAssignRole, setIsViewingAssignRole] = useState(false);

    useEffect(() => {
        setCurrentRoleUrn(defaultRoleUrn);
    }, [defaultRoleUrn]);

    const onSelectRole = (roleUrn: string) => {
        setCurrentRoleUrn(roleUrn);
        setIsViewingAssignRole(true);
    };

    const onCancel = () => {
        setCurrentRoleUrn(defaultRoleUrn);
        setIsViewingAssignRole(false);
    };

    const onConfirm = () => {
        setIsViewingAssignRole(false);
        setTimeout(() => {
            refetch?.();
            clearRoleListCache(client); // Update roles.
        }, 3000);
    };

    // wait for available roles to load
    if (!selectRoleOptions.length) return null;

    return (
        <>
            <RoleSelectDropdownStyles />
            <RoleSelect
                placeholder={
                    <>
                        <UserOutlined style={{ marginRight: 6, fontSize: 12 }} />
                        {NO_ROLE_TEXT}
                    </>
                }
                value={currentRoleUrn}
                onChange={(e) => onSelectRole(e as string)}
                color={currentRoleUrn === NO_ROLE_URN ? ANTD_GRAY[6] : undefined}
            >
                {selectOptions}
            </RoleSelect>
            <AssignRoletoGroupConfirmation
                open={isViewingAssignRole}
                roleToAssign={rolesMap.get(currentRoleUrn)}
                groupUrn={group.urn}
                groupName={group?.info?.displayName as string}
                onClose={onCancel}
                onConfirm={onConfirm}
            />
        </>
    );
}
