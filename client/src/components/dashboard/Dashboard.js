import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Statistics from "./Statistics";
import Referrals from "./Referrals";
import Payouts from "./Payouts";
import Visits from "./Visits";
import { Input } from "reactstrap";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

function TabContainer(props) {
	return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3
	}
});

class Dashboard extends Component {
	state = {
		value: 0,
		subAccounts: [],
		selectedAccountId: ""
	};

	async componentDidMount() {
		await axios.get("/api/subaccounts/getAllSubAccounts").then(res => {
			if (res.data.length === 0) {
				this.setState({ subAccounts: "no result" });
			} else {
				this.setState({
					subAccounts: res.data.map(account => {
						return { value: account._id, name: account.name };
					})
				});
				this.setState({ selectedAccountId: this.state.subAccounts[0].value });
			}
		});
	}

	handleTabChange = (event, value) => {
		this.setState({ value });
	};

	accountChanged = (event, value) => {
		this.setState({ selectedAccountId: event.target.value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			this.state.subAccounts && (
				<Container>
					<Row className='form-group'>
						<label htmlFor='name' className='col-sm-4 col-form-label text-right'>
							Sub Accounts
						</label>
						<Col md={8}>
							<Input md={8} type='select' onChange={this.accountChanged}>
								{this.state.subAccounts.map(account => (
									<option key={account.value} value={account.value}>
										{account.name}
									</option>
								))}
							</Input>
						</Col>
					</Row>
					<Paper className={classes.root}>
						<AppBar position='static'>
							<Tabs
								value={value}
								onChange={this.handleTabChange}
								variant='scrollable'
								scrollButtons='auto'
							>
								<Tab label='Statistics' />
								<Tab label='Referrals' />
								<Tab label='Payouts' />
								<Tab label='Visits' />
							</Tabs>
						</AppBar>
						{value === 0 && (
							<TabContainer>
								<Statistics id={this.state.selectedAccountId} />
							</TabContainer>
						)}
						{value === 1 && (
							<TabContainer>
								<Referrals id={this.state.selectedAccountId} />
							</TabContainer>
						)}
						{value === 2 && (
							<TabContainer>
								<Payouts id={this.state.selectedAccountId} />
							</TabContainer>
						)}
						{value === 3 && (
							<TabContainer>
								<Visits />
							</TabContainer>
						)}
					</Paper>
				</Container>
			)
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
