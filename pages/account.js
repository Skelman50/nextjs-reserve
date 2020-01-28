import { Fragment } from "react";
import axios from "axios";

import AccountHeader from "../components/Account/AccountHeader";
import AccountOrders from "../components/Account/AccountOrders";
import { parseCookies } from "nookies";
import { baseURL } from "../utils/baseUrl";
import { accordionPanel } from "../utils/accordionPanel";
import AccountPermissions from "../components/Account/AccountPermissions";

function Account({ user, orders }) {
  const mapOrdersToPanels = orders => {
    return orders.map(accordionPanel);
  };
  return (
    <Fragment>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} mapOrdersToPanels={mapOrdersToPanels} />
      {user.role === "root" && <AccountPermissions currentUser={user._id} />}
    </Fragment>
  );
}

Account.getInitialProps = async function(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseURL}/orders`;
  const response = await axios.get(url, payload);
  return response.data;
};

export default Account;
