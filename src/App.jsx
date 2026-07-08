import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  return <>
    <ScrollToTop />
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
}

export default App
