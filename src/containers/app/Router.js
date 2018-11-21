import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from '../about';
import Blog from '../blog';
// import Explorer from '../explorer';
// import Faucet from '../faucet';
import Stats from'../stats';
import Wiki from '../wiki';
import Bridge from '../bridge';

const RouterObj = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Stats} />
      <Route path="/stats" component={Stats} />
      <Route path="/bridge" component={Bridge} />
      <Route path="/about" component={About} />
      <Route path="/wiki" component={Wiki} />
      <Route path="/blog" component={Blog} />
    </Switch>
  </main>
);

export default RouterObj;
