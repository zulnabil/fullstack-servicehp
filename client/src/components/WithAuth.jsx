// import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function WithAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      fetch('https://us-central1-uniq-servishp.cloudfunctions.net/app/api/access-verify')
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return 'You are not logged-in. Will redirect to login page.';
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}