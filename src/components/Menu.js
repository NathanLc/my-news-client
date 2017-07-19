import React from 'react';
import PropTypes from 'proptypes';
import './menu.css';

const MenuItem = props => {
  const category = props.category;

  return (
    <li className="menu-item">
      <a href={'#' + category._id} onClick={props.onCategorySelect}>{category.name}</a>
    </li>
  );
};
MenuItem.proptypes = {
  category: PropTypes.object.isRequired,
  onCategorySelect: PropTypes.func.isRequired
}

const Menu = props => {
  const categories = props.categories.map(category => {
    const handleCategorySelect = () => {
      props.onCategorySelect(category);
    };

    return (
      <MenuItem
        key={category._id}
        category={category}
        onCategorySelect={handleCategorySelect} />
    );
  });

  return (
    <div className="menu-wrapper">
      <ul className="menu">
        {categories}
      </ul>
    </div>
  );
};
Menu.proptypes = {
  categories: PropTypes.array.isRequired,
  onCategorySelect: PropTypes.func.isRequired
};

export default Menu;
