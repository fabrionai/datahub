import { green, red } from '@ant-design/colors';
import { CheckOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { ANTD_GRAY } from '@app/entity/shared/constants';

const CapabilityWrapper = styled.div`
    align-items: center;
    display: flex;
    margin: 10px 0;
`;

const CapabilityName = styled.span`
    color: ${(props) => props.theme.colors?.text || ANTD_GRAY[8]};
    font-size: 18px;
    margin-right: 12px;
`;

const CapabilityMessage = styled.span<{ success: boolean }>`
    color: ${(props) => (props.success ? props.theme.colors?.textSuccess || green[6] : props.theme.colors?.textError || red[5])};
    font-size: 12px;
    flex: 1;
    padding-left: 4px;
`;

const StyledQuestion = styled(QuestionCircleOutlined)`
    color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'};
    margin-left: 4px;
`;

export const StyledCheck = styled(CheckOutlined)`
    color: ${(props) => props.theme.colors?.iconSuccess || green[6]};
    margin-right: 15px;
`;

export const StyledClose = styled(CloseOutlined)`
    color: ${(props) => props.theme.colors?.iconError || red[5]};
    margin-right: 15px;
`;

const NumberWrapper = styled.span`
    margin-right: 8px;
`;

interface Props {
    success: boolean;
    capability: string;
    displayMessage: string | null;
    tooltipMessage: string | null;
    number?: number;
}

function ConnectionCapabilityView({ success, capability, displayMessage, tooltipMessage, number }: Props) {
    return (
        <CapabilityWrapper>
            <CapabilityName>
                {success ? <StyledCheck /> : <StyledClose />}
                {number ? <NumberWrapper>{number}.</NumberWrapper> : ''}
                {capability}
            </CapabilityName>
            <CapabilityMessage success={success}>
                {displayMessage}
                {tooltipMessage && (
                    <Tooltip overlay={tooltipMessage}>
                        <StyledQuestion />
                    </Tooltip>
                )}
            </CapabilityMessage>
        </CapabilityWrapper>
    );
}

export default ConnectionCapabilityView;
