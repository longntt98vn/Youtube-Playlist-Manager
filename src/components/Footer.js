import React, { Component } from 'react';
import * as routes from "../constants/routes"
import {Link} from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <div className="container">
                        <p style={{ color: "white" }}>© Your Website 2020. All Rights Reserved.</p>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link to={routes.LANDING}>Giới thiệu</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to={routes.LANDING}>Liên hệ</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to={routes.LANDING}>Góp ý</Link>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;