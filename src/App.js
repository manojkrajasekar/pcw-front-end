import React from 'react';
import { Provider } from 'react-redux';

import HomePage from './components/HomePage';
import confirgureStore from './redux/store';

import './App.css';

const store = confirgureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
