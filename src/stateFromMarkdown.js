/* @flow */

import {stateFromElement} from 'draft-js-import-element';
import remark from 'remark';
import html from 'remark-html';
import parseHTML from './parseHTML';

import type {ContentState} from 'draft-js';

const markdownProcessor = remark().use(html);

export default function stateFromMarkdown(markdown: string): ContentState {
  let htmlString = markdownProcessor.process(markdown);
  return stateFromElement(parseHTML(htmlString));
}
