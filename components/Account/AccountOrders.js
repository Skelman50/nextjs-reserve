import { Fragment } from "react";
import { Header, Icon, Segment, Button, Accordion } from "semantic-ui-react";
import Link from "next/link";

function AccountOrders({ orders, mapOrdersToPanels }) {
  return (
    <Fragment>
      <Header as="h1" icon>
        <Icon name="folder open" />
        Order History
      </Header>
      {!orders.length && (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            No Past Orders.
          </Header>
          <div>
            <Link href="/">
              <a style={{ color: "white", height: "100%", width: "100%" }}>
                <Button color="orange">View Products</Button>
              </a>
            </Link>
          </div>
        </Segment>
      )}
      {orders.length !== 0 && (
        <Accordion
          fluid
          styled
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
    </Fragment>
  );
}

export default AccountOrders;
