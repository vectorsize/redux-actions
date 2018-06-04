/*
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

import { expect } from 'chai';
import { createAction } from '../';
import { isFSA } from 'flux-standard-action';

describe('createAction()', () => {
  describe('resulting action creator', () => {
    const type = 'TYPE';

    it('returns a valid FSA', () => {
      const actionCreator = createAction(type, b => b);
      const foobar = { foo: 'bar' };
      const action = actionCreator(foobar);
      expect(isFSA(action)).to.be.true;
    });

    it('uses return value as payload', () => {
      const actionCreator = createAction(type, b => b);
      const foobar = { foo: 'bar' };
      const action = actionCreator(foobar);
      expect(action).to.deep.equal({
        type,
        payload: foobar
      });
    });

    it('should throw an error if payloadCreator is not a function, undefined, null', () => {
      const wrongTypePayloadCreators = [1, false, 'string', {}, []];

      wrongTypePayloadCreators.forEach(wrongTypePayloadCreator => {
        expect(() => {
          createAction(type, wrongTypePayloadCreator);
        })
        .to.throw(
          Error,
          'Expected payloadCreator to be a function, undefined or null'
        );
      });
    });

    it('uses identity function if payloadCreator is undefined', () => {
      const actionCreator = createAction(type);
      const foobar = { foo: 'bar' };
      const action = actionCreator(foobar);
      expect(action).to.deep.equal({
        type,
        payload: foobar
      });
      expect(isFSA(action)).to.be.true;
    });

    it('uses identity function if payloadCreator is null', () => {
      const actionCreator = createAction(type, null);
      const foobar = { foo: 'bar' };
      const action = actionCreator(foobar);
      expect(action).to.deep.equal({
        type,
        payload: foobar
      });
      expect(isFSA(action)).to.be.true;
    });

    it('accepts a second parameter for adding meta to object', () => {
      const actionCreator = createAction(type, undefined, ({ cid }) => ({ cid }));
      const foobar = { foo: 'bar', cid: 5 };
      const action = actionCreator(foobar);
      expect(action).to.deep.equal({
        type,
        payload: foobar,
        meta: {
          cid: 5
        }
      });
      expect(isFSA(action)).to.be.true;
    });

    it('sets error to true if payload is an Error object', () => {
      const actionCreator = createAction(type);
      const errObj = new TypeError('this is an error');

      const errAction = actionCreator(errObj);
      expect(errAction).to.deep.equal({
        type,
        payload: errObj,
        error: true
      });
      expect(isFSA(errAction)).to.be.true;

      const foobar = { foo: 'bar', cid: 5 };
      const noErrAction = actionCreator(foobar);
      expect(noErrAction).to.deep.equal({
        type,
        payload: foobar
      });
      expect(isFSA(noErrAction)).to.be.true;
    });

    it('sets error to true if payload is an Error object and meta is provided', () => {
      const actionCreator = createAction(type, undefined, (_, meta) => meta);
      const errObj = new TypeError('this is an error');

      const errAction = actionCreator(errObj, { foo: 'bar' });
      expect(errAction).to.deep.equal({
        type,
        payload: errObj,
        error: true,
        meta: { foo: 'bar' }
      });
    });

    it('sets payload only when defined', () => {
      const action = createAction(type)();
      expect(action).to.deep.equal({
        type
      });

      const explictUndefinedAction = createAction(type)(undefined);
      expect(explictUndefinedAction).to.deep.equal({
        type
      });

      const baz = '1';
      const actionCreator = createAction(type, undefined, () => ({ bar: baz }));
      expect(actionCreator()).to.deep.equal({
        type,
        meta: {
          bar: '1'
        }
      });

      const validPayload = [false, 0, ''];
      for (let i = 0; i < validPayload.length; i++) {
        const validValue = validPayload[i];
        const expectPayload = createAction(type)(validValue);
        expect(expectPayload).to.deep.equal({
          type,
          payload: validValue
        });
      }
    });

    it('bypasses payloadCreator if payload is an Error object', () => {
      const actionCreator = createAction(type, () => 'not this', (_, meta) => meta);
      const errObj = new TypeError('this is an error');

      const errAction = actionCreator(errObj, { foo: 'bar' });
      expect(errAction).to.deep.equal({
        type,
        payload: errObj,
        error: true,
        meta: { foo: 'bar' }
      });
    });

    it('set error to true if payloadCreator return an Error object', () => {
      const errObj = new TypeError('this is an error');
      const actionCreator = createAction(type, () => errObj);
      const errAction = actionCreator('invalid arguments');
      expect(errAction).to.deep.equal({
        type,
        payload: errObj,
        error: true
      });
    });
  });
});
