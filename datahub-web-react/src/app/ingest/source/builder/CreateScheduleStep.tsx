import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Switch, Typography } from 'antd';
import cronstrue from 'cronstrue';
import React, { useMemo, useState } from 'react';
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css';
import styled from 'styled-components';

import { ANTD_GRAY, REDESIGN_COLORS } from '@app/entity/shared/constants';
import { TimezoneSelect } from '@app/ingest/source/builder/TimezoneSelect';
import { IngestionSourceBuilderStep } from '@app/ingest/source/builder/steps';
import { SourceBuilderState, StepProps } from '@app/ingest/source/builder/types';
import { RequiredFieldForm } from '@app/shared/form/RequiredFieldForm';
import { lowerFirstLetter } from '@app/shared/textUtil';
import { Button } from '@src/alchemy-components';

const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    padding-top: 0px;
`;

const SelectTemplateHeader = styled(Typography.Title)`
    && {
        margin-bottom: 8px;
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }
`;

const CronText = styled(Typography.Paragraph)`
    &&& {
        margin-bottom: 0px;
    }
    color: ${(props) => props.theme.colors?.textSecondary || ANTD_GRAY[7]} !important;
`;

const CronInput = styled(Input)`
    margin-bottom: 8px;
    max-width: 200px;
    background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'} !important;
    border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'} !important;
    color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;

    &::placeholder {
        color: ${(props) => props.theme.colors?.textTertiary || 'rgba(0, 0, 0, 0.25)'} !important;
    }
`;

const Schedule = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
`;

const AdvancedSchedule = styled.div`
    margin-left: 20px;
`;

const AdvancedCheckBox = styled(Typography.Text)`
    margin-right: 10px;
    color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'} !important;
`;

const CronSuccessCheck = styled(CheckCircleOutlined)`
    color: ${REDESIGN_COLORS.BLUE};
    margin-right: 4px;
`;

const ControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
`;

const StyledFormItem = styled(Form.Item)`
    .ant-form-item-label > label {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }

    .ant-typography {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-typography-secondary {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'} !important;
    }

    .cron-builder {
        color: ${(props) => props.theme.colors?.textSecondary || ANTD_GRAY[7]};
    }
    .cron-builder-select {
        min-width: 100px;
    }

    .ant-select-selector {
        background-color: ${(props) => props.theme.colors?.bgSurface || '#ffffff'} !important;
        border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'} !important;
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-select-selection-item {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'} !important;
    }

    .ant-select-arrow {
        color: ${(props) => props.theme.colors?.icon || 'rgba(0, 0, 0, 0.45)'};
    }
`;

const WarningContainer = styled.div`
    color: ${(props) => props.theme.colors?.textSecondary || ANTD_GRAY[7]};
`;

const StyledWarningOutlined = styled(WarningOutlined)`
    margin-right: 4px;
    margin-top: 12px;
    color: ${(props) => props.theme.colors?.icon || 'rgba(0, 0, 0, 0.45)'};
`;

const ItemDescriptionText = styled(Typography.Paragraph)`
    color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.65)'} !important;
`;

const DAILY_MIDNIGHT_CRON_INTERVAL = '0 0 * * *';

export const CreateScheduleStep = ({ state, updateState, goTo, prev }: StepProps) => {
    const { schedule } = state;
    const interval = schedule?.interval?.replaceAll(', ', ' ') || DAILY_MIDNIGHT_CRON_INTERVAL;
    const timezone = schedule?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [scheduleEnabled, setScheduleEnabled] = useState(!!schedule);
    const [advancedCronCheck, setAdvancedCronCheck] = useState(false);
    const [scheduleCronInterval, setScheduleCronInterval] = useState(interval);
    const [scheduleTimezone, setScheduleTimezone] = useState(timezone);

    const cronAsText = useMemo(() => {
        if (scheduleCronInterval) {
            try {
                return {
                    text: `Runs ${lowerFirstLetter(cronstrue.toString(scheduleCronInterval))}.`,
                    error: false,
                };
            } catch (e) {
                return {
                    text: undefined,
                    error: true,
                };
            }
        }
        return {
            text: undefined,
            error: false,
        };
    }, [scheduleCronInterval]);

    const onClickNext = () => {
        if (scheduleEnabled) {
            const newState: SourceBuilderState = {
                ...state,
                schedule: {
                    timezone: scheduleTimezone,
                    interval: scheduleCronInterval,
                },
            };
            updateState(newState);
        } else {
            const newState: SourceBuilderState = {
                ...state,
                schedule: undefined,
            };
            updateState(newState);
        }

        goTo(IngestionSourceBuilderStep.NAME_SOURCE);
    };

    return (
        <>
            <Section>
                <SelectTemplateHeader level={5}>Configure an Ingestion Schedule</SelectTemplateHeader>
            </Section>
            <RequiredFieldForm layout="vertical">
                <StyledFormItem
                    tooltip="Enable to run ingestion syncs on a schedule. Running syncs on a schedule helps to keep information up to date."
                    label={
                        <Typography.Text strong>
                            Run on a schedule <Typography.Text type="secondary">(Recommended)</Typography.Text>
                        </Typography.Text>
                    }
                >
                    <Switch checked={scheduleEnabled} onChange={(v) => setScheduleEnabled(v)} />
                    {!scheduleEnabled && (
                        <WarningContainer>
                            <StyledWarningOutlined />
                            Running ingestion without a schedule may result in out-of-date information.
                        </WarningContainer>
                    )}
                </StyledFormItem>
                <StyledFormItem required label={<Typography.Text strong>Schedule</Typography.Text>}>
                    <Schedule>
                        {advancedCronCheck ? (
                            <CronInput
                                placeholder={DAILY_MIDNIGHT_CRON_INTERVAL}
                                autoFocus
                                value={scheduleCronInterval}
                                onChange={(e) => setScheduleCronInterval(e.target.value)}
                            />
                        ) : (
                            <Cron
                                value={scheduleCronInterval}
                                setValue={setScheduleCronInterval}
                                clearButton={false}
                                className="cron-builder"
                                leadingZero
                            />
                        )}
                        <AdvancedSchedule>
                            <AdvancedCheckBox type="secondary">Show Advanced</AdvancedCheckBox>
                            <Checkbox
                                checked={advancedCronCheck}
                                onChange={(event) => setAdvancedCronCheck(event.target.checked)}
                            />
                        </AdvancedSchedule>
                    </Schedule>
                    <CronText>
                        {cronAsText.error && <>Invalid cron schedule. Cron must be of UNIX form:</>}
                        {!cronAsText.text && (
                            <Typography.Paragraph keyboard style={{ marginTop: 4 }}>
                                minute, hour, day, month, day of week
                            </Typography.Paragraph>
                        )}
                        {cronAsText.text && (
                            <>
                                <CronSuccessCheck />
                                {cronAsText.text}
                            </>
                        )}
                    </CronText>
                </StyledFormItem>
                <StyledFormItem required label={<Typography.Text strong>Timezone</Typography.Text>}>
                    <ItemDescriptionText>Choose a timezone for the schedule.</ItemDescriptionText>
                    <TimezoneSelect value={scheduleTimezone} onChange={setScheduleTimezone} />
                </StyledFormItem>
            </RequiredFieldForm>
            <ControlsContainer>
                <Button variant="outline" color="gray" onClick={prev}>
                    Previous
                </Button>
                <div>
                    <Button
                        data-testid="ingestion-schedule-next-button"
                        disabled={!interval || interval.length === 0 || cronAsText.error}
                        onClick={onClickNext}
                    >
                        Next
                    </Button>
                </div>
            </ControlsContainer>
        </>
    );
};
