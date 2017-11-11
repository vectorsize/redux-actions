import handleActions from './handleActions';

export default function handleModule(module) {
  const { reducers, defaultState } = module;
  return handleActions(reducers, defaultState || {});
}
