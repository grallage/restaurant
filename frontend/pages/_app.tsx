// import "../styles/globals.css";
import { AppProps } from "next/app";
import StyledComponentsProvider from "../constants/StyledComponentsConfig";
import { Provider as NextAuthProvider } from "next-auth/client";
import { NotificationsContainer } from "constants/Notifications";
import "react-toastify/dist/ReactToastify.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <StyledComponentsProvider>
        <Component {...pageProps} />
        <NotificationsContainer />
      </StyledComponentsProvider>
    </NextAuthProvider>
  );
}

// v1
// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <GlobalStyle />
//       <ThemeProvider theme={theme}>
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </>
//   );
// }
