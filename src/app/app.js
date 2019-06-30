import React from 'react';
// import logo from './logo.svg';
import './app.css';
import AppBar from '../articles/components/AppBar';
import ArticlesList from '../articles/components/ArticlesList';
import ArticleDetails from '../articles/components/ArticleDetails';
import PinnedArticlesList from '../articles/components/PinnedArticlesList';
import {BrowserRouter, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({forceRefresh:true});



function App() {
  return (
    <BrowserRouter>
      <Route exact={true} path='/' render={() => (
          <div className="App">
            <AppBar history={history} />
            <PinnedArticlesList history={history} />
            <ArticlesList history={history} />
          </div>
      )} />

      <Route exact={true} path='/:article' render={({match}) => (
        <div>
          <AppBar history={history} />
          <ArticleDetails match={match}/>
        </div>
      )} />

    </BrowserRouter>
  );
}

export default App;
