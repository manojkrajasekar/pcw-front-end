import React from 'react';
import { Provider } from 'react-redux';

import HomePage from './components/HomePage';
import SelectCategory from './components/SelectCategory';
import confirgureStore from './redux/store';

import './App.css';

const store = confirgureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        
        <SelectCategory />
      </div>
    </Provider>
  );
}

export default App;
