import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Pagination, Select, Tag, message } from 'antd';
import * as QueryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components/macro';

import analytics, { EventType } from '@app/analytics';
import { StyledTable } from '@app/entity/shared/components/styled/StyledTable';
import TabToolbar from '@app/entity/shared/components/styled/TabToolbar';
import { ANTD_GRAY } from '@app/entity/shared/constants';
import { OnboardingTour } from '@app/onboarding/OnboardingTour';
import { POLICIES_CREATE_POLICY_ID, POLICIES_INTRO_ID } from '@app/onboarding/config/PoliciesOnboardingConfig';
import AvatarsGroup from '@app/permissions/AvatarsGroup';
import PolicyBuilderModal from '@app/permissions/policy/PolicyBuilderModal';
import PolicyDetailsModal from '@app/permissions/policy/PolicyDetailsModal';
import { DEFAULT_PAGE_SIZE, EMPTY_POLICY } from '@app/permissions/policy/policyUtils';
import { usePolicy } from '@app/permissions/policy/usePolicy';
import { SearchBar } from '@app/search/SearchBar';
import { Message } from '@app/shared/Message';
import { scrollToTop } from '@app/shared/searchUtils';
import { useAppConfig } from '@app/useAppConfig';
import { useEntityRegistry } from '@app/useEntityRegistry';

import { useListPoliciesQuery } from '@graphql/policy.generated';
import { AndFilterInput, FilterOperator, Policy, PolicyState } from '@types';

const SourceContainer = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;

    .ant-pagination-item {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#fff'};
        border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};

        a {
            color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
        }

        &:hover {
            border-color: ${(props) => props.theme.colors?.borderBrand || '#1890ff'};

            a {
                color: ${(props) => props.theme.colors?.textBrand || '#1890ff'};
            }
        }
    }

    .ant-pagination-item-active {
        background-color: ${(props) => props.theme.colors?.bgHover || 'rgba(0, 0, 0, 0.06)'};
        border-color: ${(props) => props.theme.colors?.borderBrand || '#1890ff'};

        a {
            color: ${(props) => props.theme.colors?.textBrand || '#1890ff'};
        }

        &:hover {
            background-color: ${(props) => props.theme.colors?.bgHover || 'rgba(0, 0, 0, 0.06)'};
            border-color: ${(props) => props.theme.colors?.borderBrand || '#1890ff'};

            a {
                color: ${(props) => props.theme.colors?.textBrand || '#1890ff'};
            }
        }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
        button {
            background-color: ${(props) => props.theme.colors?.bgSurface || '#fff'};
            border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
            color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};

            &:hover {
                border-color: ${(props) => props.theme.colors?.borderBrand || '#1890ff'};
                color: ${(props) => props.theme.colors?.textBrand || '#1890ff'};
            }
        }
    }

    .ant-pagination-disabled {
        button {
            background-color: ${(props) => props.theme.colors?.bgDisabled || '#f5f5f5'};
            border-color: ${(props) => props.theme.colors?.borderDisabled || '#d9d9d9'};
            color: ${(props) => props.theme.colors?.textDisabled || 'rgba(0, 0, 0, 0.25)'};

            &:hover {
                border-color: ${(props) => props.theme.colors?.borderDisabled || '#d9d9d9'};
                color: ${(props) => props.theme.colors?.textDisabled || 'rgba(0, 0, 0, 0.25)'};
            }
        }
    }
`;

const PolicyName = styled.span<{ $editable?: boolean }>`
    cursor: pointer;
    font-weight: 700;
    color: ${(props) => {
        // If theme colors are available (dark mode), use them
        if (props.theme.colors?.text) {
            return props.$editable ? props.theme.colors.text : props.theme.colors.textSecondary;
        }
        // Otherwise use original light mode colors
        return props.$editable ? '#000000' : '#8C8C8C';
    }};
`;

const PolicyDescription = styled.span`
    color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
`;

const PoliciesType = styled(Tag)`
    && {
        border-radius: 2px !important;
        font-weight: 700;
    }
`;

const ActorTag = styled(Tag)`
    && {
        display: inline-block;
        text-align: center;
    }
`;

const StyledEmpty = styled(Empty)`
    .ant-empty-description {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'};
    }
`;

const ActionButtonContainer = styled.div`
    display: flex;
    justify-content: right;
`;

const EditPolicyButton = styled(Button)`
    margin-right: 16px;
`;

const StyledButton = styled(Button)`
    && {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};

        &:hover {
            color: ${(props) => props.theme.colors?.textBrand || '#1890ff'};
            background-color: ${(props) => props.theme.colors?.bgHover || 'rgba(0, 0, 0, 0.04)'};
        }
    }
`;

const DeactivateButton = styled(Button)<{ $editable?: boolean }>`
    && {
        width: 100px;
        color: ${(props) => {
            if (!props.$editable) {
                // Use textTertiary for better visibility in dark mode (#94a3b8 instead of #71717a)
                return props.theme.colors?.textTertiary || ANTD_GRAY[6];
            }
            return 'red';
        }};
    }
`;

const ActivateButton = styled(Button)<{ $editable?: boolean }>`
    && {
        width: 100px;
        color: ${(props) => {
            if (!props.$editable) {
                // Use textTertiary for better visibility in dark mode (#94a3b8 instead of #71717a)
                return props.theme.colors?.textTertiary || ANTD_GRAY[6];
            }
            return 'green';
        }};
    }
`;

const DeleteButton = styled(Button)`
    && {
        &.ant-btn-dangerous:disabled {
            color: ${(props) => props.theme.colors?.textTertiary || ANTD_GRAY[6]};
        }
    }
`;

const PageContainer = styled.span`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;
const StyledSelect = styled(Select)`
    margin-right: 15px;
    min-width: 90px;
    margin-left: 20px;
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

export enum StatusType {
    ALL,
    ACTIVE,
    INACTIVE,
}

// TODO: Cleanup the styling.
export const ManagePolicies = () => {
    const entityRegistry = useEntityRegistry();
    const location = useLocation();
    const params = QueryString.parse(location.search, { arrayFormat: 'comma' });
    const paramsQuery = (params?.query as string) || undefined;
    const [query, setQuery] = useState<undefined | string>(undefined);
    const [orFilters, setOrFilters] = useState<AndFilterInput[]>([
        { and: [{ field: 'state', values: ['ACTIVE'], condition: FilterOperator.Equal }] },
    ]);
    const [statusFilter, setStatusFilter] = useState(StatusType.ACTIVE);

    useEffect(() => setQuery(paramsQuery), [paramsQuery]);

    const {
        config: { policiesConfig },
    } = useAppConfig();

    // Policy list paging.
    const [page, setPage] = useState(1);
    const pageSize = DEFAULT_PAGE_SIZE;
    const start = (page - 1) * pageSize;

    // Controls whether the editing and details view modals are active.
    const [showPolicyBuilderModal, setShowPolicyBuilderModal] = useState(false);
    const [showViewPolicyModal, setShowViewPolicyModal] = useState(false);

    // Focused policy represents a policy being actively viewed, edited, created via a popup modal.
    const [focusPolicyUrn, setFocusPolicyUrn] = useState<undefined | string>(undefined);
    const [focusPolicy, setFocusPolicy] = useState<Omit<Policy, 'urn'>>(EMPTY_POLICY);

    const {
        loading: policiesLoading,
        error: policiesError,
        data: policiesData,
        refetch: policiesRefetch,
    } = useListPoliciesQuery({
        variables: {
            input: {
                start,
                count: pageSize,
                query,
                orFilters,
            },
        },
        fetchPolicy: (query?.length || 0) > 0 ? 'no-cache' : 'cache-first',
    });

    const totalPolicies = policiesData?.listPolicies?.total || 0;
    const policies = useMemo(() => policiesData?.listPolicies?.policies || [], [policiesData]);

    const onChangePage = (newPage: number) => {
        scrollToTop();
        setPage(newPage);
    };

    const onClickNewPolicy = () => {
        setFocusPolicyUrn(undefined);
        setFocusPolicy(EMPTY_POLICY);
        setShowPolicyBuilderModal(true);
    };

    const onClosePolicyBuilder = () => {
        setFocusPolicyUrn(undefined);
        setFocusPolicy(EMPTY_POLICY);
        setShowPolicyBuilderModal(false);
    };

    const onViewPolicy = (policy: Policy) => {
        setShowViewPolicyModal(true);
        setFocusPolicyUrn(policy?.urn);
        setFocusPolicy({ ...policy });
    };

    const onCancelViewPolicy = () => {
        setShowViewPolicyModal(false);
        setFocusPolicy(EMPTY_POLICY);
        setFocusPolicyUrn(undefined);
    };

    const onEditPolicy = (policy: Policy) => {
        setShowPolicyBuilderModal(true);
        setFocusPolicyUrn(policy?.urn);
        setFocusPolicy({ ...policy });
    };

    const onStatusChange = (newStatusFilter: StatusType) => {
        setStatusFilter(newStatusFilter);
        // Reset page to 1 when filter changes
        setPage(1);
        const filtersInput: any = [];
        let statusValue = '';
        if (newStatusFilter === StatusType.ACTIVE) {
            statusValue = 'ACTIVE';
        } else if (newStatusFilter === StatusType.INACTIVE) {
            statusValue = 'INACTIVE';
        }
        if (statusValue) {
            const filter = { field: 'state', values: [statusValue], condition: FilterOperator.Equal };
            filtersInput.push({ and: [filter] });
        }
        setOrFilters(filtersInput);
    };

    useEffect(() => {
        policiesRefetch();
    }, [orFilters, policiesRefetch]);

    const {
        createPolicyError,
        updatePolicyError,
        deletePolicyError,
        onSavePolicy,
        onToggleActiveDuplicate,
        onRemovePolicy,
        getPrivilegeNames,
    } = usePolicy(
        policiesConfig,
        focusPolicyUrn,
        policiesRefetch,
        setShowViewPolicyModal,
        onCancelViewPolicy,
        onClosePolicyBuilder,
    );

    const updateError = createPolicyError || updatePolicyError || deletePolicyError;

    const tableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record: any) => {
                return (
                    <PolicyName
                        onClick={() => onViewPolicy(record.policy)}
                        $editable={record?.editable}
                    >
                        {record?.name}
                    </PolicyName>
                );
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                const policyType = type?.charAt(0)?.toUpperCase() + type?.slice(1)?.toLowerCase();
                return <PoliciesType>{policyType}</PoliciesType>;
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => <PolicyDescription>{description || ''}</PolicyDescription>,
        },
        {
            title: 'Actors',
            dataIndex: 'actors',
            key: 'actors',
            render: (_, record: any) => {
                return (
                    <>
                        <AvatarsGroup
                            users={record?.resolvedUsers}
                            groups={record?.resolvedGroups}
                            entityRegistry={entityRegistry}
                            maxCount={3}
                            size={28}
                        />
                        {record?.allUsers ? <ActorTag>All Users</ActorTag> : null}
                        {record?.allGroups ? <ActorTag>All Groups</ActorTag> : null}
                        {record?.resourceOwners ? <ActorTag>All Owners</ActorTag> : null}
                    </>
                );
            },
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            render: (state: string) => {
                const isActive = state === PolicyState.Active;
                return <Tag color={isActive ? 'green' : 'red'}>{state}</Tag>;
            },
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: (_, record: any) => (
                <ActionButtonContainer>
                    <EditPolicyButton disabled={!record?.editable} onClick={() => onEditPolicy(record?.policy)}>
                        EDIT
                    </EditPolicyButton>
                    {record?.state === PolicyState.Active ? (
                        <DeactivateButton
                            disabled={!record?.editable}
                            $editable={record?.editable}
                            onClick={() => {
                                onToggleActiveDuplicate(record?.policy);
                                analytics.event({
                                    type: EventType.DeactivatePolicyEvent,
                                    policyUrn: record?.policy?.urn,
                                });
                            }}
                        >
                            DEACTIVATE
                        </DeactivateButton>
                    ) : (
                        <ActivateButton
                            disabled={!record?.editable}
                            $editable={record?.editable}
                            onClick={() => {
                                onToggleActiveDuplicate(record?.policy);
                                analytics.event({
                                    type: EventType.ActivatePolicyEvent,
                                    policyUrn: record?.policy?.urn,
                                });
                            }}
                        >
                            ACTIVATE
                        </ActivateButton>
                    )}
                    <DeleteButton
                        disabled={!record?.editable}
                        onClick={() => onRemovePolicy(record?.policy)}
                        type="text"
                        shape="circle"
                        danger
                    >
                        <DeleteOutlined />
                    </DeleteButton>
                </ActionButtonContainer>
            ),
        },
    ];

    const tableData = policies?.map((policy) => ({
        allGroups: policy?.actors?.allGroups,
        allUsers: policy?.actors?.allUsers,
        resourceOwners: policy?.actors?.resourceOwners,
        description: policy?.description,
        editable: policy?.editable,
        name: policy?.name,
        privileges: policy?.privileges,
        policy,
        resolvedGroups: policy?.actors?.resolvedGroups,
        resolvedUsers: policy?.actors?.resolvedUsers,
        resources: policy?.resources,
        state: policy?.state,
        type: policy?.type,
        urn: policy?.urn,
    }));

    return (
        <PageContainer>
            <OnboardingTour stepIds={[POLICIES_INTRO_ID, POLICIES_CREATE_POLICY_ID]} />
            {policiesLoading && !policiesData && (
                <Message type="loading" content="Loading policies..." style={{ marginTop: '10%' }} />
            )}
            {policiesError && <Message type="error" content="Failed to load policies! An unexpected error occurred." />}
            {updateError && message.error('Failed to update policies. An unexpected error occurred.')}
            <SourceContainer>
                <TabToolbar>
                    <div>
                        <StyledButton
                            id={POLICIES_CREATE_POLICY_ID}
                            type="text"
                            onClick={onClickNewPolicy}
                            data-testid="add-policy-button"
                        >
                            <PlusOutlined /> Create new policy
                        </StyledButton>
                    </div>
                    <SelectContainer>
                        <SearchBar
                            initialQuery={query || ''}
                            placeholderText="Search policies..."
                            suggestions={[]}
                            style={{
                                maxWidth: 220,
                                padding: 0,
                            }}
                            inputStyle={{
                                height: 32,
                                fontSize: 12,
                            }}
                            onSearch={() => null}
                            onQueryChange={(q) => {
                                setPage(1);
                                setQuery(q);
                            }}
                            entityRegistry={entityRegistry}
                            hideRecommendations
                        />
                        <StyledSelect
                            value={statusFilter}
                            onChange={(selection) => onStatusChange(selection as StatusType)}
                            style={{ width: 100 }}
                            data-testid="policy-filter"
                        >
                            <Select.Option value={StatusType.ALL} key="ALL" data-testid="all-policies-option">
                                All
                            </Select.Option>
                            <Select.Option value={StatusType.ACTIVE} key="ACTIVE">
                                Active
                            </Select.Option>
                            <Select.Option value={StatusType.INACTIVE} key="INACTIVE">
                                Inactive
                            </Select.Option>
                        </StyledSelect>
                    </SelectContainer>
                </TabToolbar>
                <StyledTable
                    columns={tableColumns}
                    dataSource={tableData}
                    rowKey="urn"
                    locale={{
                        emptyText: <StyledEmpty description="No Policies!" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
                    }}
                    pagination={false}
                />
            </SourceContainer>
            <PaginationContainer>
                <Pagination
                    style={{ margin: 40 }}
                    current={page}
                    pageSize={pageSize}
                    total={totalPolicies}
                    showLessItems
                    onChange={onChangePage}
                    showSizeChanger={false}
                />
            </PaginationContainer>
            {showPolicyBuilderModal && (
                <PolicyBuilderModal
                    focusPolicyUrn={focusPolicyUrn}
                    policy={focusPolicy || EMPTY_POLICY}
                    setPolicy={setFocusPolicy}
                    open={showPolicyBuilderModal}
                    onClose={onClosePolicyBuilder}
                    onSave={onSavePolicy}
                />
            )}
            {showViewPolicyModal && (
                <PolicyDetailsModal
                    policy={focusPolicy}
                    open={showViewPolicyModal}
                    onClose={onCancelViewPolicy}
                    privileges={getPrivilegeNames(focusPolicy)}
                />
            )}
        </PageContainer>
    );
};
