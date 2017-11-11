import createAction from './createAction';

export default (name, thunkAction, metaCreator) => {
  if (!thunkAction) return createAction(name, null, metaCreator);
  thunkAction.toString = () => Symbol(name);
  return thunkAction;
};
