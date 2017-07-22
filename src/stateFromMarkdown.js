/* @flow */

import MarkdownParser from './MarkdownParser';
import {stateFromElement} from 'draft-js-import-element';

import type {ContentState} from 'draft-js';

export default function stateFromMarkdown(markdown: string, options?: Object): ContentState {
  let element = MarkdownParser.parse(markdown, {getAST: true});
  return stateFromElement(element, options);
}
