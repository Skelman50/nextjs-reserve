import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Fragment } from "react";
import NProgress from "nprogress";
import { INDEX, CART, CREATE, ACCOUNT, LOGIN, SIGNUP } from "../../routes";
import { handleLogout } from "../../utils/auth";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({ user }) {
  const router = useRouter();

  const isActive = route => {
    return route === router.pathname;
  };

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href={INDEX}>
          <Menu.Item header active={isActive(INDEX)} style={{ height: "100%" }}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: "1em" }}
            />
            ReactReserve
          </Menu.Item>
        </Link>
        <Link href={CART}>
          <Menu.Item header active={isActive(CART)} style={{ height: "100%" }}>
            <Icon name="cart" size="large" />
            Cart
          </Menu.Item>
        </Link>
        {user && (
          <Fragment>
            {(user.role === "admin" || user.role === "root") && (
              <Link href={CREATE}>
                <Menu.Item
                  header
                  active={isActive(CREATE)}
                  style={{ height: "100%" }}
                >
                  <Icon name="add square" size="large" />
                  Create
                </Menu.Item>
              </Link>
            )}
            <Link href={ACCOUNT}>
              <Menu.Item
                header
                active={isActive(ACCOUNT)}
                style={{ height: "100%" }}
              >
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item header onClick={handleLogout} style={{ height: "100%" }}>
              <Icon name="sign out" size="large" />
              Logout
            </Menu.Item>
          </Fragment>
        )}
        {!user && (
          <Fragment>
            <Link href={LOGIN}>
              <Menu.Item
                header
                active={isActive(LOGIN)}
                style={{ height: "100%" }}
              >
                <Icon name="sign in" size="large" />
                Login
              </Menu.Item>
            </Link>
            <Link href={SIGNUP}>
              <Menu.Item
                header
                active={isActive(SIGNUP)}
                style={{ height: "100%" }}
              >
                <Icon name="signup" size="large" />
                Signup
              </Menu.Item>
            </Link>
          </Fragment>
        )}
      </Container>
    </Menu>
  );
}

export default Header;
