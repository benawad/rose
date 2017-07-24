import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';

import { login } from '../mutations';

class Login extends React.Component {
  state = {
    fields: {
      email: '',
      password: '',
    },
  };

  onChange = e => {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = async () => {
    const { data } = await this.props.mutate({
      variables: this.state.fields,
    });

    const { token, refreshToken } = data.login;

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  };

  render() {
    return (
      <form>
        <TextField
          name="email"
          hintText="Email"
          floatingLabelText="Email"
          value={this.state.fields.email}
          onChange={e => this.onChange(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="password"
          hintText="Password"
          floatingLabelText="Password"
          value={this.state.fields.password}
          onChange={e => this.onChange(e)}
          type="password"
          floatingLabelFixed
        />
        <br />
        <RaisedButton label="Submit" onClick={() => this.onSubmit()} primary />
      </form>
    );
  }
}

export default graphql(login)(Login);
