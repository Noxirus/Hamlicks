import React, { Component } from "react";
import { getUsers, deleteUser } from "../services/userService";
import auth from "../services/authService";
import UsersTable from "./usersTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//This is the flavours component that will display all the flavours and handle the various requests
class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedType: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    //Check to make sure the user is admin before letting them onto this page
    //TODO should it be a 404 not found? Or inform them they don't have access?
    const token = await auth.getCurrentUser();
    if (!token.isAdmin) return this.props.history.replace("/not-found");
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  //TODO Make a window pop up to confirm this should happen
  handleDelete = async (user) => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter((m) => m._id !== user._id);
    this.setState({ users });

    try {
      await deleteUser(user._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted");

      this.setState({ users: originalUsers });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      users: allUsers,
    } = this.state;

    let filtered = allUsers;
    if (searchQuery) {
      filtered = allUsers.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { length: count } = this.state.users;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const user = auth.getCurrentUser();
    if (count === 0)
      return (
        <div>
          {/*TODO this button is repeated twice */}
          {user && user.isAdmin && (
            <Link
              to="/flavoursEdit/new"
              className="btn btn-primary"
              stye={{ marginBottom: 20 }}
            >
              New User
            </Link>
          )}
          <p>Somehow there are no users</p>
        </div>
      );

    const { totalCount, data: users } = this.getPageData();

    return (
      <div className="row">
        <div className="col">
          {user && user.isAdmin && (
            <Link
              to="/flavoursEdit/new"
              className="btn btn-primary"
              stye={{ marginBottom: 20 }}
            >
              New User
            </Link>
          )}
          <p>Currently {totalCount} users.</p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <UsersTable
            users={users}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Users;
