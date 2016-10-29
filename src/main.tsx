'use strict';

import * as React from "react";
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {About} from "./modules/About";
import {Gallery} from "./modules/Gallery";
import {Contact} from "./modules/Contact";
import {Home} from "./modules/Home";
import {App} from "./modules/App";

import {appConfig} from "./projects";
import ReactGA from 'react-ga';

// Set up Google analytics
ReactGA.initialize('UA-000000-01', {debug: true});

const NoMatch = React.createClass({
  render() {
    return <div>No Match</div>;
  }
});

const contactInfo = {
  emailAddress: 'dphua@ringling.edu',
  address: 'San Francisco, CA',
  phoneNumber: 'XXX-XXX-XXXX'
};

function logPageView() {
  ReactGA.pageview(this.state.location.pathname);
}

render(
  <Router history={hashHistory} onUpdate={logPageView}>
    <Route path="/" config={appConfig} component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="gallery/:projectId" baseUrl={appConfig.baseFolder} defaultExt={appConfig.defaultExt} component={Gallery} />
      <Route path="contact" info={contactInfo} component={Contact}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('content')
);