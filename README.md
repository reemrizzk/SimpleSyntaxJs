# SimpleSyntaxJs
A simple lightweight but powerful syntax highlighting library for textareas

SimpleSyntaxJs

SimpleSyntaxJs is a lightweight JavaScript library that provides simple and intuitive syntax highlighting for code snippets on webpages.

# Installation

You can install SimpleSyntax-JS via npm:

```
npm install simplesyntax-js
```
Or you can download the library and include it directly in your HTML:

```
<link href="path/to/simplesyntax.min.css" rel="stylesheet">
<script src="path/to/simplesyntax.min.js"></script>
```

If you installed via NPM, this is how to require the library:
```
const simpleSyntax = require('simplesyntax-js');
HTMLTextAreaElement.prototype.simpleSyntax = function(options) {
    simpleSyntax(this, options);
};
```

# Initializing SimpleSyntaxJs: 

Simply call the SimpleSyntax() function on a textarea to apply syntax highlighting to it.
```
textarea.simpleSyntax();
```
Configuration Options
**findAndReplace** : Enable find and replace functionality. Default is false.

**font** : The font family to use for the code snippet. Default is 'monospace'.

**language** : The programming language of the textarea. Default is 'none'.

**lineNumbers** : Enable line numbers display. Default is false.

**matchBraces** : Enable matching braces highlighting. Default is false.

**readOnly** : Set the textarea as read-only. Default is false.

**tabChars** : The chars to type when pressing tab key. Default is '\t'.

**theme** : The theme for syntax highlighting. Default is 'light'.

# Example with Configuration options:

```
textarea.simpleSyntax({
    language: 'javascript',
    theme: 'dark',
    lineNumbers: true,
    readOnly: false,
    matchBraces: true,
    findAndReplace: true,
    tabChars: '\t'
});
```

Contributing
Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests here.

License
SimpleSyntaxJs is licensed under the MIT License. See the LICENSE file for details.

Note: If you encounter any issues or have any feedback, please don't hesitate to open an issue. I'd love to hear from you!
