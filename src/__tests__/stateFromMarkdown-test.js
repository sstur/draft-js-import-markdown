/* @flow */
const {describe, it} = global;
import expect from 'expect';
import stateFromMarkdown from '../stateFromMarkdown';
import {convertToRaw} from 'draft-js';
import {jsdom} from 'jsdom';

global.document = jsdom('');

describe('stateFromMarkdown should create content state from', () => {
  it('text node', () => {
    let markdown = 'Hello World';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    let blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual(
      [{text: 'Hello World', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: []}]
    );
  });

  it('markdown link', () => {
    let markdown = '[test](a.jpg)';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    let expectedEntitiesMap = {};
    expectedEntitiesMap[0] = {type: 'LINK', mutability: 'MUTABLE', data: {url: 'a.jpg'}};
    expect(rawContentState.entityMap).toEqual(expectedEntitiesMap);
  });

  it('markdown code block', () => {
    let markdown = '`test`';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    let blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual(
      [{text: 'test', type: 'unstyled', depth: 0, inlineStyleRanges: [{offset: 0, length: 4, style: 'CODE'}], entityRanges: []}]
    );
  });

  it('markdown blockquote', () => {
    let markdown = '>test';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    let blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual(
      [{text: 'test', type: 'blockquote', depth: 0, inlineStyleRanges: [], entityRanges: []}]
    );
  });

  it('markdown bold and italic text', () => {
    let markdown = '_**test**_';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    let blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual(
      [{text: 'test', type: 'unstyled', depth: 0, inlineStyleRanges: [{offset: 0, length: 4, style: 'ITALIC'}, {offset: 0, length: 4, style: 'BOLD'}], entityRanges: []}]
    );
  });

  it('markdown image', () => {
    let markdown = '![test](a.jpg)';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    let expectedEntitiesMap = {};
    expectedEntitiesMap[0] = {type: 'IMAGE', mutability: 'MUTABLE', data: {src: 'a.jpg', alt: 'test'}};
    expect(rawContentState.entityMap).toEqual(expectedEntitiesMap);
  });
});

function removeKeys(blocks) {
  return blocks.map((block) => {
    let {key, ...other} = block; // eslint-disable-line no-unused-vars
    return other;
  });
}
