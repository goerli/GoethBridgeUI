import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from '../about';
import Blog from '../blog';
import Stats from'../stats';
import Wiki from '../wiki';
import Bridge from '../bridge';
import RoadMap from '../roadmap';

const RouterObj = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Stats} />
      <Route path="/stats" component={Stats} />
      <Route path="/bridge" component={Bridge} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/roadmap" component={RoadMap} />
    </Switch>
  </main>
);

export default RouterObj;
