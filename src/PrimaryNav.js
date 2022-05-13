import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LanguageIcon from '@mui/icons-material/Language';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HelpIcon from '@mui/icons-material/Help';
import EmailIcon from '@mui/icons-material/Email';
// import './PrimaryNav.css';

class PrimaryNav extends Component {
    state = {
        value: 0,
        pathMap: [
            '/panoramas',
            '/members',
            '/shop',
            '/about',
            '/subscribe'
        ]
    };

    componentWillReceiveProps(newProps) {
        const { pathname } = newProps.location;
        const { pathMap } = this.state;

        const value = pathMap.indexOf(pathname);

        if (value > -1) {
            this.setState({
                value
            });
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value, pathMap } = this.state;

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className="nav primary"
            >
                <BottomNavigationAction label="Panoramas" icon={<LanguageIcon />} component={Link} to={pathMap[0]} />
                <BottomNavigationAction label="Members" icon={<GroupIcon />} component={Link} to={pathMap[1]} />
                <BottomNavigationAction label="Shop" icon={<ShoppingBasketIcon />} component={Link} to={pathMap[2]} />
                <BottomNavigationAction label="About" icon={<HelpIcon />} component={Link} to={pathMap[3]} />
                <BottomNavigationAction label="Subscribe" icon={<EmailIcon />} component={Link} to={pathMap[4]} />
            </BottomNavigation>
        );
    }
}

export default PrimaryNav;