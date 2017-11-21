import handleActions from './handleActions';

export default function handleModule(module) {
  const { reducers, initialState } = module;
  return handleActions(reducers, initialState || {});
}
