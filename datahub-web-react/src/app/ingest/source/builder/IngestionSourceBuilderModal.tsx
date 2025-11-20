import { Modal, Steps, Typography } from 'antd';
import { isEqual } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { CreateScheduleStep } from '@app/ingest/source/builder/CreateScheduleStep';
import { DefineRecipeStep } from '@app/ingest/source/builder/DefineRecipeStep';
import { NameSourceStep } from '@app/ingest/source/builder/NameSourceStep';
import { SelectTemplateStep } from '@app/ingest/source/builder/SelectTemplateStep';
import sourcesJson from '@app/ingest/source/builder/sources.json';
import { SourceBuilderState, StepProps } from '@app/ingest/source/builder/types';

import { IngestionSource } from '@types';

const StyledModal = styled(Modal)`
    && .ant-modal-content {
        border-radius: 16px;
        overflow: hidden;
        min-width: 400px;
        background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'};
    }

    && .ant-modal-header {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'};
        border-bottom-color: ${(props) => props.theme.colors?.border || '#f0f0f0'};
    }

    && .ant-modal-body {
        background-color: ${(props) => props.theme.colors?.bgSurfaceDarker || '#F6F6F6'} !important;
    }

    && .ant-modal-title {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }

    && .ant-modal-close-x {
        color: ${(props) => props.theme.colors?.icon || 'rgba(0, 0, 0, 0.45)'};
    }
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 12px;

    .ant-typography {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }
`;

const StepsContainer = styled.div`
    margin-right: 20px;
    margin-left: 20px;
    margin-bottom: 40px;

    .ant-steps-item-title {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-steps-item-description {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.65)'} !important;
    }

    .ant-steps-item-wait .ant-steps-item-icon {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#fff'};
        border-color: ${(props) => props.theme.colors?.border || 'rgba(0, 0, 0, 0.25)'};

        .ant-steps-icon {
            color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.65)'};
        }
    }

    .ant-steps-item-process .ant-steps-item-icon {
        background-color: ${(props) => props.theme.styles?.['primary-color'] || '#1890ff'};
        border-color: ${(props) => props.theme.styles?.['primary-color'] || '#1890ff'};
    }

    .ant-steps-item-finish .ant-steps-item-icon {
        border-color: ${(props) => props.theme.styles?.['primary-color'] || '#1890ff'};

        .ant-steps-icon {
            color: ${(props) => props.theme.styles?.['primary-color'] || '#1890ff'};
        }
    }

    .ant-steps-item-tail::after {
        background-color: ${(props) => props.theme.colors?.border || '#f0f0f0'};
    }

    .ant-steps-item-finish .ant-steps-item-tail::after {
        background-color: ${(props) => props.theme.styles?.['primary-color'] || '#1890ff'};
    }
`;

/**
 * Mapping from the step type to the title for the step
 */
export enum IngestionSourceBuilderStepTitles {
    SELECT_TEMPLATE = 'Choose Data Source',
    DEFINE_RECIPE = 'Configure Connection',
    CREATE_SCHEDULE = 'Sync Schedule',
    NAME_SOURCE = 'Finish up',
}

/**
 * Mapping from the step type to the component implementing that step.
 */
export const IngestionSourceBuilderStepComponent = {
    SELECT_TEMPLATE: SelectTemplateStep,
    DEFINE_RECIPE: DefineRecipeStep,
    CREATE_SCHEDULE: CreateScheduleStep,
    NAME_SOURCE: NameSourceStep,
};

/**
 * Steps of the Ingestion Source Builder flow.
 */
export enum IngestionSourceBuilderStep {
    SELECT_TEMPLATE = 'SELECT_TEMPLATE',
    DEFINE_RECIPE = 'DEFINE_RECIPE',
    CREATE_SCHEDULE = 'CREATE_SCHEDULE',
    NAME_SOURCE = 'NAME_SOURCE',
}

const modalBodyStyle = { padding: '16px 24px 16px 24px', backgroundColor: '#F6F6F6' };

type Props = {
    initialState?: SourceBuilderState;
    open: boolean;
    onSubmit?: (input: SourceBuilderState, resetState: () => void, shouldRun?: boolean) => void;
    onCancel?: () => void;
    sourceRefetch?: () => Promise<any>;
    selectedSource?: IngestionSource;
};

export const IngestionSourceBuilderModal = ({
    initialState,
    open,
    onSubmit,
    onCancel,
    sourceRefetch,
    selectedSource,
}: Props) => {
    const isEditing = initialState !== undefined;
    const titleText = isEditing ? 'Edit Data Source' : 'Connect Data Source';
    const initialStep = isEditing
        ? IngestionSourceBuilderStep.DEFINE_RECIPE
        : IngestionSourceBuilderStep.SELECT_TEMPLATE;

    const [stepStack, setStepStack] = useState([initialStep]);
    const [ingestionBuilderState, setIngestionBuilderState] = useState<SourceBuilderState>({
        schedule: {
            interval: '0 0 * * *',
        },
    });

    const ingestionSources = JSON.parse(JSON.stringify(sourcesJson)); // TODO: replace with call to server once we have access to dynamic list of sources

    // Reset the ingestion builder modal state when the modal is re-opened.
    const prevInitialState = useRef(initialState);
    useEffect(() => {
        if (!isEqual(prevInitialState.current, initialState)) {
            setIngestionBuilderState(initialState || {});
        }
        prevInitialState.current = initialState;
    }, [initialState]);

    // Reset the step stack to the initial step when the modal is re-opened.
    useEffect(() => setStepStack([initialStep]), [initialStep]);

    const goTo = (step: IngestionSourceBuilderStep) => {
        setStepStack([...stepStack, step]);
    };

    const prev = () => {
        setStepStack(stepStack.slice(0, -1));
    };

    const cancel = () => {
        onCancel?.();
    };

    const submit = (shouldRun?: boolean) => {
        onSubmit?.(
            ingestionBuilderState,
            () => {
                setStepStack([initialStep]);
                setIngestionBuilderState({});
            },
            shouldRun,
        );
    };

    const currentStep = stepStack[stepStack.length - 1];
    const currentStepIndex = Object.values(IngestionSourceBuilderStep)
        .map((value, index) => ({
            value,
            index,
        }))
        .filter((obj) => obj.value === currentStep)[0].index;
    const StepComponent: React.FC<StepProps> = IngestionSourceBuilderStepComponent[currentStep];

    return (
        <StyledModal
            width="64%"
            footer={null}
            title={
                <TitleContainer>
                    <Typography.Text>{titleText}</Typography.Text>
                </TitleContainer>
            }
            style={{ top: 40 }}
            bodyStyle={modalBodyStyle}
            open={open}
            onCancel={onCancel}
        >
            {currentStepIndex > 0 ? (
                <StepsContainer>
                    <Steps current={currentStepIndex}>
                        {Object.keys(IngestionSourceBuilderStep).map((item) => (
                            <Steps.Step key={item} title={IngestionSourceBuilderStepTitles[item]} />
                        ))}
                    </Steps>
                </StepsContainer>
            ) : null}
            <StepComponent
                state={ingestionBuilderState}
                updateState={setIngestionBuilderState}
                isEditing={isEditing}
                goTo={goTo}
                prev={stepStack.length > 1 ? prev : undefined}
                submit={submit}
                cancel={cancel}
                ingestionSources={ingestionSources}
                sourceRefetch={sourceRefetch}
                selectedSource={selectedSource}
            />
        </StyledModal>
    );
};
