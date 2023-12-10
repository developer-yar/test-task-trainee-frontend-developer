import { createGlobalStyle } from "styled-components";
import RobotoRegular from "../../assets/fonts/Roboto-Regular.woff2";

export const Reset = createGlobalStyle`

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #000;
}

@font-face {
  font-family: "Roboto";
  src: 
    url(${RobotoRegular}) format("woff2");
}

body{
  font-family: 'Roboto', sans-serif;
}

body header,
body main,
body footer {
  line-height: 2;
}

button {
  cursor: pointer;
}

button,
input,
textarea {
  border: none;
}

:focus {
  outline: none !important;
}

img {
  display: block;
  max-width: 100%;
}

input,
textarea {
  outline: none;
}

ol,
ul {
  list-style: none;
}

textarea {
  resize: none;
}
`;
