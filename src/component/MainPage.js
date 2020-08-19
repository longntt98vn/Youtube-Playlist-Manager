import React, { Component } from 'react';

class MainPage extends Component {
    render() {
        return (
            <div>
                <div class="container text-center text-white ">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email</th>
                                <th>image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.googleName}</td>
                                <td>{this.props.googleEmail}</td>
                                <td><img src={this.props.googleImage} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MainPage;