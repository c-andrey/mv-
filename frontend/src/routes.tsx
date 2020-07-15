import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Feed from './pages/Feed/Feed';
import { NewEvent } from './pages/NewEvent/NewEvent';

interface Props {}

function Router(props: Props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/feed" component={Feed} />
        <Route path="/events/new" component={NewEvent} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
