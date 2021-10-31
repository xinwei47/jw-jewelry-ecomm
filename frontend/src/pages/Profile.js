import { useEffect, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { fetchUserData } from '../lib/api';
import useHttp from '../hooks/use-http';
import '../styles/pages/_profile.scss';
import PasswordForm from './PasswordForm';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx);
  const { token } = authCtx;

  const {
    sendRequest: sendUserDataRequest,
    // status: userDataStatus,
    data: userData,
  } = useHttp(fetchUserData);

  useEffect(() => {
    sendUserDataRequest(token);
  }, [sendUserDataRequest, token]);

  return (
    <>
      <div className='profile'>
        <h1>Customer Profile Page</h1>
        {/* <p>ID: {userData._id}</p> */}
        <div className='profile__summary'>
          <p>Email: {userData.email}</p>
          <p>Admin: {authCtx.isAdmin ? 'Yes' : 'No'}</p>
          <hr />
          <h2 className='heading--3'>Change Password </h2>
          <PasswordForm />
        </div>
      </div>
    </>
  );
};

export default Profile;
