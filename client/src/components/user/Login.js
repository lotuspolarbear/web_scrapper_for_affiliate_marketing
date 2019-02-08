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

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			isLoggedin: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	// async componentDidMount() {
	// 	await axios.get("/api/merchants/getAllMerchants").then(res => {
	// 		if (res.data.length === 0) {
	// 			this.setState({ merchants: "no result" });
	// 		} else {
	// 			this.setState({
	// 				merchants: res.data.map(merchant => {
	// 					return { value: merchant._id, name: merchant.name };
	// 				})
	// 			});
	// 			this.setState({ merchantId: this.state.merchants[0].value });
	// 		}
	// 	});
	// }

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		axios
			.post("/api/users/login", {
				username: this.state.username,
				password: this.state.password
			})
			.then(res => {
				if (res.data.success) {
					NotificationManager.success(res.data.detail, res.data.title, 3000);
					this.setState({ isLoggedin: true });
					localStorage.setItem("user", this.state.username);
					this.props.onChange(true);

					// this.handler();

					// getter
					// localStorage.getItem('myData');
				} else {
					NotificationManager.error(res.data.errors[0].detail, res.data.errors[0].title, 3000);
				}
			});
	}
	handleScriptCreate() {
		// this.setState({ scriptLoaded: false })
	}

	handleScriptError() {
		// this.setState({ scriptError: true })
	}
	render() {
		const { isLoggedin } = this.state;
		return (
			<React.Fragment>
				{isLoggedin && <Redirect to='/Dashboard' />}
				{!isLoggedin && (
					<div className='container'>
						<div className='row'>
							<div className='col-md-6 mt-100 mx-auto'>
								<ValidatorForm ref='form' onSubmit={this.onSubmit}>
									<h3 className='h3 mb-5 font-weight-normal text-center'>Log in</h3>
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
										<div className='col-sm-8 offset-sm-4'>
											<button type='submit' className='btn btn-lg btn-info btn-block'>
												Login
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

export default Login;
