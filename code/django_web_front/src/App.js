import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const constants = {
  "url": "http://localhost:8000/api/profile/?format=json"
}

class Form extends React.Component {
  render() {
    return (
      <form id="post-data" onSubmit={this.props.handleSubmit}>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text" name="name"
              id="name"
              placeholder="Name"
              value={this.props.name}
              onChange={this.props.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={this.props.email}
              onChange={this.props.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className="textarea"
              name="message"
              id="body"
              cols="10"
              rows="3"
              placeholder="Message"
              value={this.props.message}
              onChange={this.props.handleChange}>
            </textarea>
          </div>
        </div>
        <input
          className="button is-fullwidth is-primary is-outlined"
          type="submit"
          value="SEND POST"
        />
      </form>
    );
  }
}

class UserList extends React.Component {
  renderRow() {
    const listItems = this.props.users.map((u) =>
      <tr key={u.id}>
        <td>{u.id}</td>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.message}</td>
        <td>{u.created_at}</td>
      </tr>
    );
    return(
      listItems
    );
  }
  render() {
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRow()}
        </tbody>
      </table>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersLength: 0,
      name: "",
      email: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'name') {
      this.setState({name: event.target.value});
    }
    else if (event.target.name === 'email') {
      this.setState({email: event.target.value});
    }
    else if (event.target.name === 'message') {
      this.setState({message: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, message } = this.state;
    const conf = {
      'name': name,
      'email': email,
      'message': message
    };
    axios.post(constants["url"], conf)
    .then(response => {
      this.state.users.unshift(response.data);
      this.setState({
        users: this.state.users,
        usersLength: this.state.users.length,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    axios.get(constants["url"])
    .then(response => {
      this.setState({
        users: response.data.reverse(),
        usersLength: response.data.length,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="notification">
            This is my react-django app.
          </div>
        </div>
        <div className="column is-6">
          <Form
            name={this.state.name}
            email={this.state.email}
            message={this.state.message}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div className="column is-12" id="user-table">
          <p>There are {this.state.usersLength} users.</p>
          <UserList
            users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default App;
