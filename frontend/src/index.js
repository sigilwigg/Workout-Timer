// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';

// ----- locals -----
import App from './App';
import allReducers from './reducers/allReducers'

// ----- stylesheets -----
import './css/_react-init.css';


// ========== [///// CONFIG /////] ==========
// ----- store -----
const store = createStore(
	allReducers,
	compose(
		applyMiddleware(thunk)
	)
)


// ========== [///// MAIN /////] ==========
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);