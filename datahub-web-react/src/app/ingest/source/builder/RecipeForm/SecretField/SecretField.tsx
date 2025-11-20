import { useApolloClient } from '@apollo/client';
import { AutoComplete, Divider, Form } from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components/macro';

import { ANTD_GRAY } from '@app/entity/shared/constants';
import { clearSecretListCache } from '@app/ingest/secret/cacheUtils';
import CreateSecretButton from '@app/ingest/source/builder/RecipeForm/SecretField/CreateSecretButton';
import { RecipeField } from '@app/ingest/source/builder/RecipeForm/common';

import { Secret } from '@types';

const StyledDivider = styled(Divider)`
    margin: 0;
    border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
`;

const StyledAutoComplete = styled(AutoComplete)`
    .ant-select-dropdown {
        background-color: ${(props) => props.theme.colors?.bgSurfaceNewNav || '#ffffff'};
    }

    .ant-select-item {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }

    .ant-select-item-option-selected {
        background-color: ${(props) => props.theme.colors?.bgHover || '#f5f5f5'};
    }

    .ant-select-item-option-active {
        background-color: ${(props) => props.theme.colors?.bgHover || '#f5f5f5'};
    }
`;

export const StyledFormItem = styled(Form.Item)<{
    $alignLeft?: boolean;
    $removeMargin?: boolean;
    $isSecretField?: boolean;
}>`
    margin-bottom: ${(props) => (props.$removeMargin ? '0' : '16px')};

    .ant-form-item-label > label {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }

    .ant-input,
    .ant-input-affix-wrapper,
    .ant-select-selector,
    .ant-picker {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'} !important;
        border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'} !important;
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-input::placeholder,
    .ant-select-selection-placeholder {
        color: ${(props) => props.theme.colors?.textTertiary || 'rgba(0, 0, 0, 0.25)'} !important;
    }

    .ant-select-arrow,
    .ant-picker-suffix {
        color: ${(props) => props.theme.colors?.icon || 'rgba(0, 0, 0, 0.45)'};
    }

    .ant-input:hover,
    .ant-input-affix-wrapper:hover,
    .ant-select-selector:hover,
    .ant-picker:hover {
        border-color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'} !important;
    }

    .ant-input:focus,
    .ant-input-affix-wrapper-focused,
    .ant-select-focused .ant-select-selector,
    .ant-picker-focused {
        border-color: ${(props) => props.theme.colors?.textBrand || '#40a9ff'} !important;
        box-shadow: 0 0 0 2px
            ${(props) => (props.theme.colors?.textBrand ? `${props.theme.colors.textBrand}1a` : 'rgba(24, 144, 255, 0.2)')};
    }

    ${(props) =>
        props.$alignLeft &&
        `
        .ant-form-item {
            flex-direction: row;

        }

        .ant-form-item-label {
            padding: 0;
            margin-right: 10px;
        }
    `}

    ${(props) =>
        props.$isSecretField &&
        `
        .ant-form-item-label {
            &:after {
                content: 'Secret Field';
                color: ${props.theme.colors?.textSecondary || ANTD_GRAY[7]};
                font-style: italic;
                font-weight: 100;
                margin-left: 5px;
                font-size: 10px;
            }
        }
    `}
`;

interface SecretFieldProps {
    field: RecipeField;
    secrets: Secret[];
    removeMargin?: boolean;
    refetchSecrets: () => void;
    updateFormValue: (field, value) => void;
}

function SecretFieldTooltip({ tooltipLabel }: { tooltipLabel?: string | ReactNode }) {
    return (
        <div>
            {tooltipLabel && (
                <>
                    {tooltipLabel}
                    <hr />
                </>
            )}
            <p>
                This field requires you to use a DataHub Secret. For more information on Secrets in DataHub, please
                review{' '}
                <a
                    href="https://docs.datahub.com/docs/ui-ingestion/#creating-a-secret"
                    target="_blank"
                    rel="noreferrer"
                >
                    the docs
                </a>
                .
            </p>
        </div>
    );
}

const encodeSecret = (secretName: string) => {
    return `\${${secretName}}`;
};

function SecretField({ field, secrets, removeMargin, updateFormValue, refetchSecrets }: SecretFieldProps) {
    const options = secrets.map((secret) => ({ value: encodeSecret(secret.name), label: secret.name }));
    const apolloClient = useApolloClient();

    return (
        <StyledFormItem
            required={field.required}
            name={field.name}
            label={field.label}
            rules={field.rules || undefined}
            tooltip={<SecretFieldTooltip tooltipLabel={field?.tooltip} />}
            $removeMargin={!!removeMargin}
            $isSecretField
        >
            <StyledAutoComplete
                placeholder={field.placeholder}
                filterOption={(input, option) => !!option?.value?.toLowerCase().includes(input.toLowerCase())}
                notFoundContent={<>No secrets found</>}
                options={options}
                dropdownRender={(menu) => {
                    return (
                        <>
                            {menu}
                            <StyledDivider />
                            <CreateSecretButton
                                onSubmit={(state) => {
                                    updateFormValue(field.name, encodeSecret(state.name as string));
                                    setTimeout(() => clearSecretListCache(apolloClient), 3000);
                                }}
                                refetchSecrets={refetchSecrets}
                            />
                        </>
                    );
                }}
            />
        </StyledFormItem>
    );
}

export default SecretField;
