import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PT from 'prop-types';

export default function Articles(props) {
  const { articles, getArticles, deleteArticle, setCurrentArticleId } = props;

  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" replace />; // Redirect to login if no token

  // Fetch articles only if the list is empty to avoid redundant API calls
  useEffect(() => {
    if (!articles.length) {
      getArticles();
    }
  }, [getArticles, articles.length]);

  return (
    <div className="articles">
      <h2>Articles</h2>
      {articles.length === 0 ? (
        <p>No articles yet.</p>
      ) : (
        articles.map((art) => (
          <div key={art.article_id}>
            <h3>{art.title}</h3>
            <p>{art.text}</p>
            <p>Topic: {art.topic}</p>
            <button onClick={() => setCurrentArticleId(art.article_id)}>Edit</button>
            <button onClick={() => deleteArticle(art.article_id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}


// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
