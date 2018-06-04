/*
Small parts of this file is originally from REDUX-ACTIONS
source: https://github.com/redux-utilities/redux-actions/blob/master/src/createAction.js

ORIGINAL LICENSE:
===

The MIT License (MIT)

Copyright (c) 2016 Andrew Clark

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import isNull from 'lodash/isNull';
import invariant from 'invariant';
import Cymbal from './cymbal.js';

export default function createAction(name, payloadCreator = identity, metaCreator) {
  invariant(
    isFunction(payloadCreator) || isNull(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  );

  const finalPayloadCreator = isNull(payloadCreator) || payloadCreator === identity
    ? identity
    : (head, ...args) => (head instanceof Error
      ? head : payloadCreator(head, ...args));

  const hasMeta = isFunction(metaCreator);
  const typeSymbol = Cymbal(name); // eslint-disable-line

  const actionCreator = (...args) => {
    const payload = finalPayloadCreator(...args);
    const action = {
      type: name,
      key: typeSymbol
    };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      action.meta = metaCreator(...args);
    }

    return action;
  };

  actionCreator.toString = () => typeSymbol;

  return actionCreator;
}
