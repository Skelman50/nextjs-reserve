import { useState, useEffect, useRef } from "react";
import cookie from "js-cookie";
import axios from "axios";

import { baseURL } from "../../utils/baseUrl";
import { Header, Icon, Table, Checkbox } from "semantic-ui-react";
import { formatDate } from "../../utils/formatDate";

function AccountPermissions() {
  const rowNames = ["", "Name", "Email", "Joined", "Updated", "Role"];
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const url = `${baseURL}/users`;
    const token = cookie.get("token");
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
  };

  return (
    <div style={{ margin: "2em 0" }}>
      <Header as="h2">
        <Icon name="settings" />
        Users Permissions
      </Header>
      <Table compact celled definition>
        <TableHeader rowNames={rowNames} />
        <TableBody users={users} />
      </Table>
    </div>
  );
}

export default AccountPermissions;

const TableHeader = ({ rowNames }) => {
  const mapRowNames = rowNames.map((rowName, idx) => (
    <Table.HeaderCell key={idx}>{rowName}</Table.HeaderCell>
  ));
  return (
    <Table.Header>
      <Table.Row>{mapRowNames}</Table.Row>
    </Table.Header>
  );
};

const TableBody = ({ users = [] }) => {
  const mapUsers = users.map(user => (
    <UserPermission key={user._id} user={user} />
  ));
  return <Table.Body>{mapUsers}</Table.Body>;
};

const UserPermission = ({ user }) => {
  const [admin, setAdmin] = useState(user.role === "admin");

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    updadePernission();
  }, [admin]);
  const handleChangePermission = () => {
    setAdmin(prevAdmin => !prevAdmin);
  };

  const updadePernission = async () => {
    try {
      const url = `${baseURL}/account`;
      const role = admin ? "admin" : "user";
      const payload = { _id: user._id, role };
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      await axios.put(url, payload, headers);
    } catch (error) {
      console.error(error);
      setAdmin(prevAdmin => !prevAdmin);
    }
  };
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox toggle onChange={handleChangePermission} checked={admin} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(user.updatedAt)}</Table.Cell>
      <Table.Cell>{admin ? "admin" : "user"}</Table.Cell>
    </Table.Row>
  );
};
