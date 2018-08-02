import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TestRegistrar from './routes/TestRegistrar'
import Home from './routes/Home'
import SingleName from './routes/SingleName'
import Header from './components/Header/Header'

const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/test-registrar" component={TestRegistrar} />
      <Route path="/favourites" component={Home} />
      <Route path="/my-bids" component={Home} />
      <Route path="/about" component={Home} />
      <Route path="/how-it-works" component={Home} />
    </div>
  </Router>
)
export default App
