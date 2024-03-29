import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import StoriesRouter from './routes/StoriesRouter';
import Header from './components/Shared/Header';
import {GET_TOP_STORIES, GET_NEW_STORIES, GET_BEST_STORIES} from "./constants";
import FullStory from "./components/FullStory/FullStory";
import './App.scss';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
          <Route exact path={'/'}
              render={() => {
                  return <Redirect to={'/top'}/>
              }}
          />
          <Route path={'/top'}
              render={props => (
                  <StoriesRouter {...props} category={GET_TOP_STORIES}/>
              )}
          />
          <Route path={'/best'}
              render={props => (
                  <StoriesRouter{...props} category={GET_BEST_STORIES}/>
              )}
          />
          <Route path={'/new'}
              render={props => (
                  <StoriesRouter{...props} category={GET_NEW_STORIES}/>
              )}
          />
          <Route exact path={`/story/:id`} component={FullStory} />

      </Switch>
    </div>
  );
}

export default App;
