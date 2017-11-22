import createAction from './createAction';

export default (name, thunkAction, metaCreator) => {
  const action = createAction(name, null, metaCreator);
  if (!thunkAction) return action;

  const returnAction = payload => (dispatch, state) => {
    dispatch(action());
    return thunkAction(payload)(dispatch, state);
  };

  returnAction.toString = () => Symbol(name);
  return returnAction;
};
