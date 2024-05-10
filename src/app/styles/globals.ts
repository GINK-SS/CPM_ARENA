import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    width: 100%;
    height: 100%; 
    margin: 0;
    padding: 0;
  }
  body {
    background: linear-gradient(0deg, #a3440f, #000000, #000000);
    background-size: 500% 500%;
    background-repeat: no-repeat;
    background-color: #000000;
    -webkit-animation: AnimationGradient 10s ease infinite;
    -moz-animation: AnimationGradient 10s ease infinite;
    animation: AnimationGradient 10s ease infinite;
    color: #FFF;
  }

  @-webkit-keyframes AnimationGradient {
    0%{background-position:0% 44%}
    50%{background-position:100% 57%}
    100%{background-position:0% 44%}
  }
  @-moz-keyframes AnimationGradient {
      0%{background-position:0% 44%}
      50%{background-position:100% 57%}
      100%{background-position:0% 44%}
  }
  @keyframes AnimationGradient {
      0%{background-position:0% 44%}
      50%{background-position:100% 57%}
      100%{background-position:0% 44%}
  }
`;

export default GlobalStyle;
