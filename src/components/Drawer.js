import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'proptypes';
import './drawer.css';

const DrawerComponent = props => {
  const isVisible = props.visible === true ? '' : 'hidden';

  return (
    <aside className="drawer shadow-1" hidden={isVisible}>
      <div>
        <button type="button" className="drawer-close" onClick={props.onClose}>&times;</button>
      </div>
      {props.children}
    </aside>
  );
};
DrawerComponent.proptypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

class Drawer extends Component {
  constructor () {
    super();

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    this.props.onCloseDrawer();
  }

  render () {
    return (
      <DrawerComponent
        visible={this.props.visible}
        onClose={this.handleClose}>
        {this.props.children}
      </DrawerComponent>
    );
  }
}
Drawer.proptypes = {
  visible: PropTypes.bool.isRequired,
  onCloseDrawer: PropTypes.func.isRequired
};

export default Drawer;
