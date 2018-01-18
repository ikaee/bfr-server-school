import React from "react";

const Header = ({title, date}) =>

    <header class="header white-bg">
        <div class="sidebar-toggle-box">
            <i class="fa fa-bars"></i>
        </div>
        <a href="/" class="logo">{title}<span>{date}</span></a>
    </header>
export default Header;