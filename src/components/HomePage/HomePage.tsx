import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { User } from '../../models/user';

export interface IProps {
  dispatch: any;
  user: User;
  users: any;
}

class HomePage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  public render() {
    const { user, users } = this.props;
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className='text-danger'>ERROR: {users.error}</span>
        )}
        {users.items && (
          <ul>
            {users.items.map((user: User, index: any) => (
              <li key={user.id}>{user.firstName + ' ' + user.lastName}</li>
            ))}
          </ul>
        )}
        <p>
          <Link to='/login'>Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
