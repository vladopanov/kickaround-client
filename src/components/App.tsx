import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components/common';
import { HomePage } from '../components/HomePage';
import { LoginPage } from '../components/LoginPage';

export interface IProps {
  dispatch: any;
  alert: any;
}

class App extends React.Component<IProps> {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  public render() {
    const { alert } = this.props;
    return (
      <div className='jumbotron'>
        <div className='container'>
          <div className='col-sm-8 col-sm-offset-2'>
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              <div>
                <PrivateRoute exact path='/' component={HomePage} />
                <Route path='/login' component={LoginPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);

export default hot(connectedApp);
