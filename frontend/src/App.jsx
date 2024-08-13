import AllComponents from "./components/AllComponents.jsx"
import { BrowserRouter } from "react-router-dom"
import { context, globalReducer, initialState } from "./store"
import { useReducer } from "react"


function App() {
  const [state, dispatch] = useReducer(globalReducer, initialState)
  state.dispatch = dispatch

  return (
    <context.Provider value={state}>
      <BrowserRouter>
        <AllComponents />
      </BrowserRouter>
    </context.Provider>
  )
}

export default App
