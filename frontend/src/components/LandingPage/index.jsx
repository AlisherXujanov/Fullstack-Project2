import Products from '../Products'
import { context } from '../../store'
import { useContext } from 'react'


const btnStyle = {
    margin: '10px',
    padding: '10px',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer'
}

function LandingPage(props) {
    const state = useContext(context)

    return (
        <main className="landing-page-wrapper">
            <h1>{state.counter}</h1>

            <button style={btnStyle} className='btn'
                onClick={(e) => {state.dispatch({type: "INCREMENT_COUNTER"})}
            }>Increment</button>

            <button style={btnStyle} className='btn'
                onClick={(e) => {state.dispatch({type: "DECREMENT_COUNTER"})}
            }>Decrement</button>

            <hr />


            <Products />
        </main>
    );
}

export default LandingPage;