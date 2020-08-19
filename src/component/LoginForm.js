import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import MainPage from './MainPage';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            googleName : '',
            googleEmail: '',
            googleImage: ''
        }
    }
     responseGoogle=(response)=>{
         this.setState({
             googleName: response.profileObj.name,
             googleEmail: response.profileObj.email,
             googleImage: response.profileObj.imageUrl,
         });
     }



    render() {

        return (
            <div className="modal-dialog login animated ">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 className="modal-title">Register with</h4>
              </div>
              <div className="modal-body">
                <div className="box">
                  <div className="content">
                    <div className="social ">
                      <GoogleLogin
                        clientId="1045856403970-docj1sij8luggo7mafs7e76tt70ngs23.apps.googleusercontent.com"
                        cookiePolicy={'single_host_origin'}
                        onSuccess={this.responseGoogle}
                      ></GoogleLogin>
                    </div>
                    <div className="division">
                      <div className="line l" />
                      <span>or</span>
                      <div className="line r" />
                    </div>
                    <div className="error" />
                    <div className="form loginBox" style={{ display: 'none' }}>
                      <form method action acceptCharset="UTF-8">
                        <input id="email" className="form-control" type="text" placeholder="Email" name="email" />
                        <input id="password" className="form-control" type="password" placeholder="Password" name="password" />
                        <input className="btn btn-default btn-login" type="button" defaultValue="Login" onclick="loginAjax()" />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="content registerBox" style={{ display: 'block' }}>
                    <div className="form">
                      <form method html="{:multipart=>true}" data-remote="true" action acceptCharset="UTF-8">
                        <input id="email" className="form-control" type="text" placeholder="Email" name="email" />
                        <input id="password" className="form-control" type="password" placeholder="Password" name="password" />
                        <input id="password_confirmation" className="form-control" type="password" placeholder="Repeat Password" name="password_confirmation" />
                        <input className="btn btn-default btn-register" type="button" defaultValue="Create account" name="commit" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="forgot login-footer" style={{ display: 'none' }}>
                  <span>Looking to
              <a href="javascript: showRegisterForm();">create an account</a>
              ?</span>
                </div>
                <div className="forgot register-footer" style={{ display: 'block' }}>
                  <span>Already have an account?</span>
                  <a href="javascript: showLoginForm();">Login</a>
                </div>
              </div>
            </div>
            <div class="container">
                <p>{this.state.googleName}</p>    
                <p>{this.state.googleEmail}</p>    
                <img src={this.state.googleImage}/>

            </div>
          </div>
            
        );
    }
}

export default LoginForm;