import React, { Component } from "react";
import { getFlavours, deleteFlavour } from "../services/flavourService";
import auth from "../services/authService";
import * as userService from "../services/userService";
import FlavoursTable from "./flavoursTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getTypes } from "../services/typeService";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//This is the flavours component that will display all the flavours and handle the various requests
class Flavours extends Component {
  state = {
    flavours: [],
    types: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedType: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getTypes();
    const types = [{ _id: "", name: "All Types" }, ...data];

    const { data: flavours } = await getFlavours();
    this.setState({ flavours, types });
  }

  handleDelete = async (flavour) => {
    const originalFlavours = this.state.flavours;
    const flavours = originalFlavours.filter((m) => m._id !== flavour._id);
    this.setState({ flavours });

    try {
      await deleteFlavour(flavour._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This flavour has already been deleted");

      this.setState({ flavours: originalFlavours });
    }
  };

  handleLike = async (flavour) => {
    const flavours = [...this.state.flavours];
    const index = flavours.indexOf(flavour);
    flavours[index] = { ...flavours[index] };
    flavours[index].liked = !flavours[index].liked;
    let user = auth.getCurrentUser();
    //Liking a flavour
    if (flavours[index].liked && user) {
      delete user.iat;
      user.favorites.push(flavour._id);
      const response = await userService.saveUser(user);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //Unliking a flavour
    } else if (!flavours[index].liked && user) {
      delete user.iat;
      //TODO Pop just removed the end, splice will remove all based on a range
      _.remove(user.favorites, function (e) {
        return e === flavour._id;
      });
      console.log(user.favorites);
      const response = await userService.saveUser(user);
      auth.loginWithJwt(response.headers["x-auth-token"]);
    }
    this.setState({ flavours });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTypeSelect = (type) => {
    this.setState({ selectedType: type, searchQuery: "", currentPage: 1 });
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
      selectedType,
      searchQuery,
      flavours: allFlavours,
    } = this.state;

    let filtered = allFlavours;
    if (searchQuery) {
      filtered = allFlavours.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedType && selectedType._id) {
      filtered = allFlavours.filter((m) => m.type._id === selectedType._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const flavours = paginate(sorted, currentPage, pageSize);
    //Get users liked flavours
    const user = auth.getCurrentUser();
    if (user) {
      if (user.favorites.length === 0) {
        return { totalCount: filtered.length, data: flavours };
      }
      for (let i = 0; i < user.favorites.length; i++) {
        for (let y = 0; y < flavours.length; y++) {
          if (user.favorites[i] === flavours[y]._id) {
            flavours[y].liked = true;
          }
        }
      }
    }
    return { totalCount: filtered.length, data: flavours };
  };

  render() {
    const { length: count } = this.state.flavours;
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
              New Flavour
            </Link>
          )}
          <p>There are no flavours in stock.</p>
        </div>
      );

    const { totalCount, data: flavours } = this.getPageData();

    return (
      <div className="row back">
        <div className="col-md-2 col-sm-4">
          <ListGroup
            items={this.state.types}
            selectedItem={this.state.selectedType}
            onItemSelect={this.handleTypeSelect}
          />
        </div>
        <div className="col">
          {user && user.isAdmin && (
            <Link
              to="/flavoursEdit/new"
              className="btn btn-primary"
              stye={{ marginBottom: 20 }}
            >
              New Flavour
            </Link>
          )}
          {totalCount === 1 && <p>Currently {totalCount} flavour in stock.</p>}
          {totalCount > 1 && <p>Currently {totalCount} flavours in stock.</p>}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <FlavoursTable
            flavours={flavours}
            sortColumn={sortColumn}
            onLike={this.handleLike}
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

export default Flavours;
