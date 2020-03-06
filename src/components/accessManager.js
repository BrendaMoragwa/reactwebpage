import React, { Component } from 'react';

class Access extends Component {
  permissions = window.roles;

  state = {
    authorized:
      window.user &&
      window.user.group.id &&
      ((this.permissions[this.props.permission] &&
        this.permissions[this.props.permission].indexOf(
          window.user.group.id
        ) !== -1) ||
        this.props.permission === 'all')
  };

  render() {
    // console.log(this.props.permission, this.permissions[this.props.permission]);
    return this.state.authorized ? <>{this.props.children}</> : <></>;
  }
}

export default Access;
