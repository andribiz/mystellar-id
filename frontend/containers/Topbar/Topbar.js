import React, {Component} from "react";
// import { connect } from "react-redux";
import {Layout} from "antd";
import appActions from "../../redux/app/actions";
import TopbarNotification from "./topbarNotification";
import TopbarUser from "./topbarUser";
import TopbarWrapper from "./topbar.style";
import Button from "../../elements/Button";
import {Icon} from "react-icons-kit";
import Fade from "react-reveal/Fade";
import {MenuArea} from "../Navbar/navbar.style";


const Topbar = ({
					toggleCollapsed,
					collapsed,
					openDrawer
                }) => {
    const isCollapsed = collapsed && !openDrawer;

    const {Header} = Layout;

    const styling = {
        position: "fixed",
        width: "100%",
        height: 70
    };
    return (
        <TopbarWrapper>
            <Header
                style={styling}
                className={
                    isCollapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
                }
            >
                <div className="isoLeft">
                    <button
                        className={
                            isCollapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
                        }
                        style={{color: `rgb(50, 51, 50)`}}

                        onClick={toggleCollapsed}
                    />
                </div>

                <ul className="isoRight">
                    <li
                        onClick={() => this.setState({selectedItem: "notification"})}
                        className="isoNotify"
                    >
                        <TopbarNotification/>
                    </li>

                    <li
                        onClick={() => this.setState({selectedItem: "user"})}
                        className="isoUser"
                    >
                        <TopbarUser/>
                    </li>
                </ul>
            </Header>
        </TopbarWrapper>
    );
};

export default Topbar;
