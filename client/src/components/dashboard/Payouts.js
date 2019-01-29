import React from "react";

class Payouts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			rowsPerPage: 1,
			selectedId: "",
			tableData: [],
			statisticsTable: []
		};
	}

	render() {
		return <div>Payouts</div>;
	}
}

export default Payouts;
