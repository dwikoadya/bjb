import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import userReducer from './user';
import roleReducer from './role';
import jobPositionReducer from './jobPosition';
import branchOfficeReducer from './branchOffice';
import businessTalkReducer from './businessTalk';
import learningCenterReducer from './learningCenter';
import bannerReducer from './banner'


const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  role: roleReducer,
  jobPosition: jobPositionReducer,
  branchOffice: branchOfficeReducer,
  businessTalk: businessTalkReducer,
  learningCenter: learningCenterReducer,
  banner: bannerReducer,
});

export default rootReducer;
