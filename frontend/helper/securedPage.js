import React, { Component } from 'react';
// import redirect from '../../helpers/redirect';
import {AdminCSS} from '../assets/css/admin-style';
import LayoutConsole from "../containers/LayoutConsole/layout"

// import { getCookie } from '../../helpers/session';

// import 'isomorphic-unfetch';

export default ComposedComponent => props => {
        // static async getInitialProps(context) {
        //     const isLoggedIn = getCookie('id_token', context.req) ? true : false;
        //     if (!isLoggedIn) {
        //         redirect(context, '/');
        //     }
        //     return {isLoggedIn};
        // }

        return (
          <LayoutConsole>
             <ComposedComponent {...props} />
          </LayoutConsole>
        );
};
