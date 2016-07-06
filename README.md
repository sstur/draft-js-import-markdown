# DraftJS: Import Markdown to ContentState

This is a module for [DraftJS](https://github.com/facebook/draft-js) that will convert Markdown to editor content.

It was extracted from [React-RTE](https://react-rte.org) and placed into a separate module for more general use. Hopefully it can be helpful in your projects.

## Installation

    npm install --save draft-js-import-markdown

## How to Use

    import {stateFromMarkdown} from 'draft-js-import-markdown';
    let contentState = stateFromMarkdown(markdown);

This project is still under development. If you want to help out, please open an issue to discuss or join us on [Slack](https://draftjs.slack.com/).

## License

This software is [ISC Licensed](/LICENSE).
