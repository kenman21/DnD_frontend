import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import manageCampaign from './reducers/manageCampaign'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { ActionCableProvider} from 'react-actioncable-provider'

const API_WS_ROOT = "ws://localhost:3000/cable"

const store = createStore(manageCampaign, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><ActionCableProvider url={API_WS_ROOT}><App /></ActionCableProvider></Provider>, document.getElementById('root'));
registerServiceWorker();
