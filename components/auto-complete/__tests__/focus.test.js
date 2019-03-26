import React from 'react';
import { mount } from 'enzyme';
import AutoComplete from '..';
import focusTest from '../../../tests/shared/focusTest';

describe('AutoComplete could be focus', () => {
  focusTest(AutoComplete);
});

describe('AutoComplete could be focus with custom children', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('focus() and onFocus', () => {
    const handleFocus = jest.fn();
    const wrapper = mount(
      <AutoComplete onFocus={handleFocus}>
        <input />
      </AutoComplete>
    , { attachTo: container });
    wrapper.instance().focus();
    jest.runAllTimers();
    expect(handleFocus).toBeCalled();
  });

  it('blur() and onBlur', () => {
    const handleBlur = jest.fn();
    const wrapper = mount(
      <AutoComplete onBlur={handleBlur}>
        <input />
      </AutoComplete>
    , { attachTo: container });
    wrapper.instance().focus();
    jest.runAllTimers();
    wrapper.instance().blur();
    jest.runAllTimers();
    expect(handleBlur).toBeCalled();
  });
});
