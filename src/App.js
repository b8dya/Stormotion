import React, { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import "./App.css"
const App = () => {

  const [state, setState] = useState([]);
  const [userState, setUserState] = useState(0);
  const [botState, setBotState] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [disable, setDisabled] = useState(false);
  const [numOfMatch, setNumOfMatch] = useState(0);

  const submitForm = data => {
    fillMatches(data.input);
    setBotState(0);
    setUserState(0);
  };
  
  useEffect(() => {
    if (disable && state.length !== 0) {
      setTimeout(() => {
        botTakeMatches(numOfMatch, state);
      }, 1500)
    }
  }, [state, numOfMatch, disable]);



  const fillMatches = (num) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push("🎩");
    }
    setState(arr);
  };

  const takeMatches = (numOfMatch) => {
    setDisabled(prev => !prev);
    setNumOfMatch(numOfMatch);
    const array = [...state];
    setState(array.slice(0, -numOfMatch));
    setUserState(prev => prev + numOfMatch);

  };

  const botTakeMatches = (numOfMatch) => {
    setDisabled(prev => !prev);
    const rest = 4 - numOfMatch;
    setBotState(prev => prev + rest);
    setState(state.slice(0, -rest));
  };



  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div >Enter the number of matches</div>
        <input type="number" {...register('input', { validate: value => value % 2 !== 0 } )} />
        <button type="submit" disabled={state.length !== 0}>Enter</button>
        {errors.input && <p className={'errorMsg'}>Invalid data</p>  }
      </form>
      <div className="items" >
        {
          state.map((item, index) => (
            <span key={index}>{item}</span>
          ))
        }
      </div>

      <div>
        <button disabled={disable || state.length === 0} onClick={() => takeMatches(1)}>get 1</button>
        <button disabled={disable || state.length < 2 } onClick={() => takeMatches(2)}>get 2</button>
        <button disabled={disable || state.length < 3 } onClick={() => takeMatches(3)}>get 3</button>
      </div>

      <div>
        User count {userState}
      </div>

      <div>
        Bot count {botState}
      </div>

      <div>
        {state.length === 0 && botState !== 0 && botState % 2 === 0 && <p>Bot win!</p>}
        {state.length === 0 && userState !== 0 && userState % 2 === 0 && <p>User win!</p>}
      </div>

    </div>
  )
}

export default App;