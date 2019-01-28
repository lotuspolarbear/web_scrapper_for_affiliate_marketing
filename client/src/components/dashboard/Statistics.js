import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import axios from "axios";

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5
	}
});

class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = event => {
		this.props.onChangePage(event, 0);
	};

	handleBackButtonClick = event => {
		this.props.onChangePage(event, this.props.page - 1);
	};

	handleNextButtonClick = event => {
		this.props.onChangePage(event, this.props.page + 1);
	};

	handleLastPageButtonClick = event => {
		this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
	};

	render() {
		const { classes, count, page, rowsPerPage, theme } = this.props;

		return (
			<div className={classes.root}>
				<IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label='First Page'>
					{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
				</IconButton>
				<IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label='Previous Page'>
					{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label='Next Page'
				>
					{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label='Last Page'
				>
					{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
				</IconButton>
			</div>
		);
	}
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 500
	},
	tableCell: {
		fontSize: "1rem"
	},
	tableWrapper: {
		overflowX: "auto"
	}
});

class Statistics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			rowsPerPage: 1,
			selectedId: "",
			tableData: [],
			statisticsTable: [],
			old: {}
		};
	}

	async componentDidMount() {
		if (this.props.id) {
			await axios.post("/api/statistics/getStatistics", { subAcctId: this.props.id }).then(res => {
				this.setState({
					tableData: res.data.statistic,
					old: {},
					page: 0
				});
			});
		}
	}

	async componentWillReceiveProps(nextProps) {
		if (nextProps.id !== "" && this.state.selectedId !== nextProps.id) {
			await this.setState({ selectedId: nextProps.id, old: {} });
			await axios.post("/api/statistics/getStatistics", { subAcctId: this.props.id }).then(res => {
				this.setState({
					tableData: res.data.statistic,
					old: {},
					page: 0
				});
			});
		}
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	render() {
		const { classes } = this.props;
		const { old } = this.state;

		const { rowsPerPage, page, tableData } = this.state;
		// const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableBody>
							<TableRow>
								<TableCell className={classes.tableCell}>
									{tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
										var display = (
											<React.Fragment key={row.visits}>
												<Table className='text-center' style={{ marginBottom: 30 }}>
													<thead
														style={{ backgroundColor: "RGBA(0,0,0,0.1)", color: "black" }}
													>
														<tr>
															<th>Unpaid Referrals</th>
															<th>Paid Referrals</th>
															<th>Visits</th>
															<th>Conversion Rate</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															{(page === 0 ||
																old.unpaidReferrals === row.unpaidReferrals) && (
																<td>{row.unpaidReferrals}</td>
															)}
															{page !== 0 &&
																old.unpaidReferrals !== row.unpaidReferrals && (
																	<td style={{ color: "red" }}>
																		{row.unpaidReferrals}
																	</td>
																)}
															{(page === 0 ||
																old.paidReferrals === row.paidReferrals) && (
																<td>{row.paidReferrals}</td>
															)}
															{page !== 0 && old.paidReferrals !== row.paidReferrals && (
																<td style={{ color: "red" }}>{row.paidReferrals}</td>
															)}
															{(page === 0 || old.visits === row.visits) && (
																<td>{row.visits}</td>
															)}
															{page !== 0 && old.visits !== row.visits && (
																<td style={{ color: "red" }}>{row.visits}</td>
															)}
															{(page === 0 || old.convRate === row.convRate) && (
																<td>{row.convRate}</td>
															)}
															{page !== 0 && old.convRate !== row.convRate && (
																<td style={{ color: "red" }}>{row.convRate}</td>
															)}
														</tr>
													</tbody>
												</Table>
												<Table className='text-center' style={{ marginBottom: 30 }}>
													<thead
														style={{ backgroundColor: "RGBA(0,0,0,0.1)", color: "black" }}
													>
														<tr>
															<th>Unpaid Earnings</th>
															<th>Paid Earnings</th>
															<th>Commission Rate</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															{(page === 0 ||
																old.unpaidEarnings === row.unpaidEarnings) && (
																<td>{row.unpaidEarnings}</td>
															)}
															{page !== 0 &&
																old.unpaidEarnings !== row.unpaidEarnings && (
																	<td style={{ color: "red" }}>
																		{row.unpaidEarnings}
																	</td>
																)}
															{(page === 0 || old.paidEarnings === row.paidEarnings) && (
																<td>{row.paidEarnings}</td>
															)}
															{page !== 0 && old.paidEarnings !== row.paidEarnings && (
																<td style={{ color: "red" }}>{row.paidEarnings}</td>
															)}
															{(page === 0 ||
																old.commissionRate === row.commissionRate) && (
																<td>{row.commissionRate}</td>
															)}
															{page !== 0 &&
																old.commissionRate !== row.commissionRate && (
																	<td style={{ color: "red" }}>
																		{row.commissionRate}
																	</td>
																)}
														</tr>
													</tbody>
												</Table>
												<Table className='text-center'>
													<thead
														style={{ backgroundColor: "RGBA(0,0,0,0.1)", color: "black" }}
													>
														<tr>
															<th>Campaign</th>
															<th>Visits</th>
															<th>Unique Links</th>
															<th>Converted</th>
															<th>Conversion Rate</th>
														</tr>
													</thead>
													<tbody>
														{row.statisticsTable.map((el, key) => {
															if (old.statisticsTable !== undefined) {
																return (
																	<tr key={el.campaign}>
																		{(page === 0 ||
																			old.statisticsTable[key].campaign ===
																				el.campaign) && <td>{el.campaign}</td>}
																		{page !== 0 &&
																			old.statisticsTable[key].campaign !==
																				el.campaign && (
																				<td style={{ color: "red" }}>
																					{el.campaign}
																				</td>
																			)}
																		{(page === 0 ||
																			old.statisticsTable[key].visits ===
																				el.visits) && <td>{el.visits}</td>}
																		{page !== 0 &&
																			old.statisticsTable[key].visits !==
																				el.visits && (
																				<td style={{ color: "red" }}>
																					{el.visits}
																				</td>
																			)}
																		{(page === 0 ||
																			old.statisticsTable[key].uniqueLinks ===
																				el.uniqueLinks) && (
																			<td>{el.uniqueLinks}</td>
																		)}
																		{page !== 0 &&
																			old.statisticsTable[key].uniqueLinks !==
																				el.uniqueLinks && (
																				<td style={{ color: "red" }}>
																					{el.uniqueLinks}
																				</td>
																			)}
																		{(page === 0 ||
																			old.statisticsTable[key].converted ===
																				el.converted) && (
																			<td>{el.converted}</td>
																		)}
																		{page !== 0 &&
																			old.statisticsTable[key].converted !==
																				el.converted && (
																				<td style={{ color: "red" }}>
																					{el.converted}
																				</td>
																			)}
																		{(page === 0 ||
																			old.statisticsTable[key].convRate ===
																				el.convRate) && <td>{el.convRate}</td>}
																		{page !== 0 &&
																			old.statisticsTable[key].convRate !==
																				el.convRate && (
																				<td style={{ color: "red" }}>
																					{el.convRate}
																				</td>
																			)}
																	</tr>
																);
															} else {
																return (
																	<tr key={el.campaign}>
																		<td>{el.campaign}</td>
																		<td>{el.visits}</td>
																		<td>{el.uniqueLinks}</td>
																		<td>{el.converted}</td>
																		<td>{el.convRate}</td>
																	</tr>
																);
															}
														})}
													</tbody>
												</Table>
											</React.Fragment>
										);
										old.unpaidReferrals = row.unpaidReferrals;
										old.paidReferrals = row.paidReferrals;
										old.visits = row.visits;
										old.convRate = row.convRate;
										old.unpaidEarnings = row.unpaidEarnings;
										old.paidEarnings = row.paidEarnings;
										old.commissionRate = row.commissionRate;
										old.statisticsTable = row.statisticsTable;
										return display;
									})}
								</TableCell>
							</TableRow>
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[1]}
									colSpan={3}
									count={tableData.length}
									rowsPerPage={rowsPerPage}
									page={page}
									// SelectProps={{
									// 	native: true
									// }}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActionsWrapped}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</Paper>
		);
	}
}

Statistics.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Statistics);
