/* @flow */

import {stateFromElement} from 'draft-js-import-element';
import remark from 'remark';
import html from 'remark-html';
import parseHTML from './parseHTML';

import type {ContentState} from 'draft-js';

const markdownProcessor = remark().use(html);

export default function stateFromMarkdown(markdown: string): ContentState {
  let htmlString = markdownProcessor.process(markdown);
  // temporary fix for removing inner paragraph from blockquote
  htmlString = htmlString.replace(/\n/g, '').replace(/<blockquote><p>(.+)<\/p><\/blockquote>/g, '<blockquote>$1</blockquote>');
  return stateFromElement(parseHTML(htmlString));
}
