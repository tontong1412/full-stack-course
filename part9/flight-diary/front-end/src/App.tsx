import { useEffect, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "./type";
import { createEntry, getAllEntries } from "./services/diaryEntryService";
const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>(Object.values(Visibility)[0])
  const [weather, setWeather] = useState<Weather>(Object.values(Weather)[0])
  const [comment, setComment] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()


  useEffect(() => {
    getAllEntries().then(data=>setEntries(data))
  }, [])

  const handleAddEntry = (event: React.SyntheticEvent) => {
    setErrorMessage(undefined)
    event.preventDefault()
    createEntry({
      date,
      visibility,
      weather,
      comment,
    }).then(data => {
      setEntries(entries.concat(data))
      setErrorMessage(undefined)
    }).catch(error => {setErrorMessage(error.response?.data)})
  }
  
  return (
    <div>
      <h1>Flight Diary</h1>
      <h2>Add new Entry</h2>
      {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      <form onSubmit={handleAddEntry}>
        <div>Date: <input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div>
        <div>
          Visibility
          {Object.values(Visibility).map(v => <div key={v}><input id={v} type='radio' name='visibility' value={v} onChange={()=>setVisibility(v)}/> <label htmlFor={v}>{v}</label></div>)}
        </div>
        <div>
          Weather
          {Object.values(Weather).map(w => <div key={w}><input id={w} type='radio' name='weather' value={w} onChange={()=>setWeather(w)}/> <label htmlFor={w}>{w}</label></div>)}
        </div>
        <div>Comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Diary entries</h2>
      {
        entries.map((e, i) => {
          return(
            <div key={`${e.date} - ${i}`}>
              <h3>{e.date}</h3>
              <div>Visibility: {e.visibility}</div>
              <div>Weather: {e.weather}</div>
            </div>
          )
        })
      }

    </div>
  );
};

export default App;