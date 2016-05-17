/* @flow */

import {stateFromElement} from 'draft-js-import-element';
import remark from 'remark';
import html from 'remark-html';
import {jsdom} from 'jsdom';

import type {ContentState} from 'draft-js';

const markdownProcessor = remark().use(html);
const document = jsdom('');

export default function stateFromMarkdown(markdown: string): ContentState {
  let html = markdownProcessor.process([
    '---',
    'remark:',
    '  commonmark: true',
    '---',
    '',
    markdown,
  ].join('\n'));
  let element = document.createElement('body');
  element.innerHTML = html;
  return stateFromElement(element);
}
