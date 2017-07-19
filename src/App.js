import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'proptypes';
import Menu from './components/Menu';
import Drawer from './components/Drawer';
import ArticlesList from './components/ArticlesList';
import './app.css';
import 'normalize.css';
import feathers from './feathers';
import moment from 'moment';

const AppComponent = props => (
  props.loading
    ? (<h3>Loading...</h3>)
    : (
      <div className="app">
        <Drawer
          visible={props.isDrawerVisible}
          onCloseDrawer={props.onCloseDrawer}>
          <Menu
            categories={props.categories}
            onCategorySelect={props.onCategorySelect} />
        </Drawer>
        <header className="header shadow-1">
          <div className="container">
            <h2><button type="button" onClick={props.onDrawerButtonClick}>#</button> My News</h2>
          </div>
        </header>
        <main>
          <div className="container">
            <ArticlesList
              articles={props.articles} />
          </div>
        </main>
      </div>
    )
);
AppComponent.proptypes = {
  categories: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  isDrawerVisible: PropTypes.bool.isRequired,
  onDrawerButtonClick: PropTypes.func.isRequired,
  onCloseDrawer: PropTypes.func.isRequired
};

class App extends Component {
  constructor () {
    super();
    this.state = {
      loading: true,
      isDrawerVisible: false,
      categories: [],
      articles: []
    };

    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleDrawerButtonClick = this.handleDrawerButtonClick.bind(this);
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this);
  }

  handleCategorySelect (category) {
    let query = {
      categories: category._id
    };

    if (category.shortname === 'events') {
      query = {
        ...query,
        datetime: {
          $gt: moment().startOf('day').valueOf()
        },
        $sort: {
          datetime: 1
        }
      };
    } else {
      query = {
        ...query,
        $sort: {
          datetime: -1,
          createdAt: -1
        }
      };
    }

    feathers.service('articles').find({
      query: query
    })
      .then(page => {
        this.setState({
          articles: page.data
        });
      });

    this.handleCloseDrawer();
  }

  handleDrawerButtonClick () {
    this.setState({
      isDrawerVisible: !this.state.isDrawerVisible
    });
  }

  handleCloseDrawer () {
    this.setState({
      isDrawerVisible: false
    });
  }

  componentDidMount () {
    // Use timeout for the moment in place for good solution.
    window.setTimeout(() => {
      feathers.service('categories').find({})
        .then(categories => {
          this.setState({
            categories: categories
          });

          const eventsCategory = categories.find(category => category.shortname === 'events');

          feathers.service('articles').find({
            query: {
              $limit: 25,
              categories: {
                $ne: eventsCategory._id
              },
              $sort: {
                datetime: -1
              }
            }
          })
            .then(page => {
              this.setState({
                articles: page.data
              });
            })
            .catch(err => { console.warn('Error while finding articles:', err); });
        })
        .then(() => {
          this.setState({
            loading: false
          });
        })
        .catch(err => { console.warn('Error while finding categories:', err); });
    }, 100);
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <AppComponent
        loading={this.state.loading}
        isDrawerVisible={this.state.isDrawerVisible}
        onCloseDrawer={this.handleCloseDrawer}
        onDrawerButtonClick={this.handleDrawerButtonClick}
        categories={this.state.categories}
        articles={this.state.articles}
        onCategorySelect={this.handleCategorySelect} />
    );
  }
}

export default App;
