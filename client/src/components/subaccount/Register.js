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
			merchants: [],
			merchantId: "",
			subAcctId: "",
			websiteUrl: "",
			name: "",
			affUrl: "",
			loginUrl: "",
			username: "",
			password: "",
			// confirm_password: "",
			cronSched: "",
			isRegistered: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		await axios.get("/api/merchants/getAllMerchants").then(res => {
			if (res.data.length === 0) {
				this.setState({ merchants: "no result" });
			} else {
				this.setState({
					merchants: res.data.map(merchant => {
						return { value: merchant._id, name: merchant.name };
					})
				});
				this.setState({ merchantId: this.state.merchants[0].value });
			}
		});
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		// if (this.state.password !== this.state.confirm_password) {
		// 	NotificationManager.error("Password should be confirmed", "Error!", 5000);
		// } else {
		axios
			.post("/api/subaccounts/register", {
				merchantId: this.state.merchantId,
				subAcctId: this.state.subAcctId,
				websiteUrl: this.state.websiteUrl,
				name: this.state.name,
				affUrl: this.state.affUrl,
				loginUrl: this.state.loginUrl,
				username: this.state.username,
				password: this.state.password,
				cronSched: this.state.cronSched
			})
			.then(res => {
				if (res.data.success) {
					NotificationManager.success(res.data.msg, "Notification!", 5000);
					this.setState({ isRegistered: true });
					this.props.history.push("/Dashboard");
				} else {
					NotificationManager.error(res.data.msg, "Error!", 5000);
				}
			});
		// }
	}
	handleScriptCreate() {
		// this.setState({ scriptLoaded: false })
	}

	handleScriptError() {
		// this.setState({ scriptError: true })
	}

	handleScriptLoad() {
		// this.setState({ scriptLoaded: true })
		let th = this;
		$(function() {
			// Initialize DOM with cron builder with options
			$("#cron-expression").cronBuilder({
				selectorLabel: "Select time period:  ",
				onChange: function(expression) {
					th.setState({ cronSched: expression });
					$("#expression-result").text(expression);
				}
			});
		});
	}
	render() {
		const { isRegistered } = this.state;
		if (this.state.merchants === "no result") {
			return (
				<div className='container text-center'>
					<h3 className='h3 mt-100 mb-5 font-weight-normal'>Please Register Merchant Account First</h3>
					<a className='btn btn-lg btn-info' href='/merchant/register'>
						Register Merchant Account
					</a>
				</div>
			);
		} else {
			return (
				<React.Fragment>
					{isRegistered && <Redirect to='/login' />}
					{!isRegistered && (
						<React.Fragment>
							<Script
								url='/assets/jquery-cron-quartz.min.js'
								onCreate={this.handleScriptCreate.bind(this)}
								onError={this.handleScriptError.bind(this)}
								onLoad={this.handleScriptLoad.bind(this)}
							/>

							<div className='container'>
								<div className='row'>
									<div className='col-md-6 mt-100 mx-auto'>
										<ValidatorForm ref='form' onSubmit={this.onSubmit}>
											<h3 className='h3 mb-5 font-weight-normal text-center'>
												Please Register New Sub Account
											</h3>
											<div className='form-group row'>
												<label htmlFor='merchantId' className='col-sm-4 col-form-label'>
													Select Merchant:
												</label>
												<div className='col-sm-8'>
													<Input
														type='select'
														name='merchantId'
														value={this.state.merchantId}
														onChange={e => this.setState({ merchantId: e.target.value })}
													>
														{this.state.merchants.map(merchant => (
															<option key={merchant.value} value={merchant.value}>
																{merchant.name}
															</option>
														))}
													</Input>
												</div>
											</div>
											<div className='form-group row'>
												<label htmlFor='subAcctId' className='col-sm-4 col-form-label'>
													Sub Account ID:
												</label>
												<div className='col-sm-8'>
													<TextValidator
														onChange={this.onChange}
														name='subAcctId'
														className='form-control'
														value={this.state.subAcctId}
														validators={["required"]}
														errorMessages={["This field is required"]}
													/>
												</div>
											</div>
											<div className='form-group row'>
												<label htmlFor='websiteUrl' className='col-sm-4 col-form-label'>
													Website URL:
												</label>
												<div className='col-sm-8'>
													<TextValidator
														onChange={this.onChange}
														name='websiteUrl'
														className='form-control'
														value={this.state.websiteUrl}
														validators={["required"]}
														errorMessages={["This field is required"]}
													/>
												</div>
											</div>
											<div className='form-group row'>
												<label htmlFor='name' className='col-sm-4 col-form-label'>
													Name:
												</label>
												<div className='col-sm-8'>
													<TextValidator
														onChange={this.onChange}
														name='name'
														className='form-control'
														value={this.state.name}
														validators={["required"]}
														errorMessages={["This field is required"]}
													/>
												</div>
											</div>
											<div className='form-group row'>
												<label htmlFor='affUrl' className='col-sm-4 col-form-label'>
													Affiliate URL:
												</label>
												<div className='col-sm-8'>
													<TextValidator
														onChange={this.onChange}
														name='affUrl'
														className='form-control'
														value={this.state.affUrl}
														validators={["required"]}
														errorMessages={["This field is required"]}
													/>
												</div>
											</div>
											<div className='form-group row'>
												<label htmlFor='loginUrl' className='col-sm-4 col-form-label'>
													Login URL:
												</label>
												<div className='col-sm-8'>
													<TextValidator
														onChange={this.onChange}
														name='loginUrl'
														className='form-control'
														value={this.state.loginUrl}
														validators={["required"]}
														errorMessages={["This field is required"]}
													/>
												</div>
											</div>
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
											{/* <div className='form-group row'>
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
											</div> */}
											<div className='form-group row'>
												<label htmlFor='cronSched' className='col-sm-4 col-form-label'>
													Cron Schedule:
												</label>
												<div className='col-sm-8'>
													<div className='demo'>
														<div id='cron-expression' className='cron-builder' />
														<div className='alert alert-warning'>
															<p>
																<strong>Cron Expression:</strong>{" "}
																<span id='expression-result' />
															</p>
														</div>
													</div>
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
						</React.Fragment>
					)}
				</React.Fragment>
			);
		}
	}
}

export default Register;
