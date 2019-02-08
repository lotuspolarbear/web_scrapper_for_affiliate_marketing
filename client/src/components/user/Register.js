import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import { Input } from "reactstrap";
import axios from "axios";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../TextValidator";
import Script from "react-load-script";
import $ from "jquery";
window.$ = $;
global.jQuery = $;

class Register extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			confirm_password: "",
			isRegistered: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		if (this.state.password !== this.state.confirm_password) {
			NotificationManager.error("Password should be confirmed.", "Error!", 5000);
		} else {
			axios
				.post("/api/users/register", {
					username: this.state.username,
					password: this.state.password
				})
				.then(res => {
					if (res.data.success) {
						NotificationManager.success(res.data.detail, res.data.title, 5000);
						this.setState({ isRegistered: true });
					} else {
						NotificationManager.error(res.data.errors[0].detail, res.data.errors[0].title, 5000);
					}
				});
		}
	}

	render() {
		const { isRegistered } = this.state;
		return (
			<React.Fragment>
				{isRegistered && <Redirect to='/login' />}
				{!isRegistered && (
					<div className='container'>
						<div className='row'>
							<div className='col-md-6 mt-100 mx-auto'>
								<ValidatorForm ref='form' onSubmit={this.onSubmit}>
									<h3 className='h3 mb-5 font-weight-normal text-center'>Please Register New User</h3>
									<div className='form-group row'>
										<label htmlFor='username' className='col-sm-4 col-form-label'>
											Username:
										</label>
										<div className='col-sm-8'>
											<TextValidator
												onChange={this.onChange}
												name='username'
												className='form-control'
												value={this.state.username}
												validators={["required"]}
												errorMessages={["This field is required"]}
											/>
										</div>
									</div>
									<div className='form-group row'>
										<label htmlFor='password' className='col-sm-4 col-form-label'>
											Password:
										</label>
										<div className='col-sm-8'>
											<TextValidator
												onChange={this.onChange}
												name='password'
												type='password'
												className='form-control'
												value={this.state.password}
												validators={["required"]}
												errorMessages={["This field is required"]}
											/>
										</div>
									</div>
									<div className='form-group row'>
										<label htmlFor='password' className='col-sm-4 col-form-label'>
											Confirm Password:
										</label>
										<div className='col-sm-8'>
											<TextValidator
												onChange={this.onChange}
												name='confirm_password'
												type='password'
												className='form-control'
												value={this.state.confirm_password}
												validators={["required"]}
												errorMessages={["This field is required"]}
											/>
										</div>
									</div>
									<div className='form-group row'>
										<div className='col-sm-8 offset-sm-4'>
											<button type='submit' className='btn btn-lg btn-info btn-block'>
												Register
											</button>
										</div>
									</div>
								</ValidatorForm>
							</div>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default Register;
