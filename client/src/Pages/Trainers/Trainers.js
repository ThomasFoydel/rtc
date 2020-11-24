import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from 'Components/SearchBar/SearchBar';
import './Trainers.scss';
import TrainerCard from './TrainerCard';

const Trainers = () => {
  const [currentTrainers, setCurrentTrainers] = useState([]);
  useEffect(() => {
    let subscribed = true;
    axios.get('/api/client/trainers').then(({ data: { trainers, err } }) => {
      if (subscribed) {
        setCurrentTrainers(trainers);
      }
    });
    return () => {
      subscribed = false;
    };
  }, []);

  const handleSearch = (trainers) => {
    setCurrentTrainers(trainers);
  };

  return (
    <div className='trainers'>
      <div className='background' />
      <div className='overlay' />
      {/* <h1 className='header center'>Trainers</h1> */}
      <SearchBar change={handleSearch} />
      <div className='trainers-container'>
        {currentTrainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default Trainers;
