import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAllDiaryEntries, addDiaryEntry } from './services/diaryEntryService';
import { Diary, NewDiaryEntry, Weather, Visibility } from './types';

function App() {
  const [flightDiary, setFlightDiary] = useState<Diary[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>();
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setFlightDiary(data)
    })
  }, [flightDiary]);

  const handleAddEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  
    if (weather !== null && visibility !== null) {
      const entryToAdd: NewDiaryEntry = {
        date: date,
        weather: weather,
        visibility: visibility,
        comment: comment
      };
  
      setNewEntry(entryToAdd);
  
      if (!Object.values(Weather).includes(weather)) {
        setErrorMessage(`Error: Incorrect weather: ${weather}`);
        setDate('');
        setWeather(null);
        setVisibility(null);
        setComment('');
        return;
      }
      if (!Object.values(Visibility).includes(visibility)) {
        setErrorMessage(`Error: Incorrect visibility: ${visibility}`);
        setDate('');
        setWeather(null);
        setVisibility(null);
        setComment('');
        return;
      }
  
      try {
        if (newEntry) {
          const data = await addDiaryEntry(newEntry);
          setFlightDiary(flightDiary.concat(data));
        }
  
        setDate('');
        setWeather(null);
        setVisibility(null);
        setComment('');
      }
      catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            const field = error.response?.data.field;
            const value = error.response?.data.value;
            const message = `Error: incorrect ${field}: ${value}`;
            setErrorMessage(message);
          }
          else {
            setErrorMessage('Error: could not add diary entry');
          }
        }
        else {
          console.error(error);
          setErrorMessage('Error: could not add diary entry');
        }
      }
    }
  };

  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        <p>{errorMessage}</p>
        <form onSubmit={handleAddEntry}>
          date (yyyy-mm-dd)
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          /><br />
          visibility (great, good, ok or poor)
          <input
            value={visibility || ''}
            onChange={(event) => setVisibility(event.target.value as Visibility)}
          /><br />
          weather (sunny, rainy, cloudy, stormy or windy)
          <input
            value={weather || ''}
            onChange={(event) => setWeather(event.target.value as Weather)}
          /><br />
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          /><br />
          <button type='submit'>add</button>
        </form>
      </div>
      <div>
        <h2>Diary entries</h2>
        {flightDiary.map(entry =>
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
            <p>comment: {entry.comment}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;