import React from 'react';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';

import { toggleMenuVisibility } from '../../actions/menu_action';
import Menu from './Menu';

const menu = <Menu />;

const MenuWrapped = (props) => {
    const { menuOpen, toggleMenuVisibility, children, } = props;

    return (
        <SideMenu
            menu={menu}
            isOpen={menuOpen}
            onChange={(isOpen) => {
                toggleMenuVisibility({ event: 'onChange', isOpen });
            }}
        >
            {props.children}
        </SideMenu>
    )
};

const mapStateToProps = ({ menuOpen }) => {
    return { menuOpen }
};

export default connect(mapStateToProps, { toggleMenuVisibility })(MenuWrapped);