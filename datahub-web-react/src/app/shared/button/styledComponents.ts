import styled from 'styled-components';

export const ModalButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 16px;

    button, span, p {
        color: ${(props) => props.theme.colors?.text || '#2b2b2b'} !important;
    }
`;
