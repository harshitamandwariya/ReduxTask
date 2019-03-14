import FetchUser from './FetchUser';
import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'
const rootReducer = combineReducers({
  form: reduxFormReducer,
  toastr: toastrReducer ,
  FetchUser
});                                       

export default rootReducer;