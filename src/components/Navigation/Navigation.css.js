import styled from 'styled-components';

export const Nav = styled.nav`
    padding: ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.medium};
    margin-bottom: 4rem;

    div#stock-charts-brand {
        color: ${({ theme }) => theme.colors.blue};
    }

    button {
        border: none;
        background-color: transparent;
    }

    button:hover {
        color: ${({ theme }) => theme.colors.blue};
    }
`;

export const Ul = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
        padding-left: ${({ theme }) => theme.spacing.medium};
    }

    li.active a {
        color: ${({ theme }) => theme.colors.blue};
    }
`;