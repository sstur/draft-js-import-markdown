/* @flow */
const {describe, it} = global;
import expect from 'expect';
import stateFromMarkdown from '../stateFromMarkdown';
import {convertToRaw} from 'draft-js';

describe('stateFromMarkdown', () => {
  it('should create content state', () => {
    let markdown = 'Hello World';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    let blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual(
      [{text: 'Hello World', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: []}]
    );
  });

  it('should create content state from markdown link', () => {
    let markdown = '[test](a.jpg)';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    expect(rawContentState.entityMap).toEqual(
      {0: {type: 'LINK', mutability: 'MUTABLE', data: {url: 'a.jpg'}}}
    );
  });

  it('should create content state from markdown image', () => {
    let markdown = '![test](a.jpg)';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    expect(rawContentState.entityMap).toEqual(
      {0: {type: 'IMAGE', mutability: 'MUTABLE', data: {src: 'a.jpg', alt: 'test'}}}
    );
  });
});

function removeKeys(blocks) {
  return blocks.map((block) => {
    let {key, ...other} = block; // eslint-disable-line no-unused-vars
    return other;
  });
}
