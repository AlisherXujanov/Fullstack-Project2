import AllComponents from "./components/AllComponents.jsx"
import { BrowserRouter } from "react-router-dom"
import { context, globalReducer, initialState, getMe } from "./store"
import { useReducer, useEffect } from "react"
import { ToastContainer } from 'react-toastify';

function App() {
  const [state, dispatch] = useReducer(globalReducer, initialState)
  state.dispatch = dispatch

  async function fetchCurrentUser() {
    try {
      let user_data = await getMe()
      dispatch({ type: "SET_CURRENT_USER", payload: user_data })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])


  return (
    <context.Provider value={state}>
      <ToastContainer />
      <BrowserRouter>
        <AllComponents />
      </BrowserRouter>
    </context.Provider>
  )
}

export default App
