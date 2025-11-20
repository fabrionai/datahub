import { Form, Input, Select, Typography } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useUserContext } from '@app/context/useUserContext';
import { ANTD_GRAY } from '@app/entityV2/shared/constants';
import { ViewTypeLabel } from '@app/entityV2/view/ViewTypeLabel';
import { ViewDefinitionBuilder } from '@app/entityV2/view/builder/ViewDefinitionBuilder';
import { ViewBuilderMode } from '@app/entityV2/view/builder/types';
import { ViewBuilderState } from '@app/entityV2/view/types';

import { DataHubViewType } from '@types';

const StyledFormItem = styled(Form.Item)`
    margin-bottom: 8px;

    .ant-form-item-label > label {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }

    .ant-typography {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-typography-secondary {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'} !important;
    }

    .ant-input,
    .ant-input-affix-wrapper,
    .ant-select-selector,
    textarea.ant-input {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'} !important;
        border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'} !important;
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-input::placeholder,
    textarea.ant-input::placeholder,
    .ant-select-selection-placeholder {
        color: ${(props) => props.theme.colors?.textTertiary || 'rgba(0, 0, 0, 0.25)'} !important;
    }

    .ant-select-arrow {
        color: ${(props) => props.theme.colors?.icon || 'rgba(0, 0, 0, 0.45)'};
    }

    .ant-input:hover,
    .ant-input-affix-wrapper:hover,
    .ant-select-selector:hover,
    textarea.ant-input:hover {
        border-color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'} !important;
    }

    .ant-input:focus,
    .ant-input-affix-wrapper-focused,
    .ant-select-focused .ant-select-selector,
    textarea.ant-input:focus {
        border-color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'} !important;
        box-shadow: 0 0 0 2px
            ${(props) => (props.theme.colors?.textBrand ? `${props.theme.colors.textBrand}1a` : 'rgba(24, 144, 255, 0.2)')};
    }

    .ant-select-selection-item {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }
`;

type Props = {
    urn?: string;
    mode: ViewBuilderMode;
    state: ViewBuilderState;
    updateState: (newState: ViewBuilderState) => void;
};

export const ViewBuilderForm = ({ urn, mode, state, updateState }: Props) => {
    const userContext = useUserContext();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(state);
    }, [state, form]);

    const setName = (name: string) => {
        updateState({
            ...state,
            name,
        });
    };

    const setDescription = (description: string) => {
        updateState({
            ...state,
            description,
        });
    };

    const setViewType = (viewType: DataHubViewType) => {
        updateState({ ...state, viewType });
    };

    const canManageGlobalViews = userContext?.platformPrivileges?.manageGlobalViews || false;
    const isEditing = urn !== undefined;

    return (
        <span data-testid="view-builder-form">
            <Form form={form} initialValues={state} layout="vertical">
                <StyledFormItem label={<Typography.Text strong>Name</Typography.Text>}>
                    <Typography.Paragraph>Give your new View a name. </Typography.Paragraph>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a name for your View.',
                            },
                            { whitespace: true },
                            { min: 1, max: 50 },
                        ]}
                        hasFeedback
                    >
                        <Input
                            data-testid="view-name-input"
                            placeholder="Data Analyst"
                            onChange={(event) => setName(event.target.value)}
                            disabled={mode === ViewBuilderMode.PREVIEW}
                        />
                    </Form.Item>
                </StyledFormItem>
                <StyledFormItem label={<Typography.Text strong>Description</Typography.Text>}>
                    <Typography.Paragraph>Write a description for your View.</Typography.Paragraph>
                    <Form.Item name="description" rules={[{ whitespace: true }, { min: 1, max: 500 }]} hasFeedback>
                        <Input.TextArea
                            data-testid="view-description-input"
                            placeholder="This View is useful for Data Analysts"
                            onChange={(event) => setDescription(event.target.value)}
                            disabled={mode === ViewBuilderMode.PREVIEW}
                        />
                    </Form.Item>
                </StyledFormItem>
                <StyledFormItem label={<Typography.Text strong>Type</Typography.Text>}>
                    <Typography.Paragraph>Select the type of your new View.</Typography.Paragraph>
                    <Form.Item name="viewType">
                        <Select
                            onSelect={(value) => setViewType(value as DataHubViewType)}
                            disabled={!canManageGlobalViews || isEditing || mode === ViewBuilderMode.PREVIEW}
                        >
                            <Select.Option value={DataHubViewType.Personal}>
                                <ViewTypeLabel type={DataHubViewType.Personal} color={ANTD_GRAY[9]} />
                            </Select.Option>
                            <Select.Option value={DataHubViewType.Global}>
                                <ViewTypeLabel type={DataHubViewType.Global} color={ANTD_GRAY[9]} />
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </StyledFormItem>
                <StyledFormItem label={<Typography.Text strong>Filters</Typography.Text>} style={{ marginBottom: 8 }}>
                    <Typography.Paragraph>
                        Select the filters that are applied when this View is selected. Assets that match these filters
                        will be shown when the View is applied.
                    </Typography.Paragraph>
                </StyledFormItem>
            </Form>
            <ViewDefinitionBuilder mode={mode} state={state} updateState={updateState} />
        </span>
    );
};
