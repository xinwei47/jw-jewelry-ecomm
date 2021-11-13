import axios from 'axios';
import { useRef, useContext, useState } from 'react';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button';

import '../styles/components/_password-form.scss';
import FlashMessage from '../components/FlashMessage';

const PasswordForm = () => {
  const [flashMsg, setFlashMsg] = useState('');

  const authCtx = useContext(AuthContext);
  const currentPwdInputRef = useRef();
  const newPwdInputRef = useRef();

  const submitChangePwdFormHandler = async (event) => {
    event.preventDefault();
    const enteredCurrentPwd = currentPwdInputRef.current.value;
    const enteredNewPwd = newPwdInputRef.current.value;

    try {
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
      setFlashMsg(data);
    } catch (error) {
      setFlashMsg(error.response.data);
    }
  };

  return (
    <>
      {flashMsg.length !== 0 && <FlashMessage>{flashMsg}</FlashMessage>}
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
    </>
  );
};

export default PasswordForm;
