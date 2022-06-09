import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import Content from '../pages/Content';


class Index extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={Content} />
          </Switch>
        </App>
      </Router>
    );
  }
}
export default Index;