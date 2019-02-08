import React, { Component } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Container
} from "reactstrap";

class AppNavbar extends Component {
	state = {
		isOpen: false,
		isLoggedin: false
	};
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		return (
			<div>
				<Navbar color='dark' dark expand='sm' className='mb-5'>
					<Container>
						<NavbarBrand href='/'>Affiliate Marketing Web Scrapping</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className='ml-auto' navbar>
								{localStorage.getItem("user") && (
									<React.Fragment>
										<NavItem>
											<NavLink href='/dashboard/'>Dashboard</NavLink>
										</NavItem>
										<UncontrolledDropdown nav inNavbar>
											<DropdownToggle nav caret>
												Account Management
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem tag='a' href='/merchant/management'>
													Merchants
												</DropdownItem>
												<DropdownItem tag='a' href='/subaccount/management'>
													Sub Accounts
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
										<UncontrolledDropdown nav inNavbar>
											<DropdownToggle nav caret>
												Register
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem tag='a' href='/merchant/register'>
													Merchant
												</DropdownItem>
												<DropdownItem tag='a' href='/subaccount/register'>
													Sub Account
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
										<NavItem>
											<NavLink href='/logout/'>Logout</NavLink>
										</NavItem>
									</React.Fragment>
								)}
								{!localStorage.getItem("user") && (
									<React.Fragment>
										<NavItem>
											<NavLink href='/login/'>Login</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href='/register/'>Register</NavLink>
										</NavItem>
									</React.Fragment>
								)}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default AppNavbar;
