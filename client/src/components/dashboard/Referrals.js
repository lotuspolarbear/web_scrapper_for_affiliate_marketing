import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { NotificationManager } from "react-notifications";
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
import TableHead from "@material-ui/core/TableHead";

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5
	},
	customBtn: {
		"&:focus": {
			outline: "none"
		}
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
				<IconButton
					className={classes.customBtn}
					onClick={this.handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label='First Page'
				>
					{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
				</IconButton>
				<IconButton
					className={classes.customBtn}
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label='Previous Page'
				>
					{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				</IconButton>
				<IconButton
					className={classes.customBtn}
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label='Next Page'
				>
					{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</IconButton>
				<IconButton
					className={classes.customBtn}
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

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: "RGBA(0, 0, 0, 0.2)",
		color: theme.palette.common.black,
		fontSize: 14
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 500
	},
	row: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.background.default
		}
	},
	tableWrapper: {
		overflowX: "auto"
	},
	customFont: {
		fontSize: 16
	},
	customBtn: {
		"&:focus": {
			outline: "none"
		}
	}
});

class Referrals extends React.Component {
	state = {
		page: 0,
		rowsPerPage: 20,
		tableData: [],
		selectedId: "",
		isLoading: false
	};

	constructor(props) {
		super(props);
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	async componentDidMount() {
		axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
		let th = this;
		if (this.mounted) {
			if (this.props.id) {
				await this.setState({ isLoading: true });
				await axios.post("/api/referrals/getReferrals", { subAcctId: this.props.id }).then(res => {
					if(res.data.success) {
						this.setState({
							tableData: res.data.referrals,
							page: 0,
							isLoading: false
						});
					} else {
						this.setState({
							isLoading: false
						});
						NotificationManager.error(res.data.msg, "Error!", 5000);
					}					
				})
				.catch(function (error) {
					if (error.response.status === 403) {
						//th.props.history.push('/logout')
						window.location.reload();
					}
				});
			}
		}
	}

	async componentWillReceiveProps(nextProps) {
		axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
		if (nextProps.id !== "" && this.state.selectedId !== nextProps.id) {
			await this.setState({ selectedId: nextProps.id, isLoading: true });
			await axios.post("/api/referrals/getReferrals", { subAcctId: this.props.id }).then(res => {
				if(res.data.success) {
					this.setState({
						tableData: res.data.referrals,
						page: 0,
						isLoading: false
					});
				} else {
					this.setState({
						isLoading: false
					});
					NotificationManager.error(res.data.msg, "Error!", 5000);
				}					
			})
			.catch(function (error) {
				if (error.response.status === 403) {
					//th.props.history.push('/logout')
					window.location.reload();
				}
			});
		} else if (nextProps.id === "") {
			await this.setState({ selectedId: "", tableData: [], page: 0, isLoading: false });
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
		const { rowsPerPage, page, tableData } = this.state;
		
		return (
			<Paper className={classes.root}>
				{this.state.isLoading && (
					<div className='col-md-4 offset-md-4' style={{ textAlign: "center", fontSize: 20, padding: 40 }}>
						<div className='spinner-border' style={{ width: "3rem", height: "3rem" }} role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
				)}
				{this.state.tableData.length !== 0 && !this.state.isLoading && (
					<div className={classes.tableWrapper}>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<CustomTableCell padding='checkbox' align='center'>
										Reference
									</CustomTableCell>
									<CustomTableCell padding='checkbox' align='center'>
										Amount
									</CustomTableCell>
									<CustomTableCell padding='checkbox' align='center'>
										Variation ID
									</CustomTableCell>
									<CustomTableCell padding='checkbox' align='center' width='400px'>
										Description
									</CustomTableCell>
									<CustomTableCell padding='checkbox' align='center'>
										Status
									</CustomTableCell>
									<CustomTableCell padding='checkbox' align='center' width='150px'>
										Date
									</CustomTableCell>
									<CustomTableCell padding='checkbox' align='center' width='150px'>
										Scrapped Date
									</CustomTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
									<TableRow className={classes.row} key={index}>
										<TableCell padding='checkbox' className={classes.customFont} align='center'>
											{row.refferId}
										</TableCell>
										<TableCell padding='checkbox' className={classes.customFont} align='center'>
											${row.amount}
										</TableCell>
										<TableCell padding='checkbox' className={classes.customFont} align='center'>
											{row.variationId}
										</TableCell>
										<TableCell padding='checkbox' className={classes.customFont} align='left'>
											{row.description}
										</TableCell>
										<TableCell padding='checkbox' className={classes.customFont} align='center'>
											{row.status}
										</TableCell>
										<TableCell padding='checkbox' className={classes.customFont} align='center'>
											{row.refDate}
										</TableCell>
										<TableCell padding='checkbox' className={classes.customFont} align='center'>
											{row.scrappedDate}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[20, 30, 50, 100]}
										colSpan={6}
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
				)}

				{this.state.tableData.length === 0 && !this.state.isLoading && (
					<div className='row'>
						<div
							className='col-md-4 offset-md-4'
							style={{ textAlign: "center", fontSize: 20, padding: 40 }}
						>
							No Data
						</div>
					</div>
				)}
			</Paper>
		);
	}
}

Referrals.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Referrals);
