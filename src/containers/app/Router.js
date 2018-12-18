import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bridge from '../bridge';

const RouterObj = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Bridge} />
      <Route path="/bridge" component={Bridge} />
    </Switch>
  </main>
);

export default RouterObj;
