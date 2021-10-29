import { useEffect, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { fetchUserData } from '../lib/api';
import useHttp from '../hooks/use-http';
import '../styles/pages/_profile.scss';

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
        <div>Customer Profile Page</div>
        {/* <p>ID: {userData._id}</p> */}
        <p>Email: {userData.email}</p>
        <p>Admin: {authCtx.isAdmin ? 'Yes' : 'No'}</p>
      </div>
    </>
  );
};

export default Profile;
