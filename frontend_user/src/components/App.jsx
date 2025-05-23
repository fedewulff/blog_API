import { useState } from "react"
import "../css/mainPage.css"
import AllPosts from "./allPosts"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="profileContainer">
      <AllPosts></AllPosts>
    </div>
  )
}

export default App
