import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './TrainerProfile.scss';
import AppointmentSelector from './AppointmentSelector';

//todo: if no trainer found, redirect

const TrainerProfile = ({ match }) => {
  const [currentTrainer, setCurrentTrainer] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  useEffect(() => {
    let subscribed = true;
    const { trainerId } = match.params;
    axios
      .get(`/api/client/trainer/${trainerId}`)
      .then(({ data: { trainer, err, foundAppointments } }) => {
        if (subscribed) {
          setCurrentTrainer(trainer);
          setAppointments(foundAppointments);
        }
      })
      .catch((err) => console.log('trainer profile error: ', err));
    return () => (subscribed = false);
  }, []);

  let { name, bio, email, profilePic, coverPic } = currentTrainer;

  return (
    <div className='trainerprofile'>
      {bookingSuccess && <Redirect to='/schedule' />}
      <div
        className='cover-pic'
        style={{
          backgroundImage: coverPic
            ? ` linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url("/api/image/${coverPic}")`
            : '',
        }}
      >
        <div className='flex'>
          <img className='profile-pic' src={`/api/image/${profilePic}`} />
          <div>
            <div className='name'>{name}</div>
            <div className='bio'>{bio}</div>
            <div className='email'>{email}</div>
          </div>
        </div>

        <AppointmentSelector
          bookedTimes={appointments}
          trainer={currentTrainer}
          setBookingSuccess={setBookingSuccess}
        />
      </div>
    </div>
  );
};

export default TrainerProfile;

/*
 <input
          type='time'
          onChange={(e) => setStartTime(e.target.value)}
          id='startTime'
          value={startTime}
        />
        <input
          type='time'
          onChange={(e) => setEndTime(e.target.value)}
          id='endTime'
          value={endTime}
        />
        <input type='date' onChange={(e) => setDay(e.target.value)}></input>
        <button onClick={bookAppointment}>book session</button>


// const bookAppointment = () => {
  //   // open paypal, upon completion of payment axios post request to server
  //   // in backend, create new appointment in db
  //   let token = localStorage.getItem('fitr-token');
  //   let start = startTime + ':00';
  //   let end = endTime + ':00';
  //   const startDate = new Date(day + 'T' + start);
  //   const startUTC = startDate.toISOString();
  //   const endDate = new Date(day + 'T' + end);
  //   const endUTC = endDate.toISOString();
  //   console.log(' { startTime: startUTC, endTime: endUTC,: ', {
  //     startTime: startUTC,
  //     endTime: endUTC,
  //   });
  //   axios
  //     .post(
  //       '/api/appointment/new',
  //       { startTime: startUTC, endTime: endUTC, trainer: currentTrainer._id },
  //       {
  //         headers: { 'x-auth-token': token },
  //       }
  //     )
  //     .then((result) => {
  //       console.log('booking result: ', result);
  //     });

  //   // let offset = new Date().getTimezoneOffset();
  // };
  // console.log('thing: ', Intl.DateTimeFormat().resolvedOptions().timeZone);
  // console.log('currentTrainer: ', currentTrainer);

*/
