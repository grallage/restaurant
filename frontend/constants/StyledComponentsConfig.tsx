import { createGlobalStyle, ThemeProvider } from "styled-components";

const NAV_HEIGHT = "56px";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
  }
  body {    
    /* max-width: 1440px; */
    /* display: flex; */
    /* justify-content: center;
    margin: auto; */
    /* min-height: 200vh; */
    padding-top: ${NAV_HEIGHT};
  }
  img {
    user-select: none;
  }

  @media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms;
    scroll-behavior: auto !important;
    transition-delay: 0 !important;
  }
}

`;

const theme = {
  colors: {
    primary: "#FF705C",
    secondary: "#7C7C7C",
    light: "#f9f9f9",
    gray: "#7c7c7c",
  },
  navbar: {
    height: NAV_HEIGHT,
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },
};

export const Provider = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
export default Provider;
