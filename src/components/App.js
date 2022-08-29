import React,{useState, useEffect}  from "react"; 
import '../styles/App.css';

const App= () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [workbreaktype, setWorkBreakType] = useState('work');

  const [flag , setFlag] =  useState(false);
  const [resetFlag, setResetFalg] = useState(true);

  const [workSecond, setWorkSecond] = useState(1500);
  const [breakSecond, setBreakSecond] = useState(300);

  useEffect(() =>{
    if(flag && workbreaktype === 'work'){
      if(workSecond > 0) {
        // console.log("work-time");
        const timer = setTimeout(() => setWorkSecond(workSecond - 1), 1000);
        return () => clearTimeout(timer);
      }

      if(workSecond === 0) {
        // console.log("work-time is over");
        alert('work duration is over')
        setWorkBreakType('break');
        setWorkSecond(workTime * 60);
      }

    }

    if(flag && workbreaktype === 'break'){
      if(breakSecond > 0) {
        // console.log("break-time");
        const timer = setTimeout(() => setBreakSecond(breakSecond - 1), 1000);
        return () => clearTimeout(timer);
      }

      if(breakSecond === 0) {
        // console.log("break-time over");
        alert('break duration is over');
        setWorkBreakType('work');
        setBreakSecond(breakTime * 60);
      }

    }
  },[flag, workbreaktype, workSecond, breakSecond, workTime, breakTime]);

  const changeWorkTime = (event) =>{
    setWorkTime(checkNumber(event.target.value))
  }

  const changeBreakTime = (event) =>{
    setBreakTime(checkNumber(event.target.value))
  }
  
  const startTimer = () =>{
  setFlag(true); 
  setResetFalg(false);
  }

  const stopTimer = () =>{
    setFlag(false); 
    setResetFalg(false);
  }

  const convertSecToMin = (sec) =>{
    let m = parseInt(sec / 60).toString();
    let s = parseInt(sec % 60).toString();
    if(m.length === 1) m = '0' + m;
    if(s.length === 1) s = '0' + s;
    // console.log(m);
    // console.log(s);
    return m + ":" + s;
  }


  const checkNumber = (time) =>{
    if(!isNaN(time) && parseInt(time) >= 0){
      return parseInt(time);
    }
    else
      return '';
  }

  const setTime = (event) =>{
    event.preventDefault();
    if(breakTime + workTime === 0){
      reset();
      return ;
    }
    setResetFalg(false);
    setWorkBreakType('work');
    setWorkSecond(workTime * 60);
    setBreakSecond(breakTime * 60);
  }

  const reset = () =>{
    setResetFalg(true);
    setFlag(false);
    setWorkBreakType('work');
    setWorkTime(25);
    setBreakTime(5);
    setBreakSecond(300);
    setWorkSecond(1500);
}


  return (
    <div>
      <div>
      <h1>{(workbreaktype === 'work') ? convertSecToMin(workSecond): convertSecToMin(breakSecond) }</h1>
      <h3>{(workbreaktype === 'work') ? 'Work' : 'Break'}-Time</h3>
      </div>
      <div>
      <button data-testid='start-btn' onClick={startTimer} disabled={flag} >Start</button>
      <button data-testid='stop-btn' onClick={stopTimer} disabled={!flag}>Stop</button>
      <button data-testid='reset-btn' onClick={() => {reset()}} disabled={resetFlag}>Reset</button>
      </div>
      <div>
        <form onSubmit={setTime}>
        <input workbreaktype='number' data-testid='work-duration' value={workTime} disabled={flag} onChange={changeWorkTime}></input>
        <input workbreaktype='number' data-testid='break-duration' value={breakTime} disabled={flag} onChange={changeBreakTime}></input>
        <button data-testid='set-btn' workbreaktype='submit' disabled={flag}>set</button>
        </form>
      </div>
      </div>
  );
}

export default App;


