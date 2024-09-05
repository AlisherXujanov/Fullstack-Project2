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
    setSelectedItemsCount()
  }, [])

  function setSelectedItemsCount() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]")
    state.dispatch({ type: "SET_SELECTED_ITEMS_COUNT", payload: cart.length })
  }
  state.setSelectedItemsCount = setSelectedItemsCount


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
