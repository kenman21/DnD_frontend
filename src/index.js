import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import manageCampaign from './reducers/manageCampaign'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(manageCampaign)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
