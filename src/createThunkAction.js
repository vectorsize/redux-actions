import createAction from './createAction';

export default (name, thunkAction, metaCreator) => {
  const action = createAction(name, null, metaCreator);
  if (!thunkAction) return action;

  const returnAction = payload => (dispatch, getState) => {
    dispatch(action());
    return thunkAction(payload)(dispatch, getState);
  };

  returnAction.toString = () => Symbol(name);
  return returnAction;
};
