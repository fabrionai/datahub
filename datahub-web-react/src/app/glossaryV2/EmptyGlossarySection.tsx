import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

const StyledEmpty = styled(Empty)`
    padding: 80px 40px;
    .ant-empty-footer {
        .ant-btn:not(:last-child) {
            margin-right: 8px;
        }
    }
    .ant-typography {
        color: ${(props) => props.theme.colors?.text || 'rgba(0, 0, 0, 0.85)'};
    }
    .ant-typography-secondary {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'} !important;
    }
`;

const StyledButton = styled(Button)`
    margin-right: 8px;
`;

interface Props {
    title?: string;
    description?: string;
    onAddTerm: () => void;
    onAddtermGroup: () => void;
}

function EmptyGlossarySection(props: Props) {
    const { title, description, onAddTerm, onAddtermGroup } = props;

    return (
        <>
            <StyledEmpty
                description={
                    <>
                        <Typography.Title level={4}>{title}</Typography.Title>
                        <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>
                    </>
                }
            >
                {/* not disabled on acryl-main due to ability to propose */}
                <StyledButton data-testid="add-term-button" onClick={onAddTerm}>
                    <PlusOutlined /> Add Term
                </StyledButton>
                <StyledButton data-testid="add-term-group-button" onClick={onAddtermGroup}>
                    <PlusOutlined /> Add Term Group
                </StyledButton>
            </StyledEmpty>
        </>
    );
}

export default EmptyGlossarySection;
