import { useEffect, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { fetchUserData } from '../lib/api';
import useHttp from '../hooks/use-http';
import '../styles/pages/_profile.scss';
import PasswordForm from './PasswordForm';
import Error from '../components/Error';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  const {
    sendRequest: sendUserDataRequest,
    status: userDataStatus,
    data: userData,
    error,
  } = useHttp(fetchUserData);

  // console.log(userDataStatus);
  // console.log(error);

  useEffect(() => {
    sendUserDataRequest(token);
  }, [sendUserDataRequest, token]);

  if (userDataStatus === 'error') {
    return <Error errStatus={error.status} errMsg={error.data} />;
  }

  return (
    <>
      <div className='profile'>
        <h1 className='heading--1 profile__heading'>Customer Profile</h1>
        <div className='profile__summary'>
          <p className='profile__label'>Email: </p>
          <p className='profile__text'>{userData.email}</p>
        </div>
        <div className='profile__password'>
          <h2 className='heading--3'>Change Password</h2>
          <PasswordForm />
        </div>
      </div>
    </>
  );
};

export default Profile;
