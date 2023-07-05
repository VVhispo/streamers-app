import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { StreamerPage } from './pages/StreamerPage'
import { Navbar } from './components/Navbar'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home key="home"/>} />
      <Route path="/:streamerID" element={<StreamerPage key="streamerPage"/>} />
    </Routes>
    </>

  )
}

export default App
