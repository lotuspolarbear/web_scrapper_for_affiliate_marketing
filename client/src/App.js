import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Dashboard from "./components/dashboard/Dashboard";
import MerchantRegister from "./components/merchant/Register";
import MerchantManagement from "./components/merchant/Management";
import SubaccountRegister from "./components/subaccount/Register";
import SubaccountManagement from "./components/subaccount/Management";
import Login from "./components/subaccount/Login";
import Logout from "./components/subaccount/Logout";

import AppNavbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedin: false
		};
		// this.handler = this.handler.bind(this);
	}

	onChange = value => {
		this.setState({ isLoggedin: value });
		// this.props.history.push("/");
	};

	componentDidMount() {
		if (localStorage.getItem("user")) {
			this.setState({ isLoggedin: true });
		}
	}

	render() {
		return (
			<Router>
				<div className='App'>
					<NotificationContainer />
					<AppNavbar />

					{this.state.isLoggedin && (
						<React.Fragment>
							<Route exact path='/' component={Dashboard} />
							<Route exact path='/Dashboard' component={Dashboard} />
							<Route exact path='/merchant/management' component={MerchantManagement} />
							<Route exact path='/merchant/register' component={MerchantRegister} />
							<Route exact path='/subaccount/management' component={SubaccountManagement} />
							<Route exact path='/subaccount/register' component={SubaccountRegister} />
							<Route exact path='/logout' render={() => <Logout onChange={this.onChange} />} />
						</React.Fragment>
					)}

					{!this.state.isLoggedin && (
						<React.Fragment>
							<Route exact path='/' render={() => <Login onChange={this.onChange} />} />
						</React.Fragment>
					)}
				</div>
			</Router>
		);
	}
}

export default App;
