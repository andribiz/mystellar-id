import React from 'react';
import App from 'next/app';
import LayoutConsole from "../containers/LayoutConsole";

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        console.log(ctx.pathname);

        const props = {pageProps: {}, staticPage: true};

        if (ctx.pathname.startsWith("/console")) {
            props.staticPage = false;
        }
        return props
    }

    render() {
        const {Component, pageProps, staticPage} = this.props;

        return staticPage ?
         (
                <Component {...pageProps}/>
        )
        :
         (
            <LayoutConsole>
                <Component {...pageProps}/>
            </LayoutConsole>
        );
    }
}

export default MyApp;