import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {NavLink, withRouter} from "react-router-dom";
import YIcon from '../assets/y-combinator-50.png';
import '../styles/Header.scss'


const Navigation = props => {
    const activeStyle = { color: "blue" };
    return (
        <nav>
            <NavLink to={`/top`} activeStyle={activeStyle}>
                Home
            </NavLink>
            {" | "}
            <NavLink to={`/best`} activeStyle={activeStyle}>
                Best
            </NavLink>
            {" | "}
            <NavLink to={`/new`} activeStyle={activeStyle}>
                New
            </NavLink>
        </nav>
    );
};



const Header = () => {
    return (
        <AppBar position="sticky">
            <div className="icon-title-container">
                <img className="hackerfeed-icon" src={YIcon} alt=""/>
                <span className="hackerfeed-title">{'Hacker News Stories'}</span>
            </div>
            <Navigation/>
        </AppBar>
    )
}

export default withRouter(Header);