import React, { useState, useContext } from 'react';
import './Delete.scss';
import { CTX } from 'context/Store';
import axios from 'axios';

const Delete = () => {
  const [appState, updateState] = useContext(CTX);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [secondConfirm, setSecondConfirm] = useState(false);
  const {
    user: { id },
  } = appState;

  const handleDelete = () => {
    axios
      .post('/api/delete_my_account')
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log({ err }));
  };
  return (
    <>
      <div className='background' />
      <div className='overlay' />
      <div className='delete-page'>
        <h2>delete my account</h2>

        {secondConfirm ? (
          <div className='flexcol'>
            <h3>Okay, this is it. Remember, it's permanent.</h3>
            <div className='btns'>
              <button
                onClick={() => {
                  setOpenConfirm(false);
                  setSecondConfirm(false);
                }}
                className='cancel-btn'
              >
                nevermind
              </button>
              <button onClick={handleDelete} className='delete-btn'>
                DELETE
              </button>
            </div>
          </div>
        ) : openConfirm ? (
          <div className='flexcol'>
            <h3>You sure? This cannot be undone.</h3>
            <div className='btns'>
              <button
                onClick={() => setOpenConfirm(false)}
                className='cancel-btn'
              >
                No
              </button>
              <button
                onClick={() => setSecondConfirm(true)}
                className='delete-btn'
              >
                Yes
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3>THIS IS PERMANENT</h3>
            <button onClick={() => setOpenConfirm(true)} className='delete-btn'>
              delete my account
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Delete;
