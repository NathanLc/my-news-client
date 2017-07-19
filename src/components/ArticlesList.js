import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'proptypes';
import moment from 'moment';
import './articles-list.css';

const Article = props => {
  const article = props.article;
  const datetime = article.datetime === ''
    ? (<span hidden></span>)
    : (<h6 className="article-subtitle">{article.datetime}</h6>);

  return (
    <li className="article">
      <h5 className="article-title"><a href={article.link}>{article.title}</a></h5>
      {datetime}
    </li>
  );
};
Article.proptypes = {
  article: PropTypes.object.isRequired
};

const ArticlesList = props => {
  const articles = props.articles.map(article => {
    const formattedArticle = {
      ...article,
      title: article.title.text,
      datetime: article.datetime ? moment(article.datetime).format('YYYY-MM-DD') : ''
    };

    return (
      <Article
        key={article._id}
        article={formattedArticle} />
    );
  });

  return (
    <ul className="articles-list">
      {articles}
    </ul>
  );
};
ArticlesList.proptypes = {
  articles: PropTypes.array.isRequired
};

export default ArticlesList;
