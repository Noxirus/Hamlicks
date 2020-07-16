import React, { Component } from "react";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import "../styles/content.css";

//TODO new flavour button does not show if there are no flavours
class FlavoursTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (flavour) => (
        <Link to={`/flavours/${flavour._id}`}>{flavour.name}</Link>
      ),
    },
    { path: "type.name", label: "Type" },
    { path: "cost", label: "Cost" },
    { path: "licks", label: "Licks" },
    {
      key: "like",
      content: (flavour) => (
        <Like
          liked={flavour.liked}
          onClick={() => this.props.onLike(flavour)}
        />
      ),
    },
  ];

  editColumn = {
    key: "edit",
    content: (flavour) => (
      <Link to={`/flavoursedit/${flavour._id}`}>
        <button className="btn btn-primary btn-sm">Edit</button>
      </Link>
    ),
  };

  deleteColumn = {
    key: "delete",
    content: (flavour) => (
      <button
        onClick={() => this.props.onDelete(flavour)}
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
    const { flavours, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={flavours}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default FlavoursTable;
