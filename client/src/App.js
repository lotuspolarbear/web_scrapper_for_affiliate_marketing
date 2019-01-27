import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Dashboard from "./components/dashboard/Dashboard";
import MerchantRegister from "./components/merchant/Register";
import MerchantManagement from "./components/merchant/Management";
import SubaccountRegister from "./components/subaccount/Register";
import SubaccountManagement from "./components/subaccount/Management";

import AppNavbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import "./App.css";

class App extends Component {
	render() {
		return (
			<Router>
				<div className='App'>
					<NotificationContainer />
					<AppNavbar />

					<Route exact path='/' component={Dashboard} />
					<Route exact path='/Dashboard' component={Dashboard} />
					<Route exact path='/merchant/register' component={MerchantRegister} />
					<Route exact path='/merchant/management' component={MerchantManagement} />
					<Route exact path='/subaccount/register' component={SubaccountRegister} />
					<Route exact path='/subaccount/management' component={SubaccountManagement} />
				</div>
			</Router>
		);
	}
}

export default App;
