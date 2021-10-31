import axios from 'axios';
import { useRef, useContext } from 'react';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button';

const PasswordForm = () => {
  const authCtx = useContext(AuthContext);
  const currentPwdInputRef = useRef();
  const newPwdInputRef = useRef();

  const submitChangePwdFormHandler = async (event) => {
    event.preventDefault();
    const enteredCurrentPwd = currentPwdInputRef.current.value;
    const enteredNewPwd = newPwdInputRef.current.value;

    const { data } = await axios.put(
      '/change-password',
      {
        oldPassword: enteredCurrentPwd,
        newPassword: enteredNewPwd,
      },
      {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      }
    );

    console.log(data);
  };
  return (
    <form
      action=''
      className='form changepassword-form'
      onSubmit={submitChangePwdFormHandler}
    >
      <div className=''>
        <label htmlFor=''>Current Password</label>
        <input type='password' ref={currentPwdInputRef} />
      </div>
      <div className=''>
        <label htmlFor=''>New Password</label>
        <input type='password' ref={newPwdInputRef} />
      </div>
      <Button type='submit' className='btn-secondary'>
        Save
      </Button>
    </form>
  );
};

export default PasswordForm;
