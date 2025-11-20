import { Empty } from 'antd';
import styled from 'styled-components';

const StyledEmpty = styled(Empty)`
    .ant-empty-description {
        color: ${(props) => props.theme.colors?.textSecondary || 'rgba(0, 0, 0, 0.45)'};
    }
`;

export const EmptyAnnouncements = () => {
    return <StyledEmpty description="No Announcements Yet!" />;
};
