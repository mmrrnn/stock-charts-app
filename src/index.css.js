import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  a {
    color: black;
    text-decoration: none!important;
  }

  .mt-6 {
    margin-top: 6rem!important;
  }
`;