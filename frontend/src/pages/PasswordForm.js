import axios from 'axios';
import { useRef, useContext } from 'react';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button';

import '../styles/components/_password-form.scss';

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
      className='form password-form'
      onSubmit={submitChangePwdFormHandler}
    >
      <div className='form__group-control password-form__group-control'>
        <label htmlFor=''>Current Password</label>
        <input type='password' ref={currentPwdInputRef} />
      </div>
      <div className='form__group-control password-form__group-control'>
        <label htmlFor=''>New Password</label>
        <input type='password' ref={newPwdInputRef} />
      </div>
      <div className='form__actions password-form__actions'>
        <Button type='submit' className='btn-secondary'>
          Save
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
