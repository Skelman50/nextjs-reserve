import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import Layout from "../components/_App/Layout";
import { redirectUser } from "../utils/auth";
import { baseURL } from "../utils/baseUrl";
import { useEffect } from "react";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.addEventListener("storage", syncLogout);
  }, []);

  const syncLogout = e => {
    if (e.key === "logout") {
      Router.push("/login");
    }
  };
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {};
  const { token } = parseCookies(ctx);
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  if (!token) {
    const isProtectedRoute =
      ctx.pathname === "/account" || ctx.pathname === "/create";
    if (isProtectedRoute) {
      redirectUser(ctx, "/login");
    }
  } else {
    try {
      const payload = { headers: { Authorization: token } };
      const url = `${baseURL}/account`;
      const response = await axios.get(url, payload);
      const user = response.data;
      const isRoot = user.role === "root";
      const isAdmin = user.role === "admin";
      const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === "/create";
      if (isNotPermitted) {
        redirectUser(ctx, "/");
      }
      pageProps.user = user;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/login");
      console.error("Error getting current user", error);
    }
  }

  return { pageProps };
};

export default MyApp;
