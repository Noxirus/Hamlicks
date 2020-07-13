import React, { Component } from "react";
import auth from "../services/authService";
import Table from "./common/table";
import { Link } from "react-router-dom";

class UsersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
  ];

  editColumn = {
    key: "edit",
    content: (user) => (
      <Link to={`/usersedit/${user._id}`}>
        <button className="btn btn-primary btn-sm">Edit</button>
      </Link>
    ),
  };

  deleteColumn = {
    key: "delete",
    content: (user) => (
      <button
        onClick={() => this.props.onDelete(user)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin)
      this.columns.push(this.editColumn) &&
        this.columns.push(this.deleteColumn);
  }

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
