  
import { combineReducers } from 'redux';

import auth from './auth';
import admin from './admin'

export const reducers = combineReducers({auth, admin });