/*
 * SimpleSyntax.js
 * Description: A lightweight yet powerful syntax highlighting library for textareas.
 * Author: Reem Rizk
 * License: MIT
 * https://github.com/reemrizzk/SimpleSyntaxJs
 */

var ssTextareas = 0;

HTMLElement.prototype.simpleSyntax = function(options) {
	options = options || {};

	ssTextareas++;

	if (options.findAndReplace === undefined)
		options.findAndReplace = false;

	if (options.font === undefined)
		options.font = 'monospace';

	if (options.language === undefined)
		options.language = 'none';

	if (options.lineNumbers === undefined)
		options.lineNumbers = false;

	if (options.matchBraces === undefined)
		options.matchBraces = false;

	if (options.readOnly === undefined)
		options.readOnly = false;

	if (options.readOnly === true)
		options.findAndReplace = false;

	if (options.tabChars === undefined)
		options.tabChars = '\t';

	if (options.theme === undefined)
		options.theme = 'light';

	var textarea = this;

	var fontSize = 16;

	var curlyBracesIndexes = [];
	var curlyBracesTypes = [];
	var roundBracesIndexes = [];
	var roundBracesTypes = [];

	if (this.tagName.toLowerCase() !== "textarea")
		return;

	var containerDiv = document.createElement('div');
	containerDiv.classList.add('ss-container', 'ss-container-' + options.theme);

	var linesDiv = document.createElement('div');
	linesDiv.className = 'linesDiv';
	linesDiv.style.position = 'absolute';
	linesDiv.style.top = '0';
	linesDiv.style.left = '0';
	linesDiv.style.width = '40px';
	linesDiv.style.paddingRight = '10px';
	linesDiv.style.paddingTop = '4px';
	linesDiv.style.textAlign = 'right';
	linesDiv.style.boxSizing = 'border-box';
	linesDiv.style.fontFamily = options.font;
	linesDiv.style.fontSize = '16px';
	if (options.font.toLowerCase() == 'courier new')
		linesDiv.style.fontWeight = 'bold';
	linesDiv.style.overflow = 'hidden';
	linesDiv.style.zIndex = '5';
	linesDiv.style.color = '#888';

	var codeDiv = document.createElement('div');
	codeDiv.className = 'codeDiv';
	codeDiv.style.position = 'absolute';
	codeDiv.style.top = '0';
	codeDiv.style.left = '0';
	codeDiv.style.boxSizing = 'border-box';
	codeDiv.style.width = (textarea.offsetWidth - 12) + "px";
	codeDiv.style.height = (textarea.offsetHeight - 12) + "px";
	codeDiv.style.zIndex = '2';
	codeDiv.style.fontFamily = options.font;
	codeDiv.style.padding = '0px';
	codeDiv.style.margin = '0px';
	codeDiv.style.paddingLeft = '50px';
	codeDiv.style.paddingTop = '4px';
	codeDiv.style.fontSize = '16px';
	codeDiv.style.overflow = "scroll";
	codeDiv.style.whiteSpace = "pre";
	if (options.font.toLowerCase() == 'courier new')
		codeDiv.style.fontWeight = 'bold';

	textarea.style.position = 'static';
	var parentDiv = textarea.parentNode;

	textarea.style.position = 'absolute';
	textarea.style.top = '0';
	textarea.style.left = '0';
	textarea.style.fontFamily = options.font;
	textarea.style.padding = '0px';
	textarea.style.margin = '0px';
	textarea.style.paddingLeft = '50px';
	textarea.style.paddingTop = '4px';
	textarea.style.fontSize = '16px';
	textarea.style.backgroundColor = 'transparent';
	textarea.style.color = 'transparent';
	textarea.style.boxSizing = 'border-box';
	textarea.readOnly = options.readOnly;
	textarea.style.overflow = 'scroll';
	if (options.font.toLowerCase() == 'courier new')
		textarea.style.fontWeight = 'bold';
	textarea.style.whiteSpace = 'pre';
	textarea.style.borderRadius = '0px';
	textarea.style.border = 'none';
	textarea.style.outline = 'none';
	textarea.style.zIndex = '4';
	textarea.spellcheck = false;
	textarea.style.resize = 'none';

	if (!options.lineNumbers) {
		linesDiv.style.display = 'none';
		codeDiv.style.paddingLeft = '6px';
		textarea.style.paddingLeft = '6px';
	}



	containerDiv.style.position = 'relative';
	containerDiv.style.display = 'block';
	containerDiv.style.width = textarea.offsetWidth + 'px';
	containerDiv.style.height = textarea.offsetHeight + 'px';
	containerDiv.style.border = '2px solid #600080;';

	containerDiv.appendChild(codeDiv);
	containerDiv.appendChild(linesDiv);
	containerDiv.appendChild(textarea);

	var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	if (!isIOS && navigator.userAgent.indexOf("Firefox") === -1) {
		var cornerDiv = document.createElement('div');
		cornerDiv.classList.add('cornerDiv');
		cornerDiv.style.position = 'absolute';
		cornerDiv.style.bottom = '0px';
		cornerDiv.style.right = '0px';
		cornerDiv.style.width = '6px';
		cornerDiv.style.height = '6px';
		cornerDiv.style.zIndex = '7';
		containerDiv.appendChild(cornerDiv);
	}

	const searchbarDiv = document.createElement('div');
	searchbarDiv.className = 'ss-searchbar-' + options.theme;
	searchbarDiv.style.boxSizing = 'border-box';
	searchbarDiv.style.display = 'none';

	const findInput = document.createElement('input');
	findInput.type = 'text';
	findInput.id = 'ss-find-' + ssTextareas;
	findInput.placeholder = 'Find..';
	searchbarDiv.appendChild(findInput);

	const replaceInput = document.createElement('input');
	replaceInput.type = 'text';
	replaceInput.id = 'ss-replace-' + ssTextareas;
	replaceInput.placeholder = 'Replace with..';
	searchbarDiv.appendChild(replaceInput);

	const rightDiv = document.createElement('div');
	rightDiv.style.float = 'right';

	const matchCaseCheckbox = document.createElement('input');
	matchCaseCheckbox.type = 'checkbox';
	matchCaseCheckbox.id = 'match-case-' + ssTextareas;
	rightDiv.appendChild(matchCaseCheckbox);

	const matchCaseLabel = document.createElement('label');
	matchCaseLabel.htmlFor = 'match-case-' + ssTextareas;
	matchCaseLabel.textContent = 'Match Case';
	rightDiv.appendChild(matchCaseLabel);

	const findPrevButton = document.createElement('button');
	findPrevButton.className = 'ss-find';
	findPrevButton.innerHTML = '&#8249;';
	rightDiv.appendChild(findPrevButton);

	const findNextButton = document.createElement('button');
	findNextButton.className = 'ss-find';
	findNextButton.innerHTML = '&#8250;';
	rightDiv.appendChild(findNextButton);

	const replaceButton = document.createElement('button');
	replaceButton.id = 'ss-replace-btn-' + ssTextareas;
	replaceButton.innerHTML = 'Replace';
	rightDiv.appendChild(replaceButton);

	const replaceAllButton = document.createElement('button');
	replaceAllButton.id = 'ss-replace-all-btn-' + ssTextareas;
	replaceAllButton.innerHTML = 'Replace All';
	rightDiv.appendChild(replaceAllButton);


	const closeButton = document.createElement('button');
	closeButton.innerHTML = 'X';
	closeButton.style.paddingRight = '0px';
	closeButton.onclick = function() {
		searchbarDiv.style.display = 'none';
	};
	rightDiv.appendChild(closeButton);


	searchbarDiv.appendChild(rightDiv);

	if (options.findAndReplace)
		parentDiv.appendChild(searchbarDiv);

	parentDiv.appendChild(containerDiv);
	searchbarDiv.style.width = (containerDiv.offsetWidth) + "px";


	let currentIndex = 0;

	function findInTextarea(textarea, searchText, matchCase, direction) {
		const text = matchCase ? textarea.value : textarea.value.toLowerCase();
		searchText = matchCase ? searchText : searchText.toLowerCase();

		if (direction === 'next') {
			const index = text.indexOf(searchText, currentIndex + 1);
			if (index !== -1) {
				currentIndex = index;
				highlightText(textarea, currentIndex, searchText.length);
				scrollToCaretPosition();
			}
		} else if (direction === 'prev') {
			const reversedText = text.substring(0, currentIndex).split('').reverse().join('');
			const reversedSearchText = searchText.split('').reverse().join('');
			const reversedIndex = reversedText.indexOf(reversedSearchText);
			const index = reversedIndex !== -1 ? currentIndex - reversedIndex - searchText.length : -1;
			if (index !== -1) {
				currentIndex = index;
				highlightText(textarea, currentIndex, searchText.length);
				scrollToCaretPosition();
			}
		}
	}

	function scrollToCaretPosition() {
		const caretPos = textarea.selectionStart;
		const fontSize = parseFloat(getComputedStyle(textarea).fontSize);
		const linesBeforeCaret = textarea.value.substr(0, caretPos).split('\n').length - 1;
		textarea.scrollTop = linesBeforeCaret * fontSize;
		console.log(caretPos + " " + fontSize);
	}

	function replaceInTextarea(textarea, searchText, replaceText, matchCase) {
		const text = matchCase ? textarea.value : textarea.value.toLowerCase();
		searchText = matchCase ? searchText : searchText.toLowerCase();

		const index = text.indexOf(searchText, currentIndex);
		if (index !== -1) {
			const originalText = textarea.value;
			const before = originalText.substring(0, index);
			const after = originalText.substring(index + searchText.length);
			const selStart = textarea.selectionStart;
			textarea.value = before + replaceText + after;
			textarea.selectionStart = selStart;
			currentIndex = index + replaceText.length;
			highlightText(textarea, currentIndex - replaceText.length, replaceText.length);
			handleTextChange();
			scrollToCaretPosition();
		}
	}

	function replaceAllInTextarea(textarea, searchText, replaceText, matchCase) {
		const text = matchCase ? textarea.value : textarea.value.toLowerCase();
		searchText = matchCase ? searchText : searchText.toLowerCase();

		textarea.value = textarea.value.split(searchText).join(replaceText);
		handleTextChange();
	}

	function highlightText(textarea, start, length) {
		textarea.focus();
		textarea.setSelectionRange(start, start + length);
	}

	findNextButton.onclick = function() {
		const searchText = findInput.value;
		const matchCase = matchCaseCheckbox.checked;
		findInTextarea(textarea, searchText, matchCase, 'next');
	};

	findPrevButton.onclick = function() {
		const searchText = findInput.value;
		const matchCase = matchCaseCheckbox.checked;
		findInTextarea(textarea, searchText, matchCase, 'prev');
	};


	replaceButton.onclick = function() {
		const searchText = findInput.value;
		const replaceText = replaceInput.value;
		const matchCase = matchCaseCheckbox.checked;
		replaceInTextarea(textarea, searchText, replaceText, matchCase);
	};

	replaceAllButton.onclick = function() {
		const searchText = findInput.value;
		const replaceText = replaceInput.value;
		const matchCase = matchCaseCheckbox.checked;
		replaceAllInTextarea(textarea, searchText, replaceText, matchCase);
	};

	this.textChanged = function() {
		handleTextChange();
	};

	this.showFind = function() {
		if (options.findAndReplace) {
			replaceInput.style.display = 'none';
			replaceButton.style.display = 'none';
			replaceAllButton.style.display = 'none';
			searchbarDiv.style.height = '46px';
			rightDiv.style.marginTop = '0px';
			searchbarDiv.style.display = 'block';
		}
	};

	this.showReplace = function() {
		if (options.findAndReplace) {
			replaceInput.style.display = 'inline-block';
			replaceButton.style.display = 'inline-block';
			replaceAllButton.style.display = 'inline-block';
			searchbarDiv.style.height = '84px';
			rightDiv.style.marginTop = '8px';
			searchbarDiv.style.display = 'block';
		}
	};

	this.zoomIn = function() {
		if (fontSize < 24) {
			fontSize += 4;
			textarea.style.fontSize = fontSize + 'px';
			codeDiv.style.fontSize = fontSize + 'px';
			linesDiv.style.fontSize = fontSize + 'px';
		}
	};

	this.zoomOut = function() {
		if (fontSize > 4) {
			fontSize -= 4;
			textarea.style.fontSize = fontSize + 'px';
			codeDiv.style.fontSize = fontSize + 'px';
			linesDiv.style.fontSize = fontSize + 'px';
		}
	};

	this.setTheme = function(theme) {
		containerDiv.classList.remove('ss-container-' + options.theme);
		searchbarDiv.classList.remove('ss-searchbar-' + options.theme);
		options.theme = theme;
		containerDiv.classList.add('ss-container-' + options.theme);
		searchbarDiv.classList.add('ss-searchbar-' + options.theme);
	};

	function encodeToHtml(text) {
		var element = document.createElement('div');
		element.innerText = text;
		return element.innerHTML;
	}

	function updateLineNumbers() {
		var lines = textarea.value.split('\n').length;
		linesDiv.innerHTML = Array.from({
			length: lines
		}, (_, i) => i + 1).join('<br>');
		if (navigator.userAgent.indexOf("Firefox") === -1) {
			linesDiv.style.height = (textarea.offsetHeight - 6) + "px";
		} else {
			linesDiv.style.height = textarea.offsetHeight + "px";
		}
	}

	function replaceCharAt(str, index, char) {
		if (index < 0 || index >= str.length || char.length !== 1)
			return str;

		return str.slice(0, index) + char + str.slice(index + 1);
	}


	function highlightSyntax() {

		let code = textarea.value;
		let tempCode = code;

		if (options.language != "none") {
			curlyBracesTypes = [];
			curlyBracesIndexes = [];
			roundBracesTypes = [];
			roundBracesIndexes = [];

			var openedSingleQuote = false;
			var openedDoubleQuote = false;
            var openedMultilineComment = false;

			for (let i = 0; i < code.length; i++) {

				let isEscaped = false;
                let isMultilineCommentOpening = false;
                let isMultilineCommentClosing = false;
				if (i > 0 && code[i] !== '\\') {
					let escapeCount = 0;
                    if((code[i] == "*" && code[i-1] == "/") && options.language != "none" && options.language != "html" && options.language != "python")
                        isMultilineCommentOpening = true;
                    if((code[i] == "/" && code[i-1] == "*") && options.language != "none" && options.language != "html" && options.language != "python")
                        isMultilineCommentClosing = true;
					for (let j = i - 1; j >= 0; j--) {
						if (code[j] === '\\') {
							escapeCount++;
						} else {
							break;
						}
					}
					isEscaped = (escapeCount % 2 === 1);
				}

                if (!openedSingleQuote && !openedDoubleQuote && isMultilineCommentOpening)
                    openedMultilineComment = true;
                if (!openedSingleQuote && !openedDoubleQuote && isMultilineCommentClosing)
                    openedMultilineComment = false;

				switch (code[i]) {
					case '{':
						if (!openedSingleQuote && !openedDoubleQuote && options.matchBraces && !openedMultilineComment) {
							curlyBracesTypes.push("{");
							curlyBracesIndexes.push(i);
						}
						break;
					case '}':
						if (!openedSingleQuote && !openedDoubleQuote && options.matchBraces && !openedMultilineComment) {
							curlyBracesTypes.push("}");
							curlyBracesIndexes.push(i);
						}
						break;
					case '(':
						if (!openedSingleQuote && !openedDoubleQuote && options.matchBraces && !openedMultilineComment) {
							roundBracesTypes.push("(");
							roundBracesIndexes.push(i);
						}
						break;
					case ')':
						if (!openedSingleQuote && !openedDoubleQuote && options.matchBraces && !openedMultilineComment) {
							roundBracesTypes.push(")");
							roundBracesIndexes.push(i);
						}
						break;
					case "'":
						if (!openedDoubleQuote && !isEscaped && !openedMultilineComment)
							openedSingleQuote = !openedSingleQuote;
						else
							tempCode = replaceCharAt(tempCode, i, '‚');
						break;
					case '"':
						if (!openedSingleQuote && !isEscaped && !openedMultilineComment)
							openedDoubleQuote = !openedDoubleQuote;
						else
							tempCode = replaceCharAt(tempCode, i, "„");
						break;
				}
			}
		}

		let text = encodeToHtml(tempCode);


		if (options.language == "html") {

			text = text.replace(/\"(.*?)\"/g, '<span cltemp="ss-string">"$1"</span>')
				.replace(/\'(.*?)\'/g, '<span cltemp="ss-string">\'$1\'</span>')

			text = text.replace(/&lt;([^&]*)&gt;/g, function(match, captureGroup) {
				return '&lt;' + captureGroup.replace(/(class=|id=|name=|href=|value=|src=|alt=|charset=|title=|style=|width=|height=|rel=|type=)/g, '<span class="ss-attribute">$1</span>') + '&gt;';
			});

			text = text.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="ss-comment">$1</span>');
			text = text.replace(/(&lt;\/?)(\w+)(.*?&gt;)/g, function(match, p1, p2, p3) {
				var tagHighlight = p1 + '<span class="ss-tag">' + p2 + '</span>' + p3;
				return tagHighlight;
			});

			text = text.replace(/&lt;\//g, '<span class="ss-tag">&lt;/</span>');
			text = text.replace(/&lt;/g, '<span class="ss-tag">&lt;</span>');
			text = text.replace(/&gt;/g, '<span class="ss-tag">&gt;</span>');
			text = text.replace(/<span cltemp=/g, '<span class=');
		
        } else if (options.language == "java" || options.language == "javascript" || options.language == "csharp" || options.language == "python" || options.language == "php" || options.language == "kotlin" || options.language == "cpp") {

			var varTypes, keywords;
			if (options.language == "java") {
				varTypes = /\b(int|long|float|double|boolean|enum|void|char|String)\b/g;
				keywords = /\b(abstract|assert|break|case|catch|continue|default|do|else|extends|final|finally|for|goto|if|implements|import|instanceof|interface|new|null|package|private|protected|public|return|short|static|super|switch|this|throw|throws|try|while|true|false)\b/g;
			} else if (options.language == "javascript") {
				varTypes = /\b(var|const|let|number|boolean|enum|object|undefined|symbol|bigint)\b/g;
				keywords = /\b(await|break|case|catch|continue|default|delete|do|else|export|extends|false|finally|for|function|if|import|in|instanceof|new|null|return|super|switch|this|throw|true|try|typeof|void|while|with|yield)\b/g;
			} else if (options.language == "csharp") {
				varTypes = /\b(int|long|float|double|decimal|bool|enum|namespace|char|String|object|byte|sbyte|short|ushort|uint|ulong)\b/g;
				keywords = /\b(abstract|as|base|break|case|catch|checked|continue|default|delegate|do|else|event|explicit|extern|false|finally|for|foreach|goto|if|implicit|in|interface|internal|is|lock|new|null|object|out|override|params|private|protected|public|readonly|ref|return|short|sizeof|static|switch|this|throw|true|try|typeof|unsafe|using|while)\b/g;
			} else if (options.language == "python") {
				varTypes = /\b(int|float|complex|bool|str|bytes|bytearray|list|tuple|set|frozenset|dict|NoneType)\b/g;
				keywords = /\b(and|as|assert|async|await|break|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|None|nonlocal|not|or|pass|raise|return|True|try|while|with|yield)\b/g;
			} else if (options.language == "php") {
				varTypes = /\b(int|float|bool|object|callable|iterable|null)\b/g;
				keywords = /\b(abstract|and|array|as|break|case|catch|clone|continue|declare|default|do|echo|else|elseif|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|interface|isset|list|new|or|print|private|protected|public|require|require_once|return|static|switch|throw|try|unset|use|while|xor|yield|true|false|null)\b/g;
			} else if (options.language == "kotlin") {
				varTypes = /\b(var|val|Int|Long|Float|Double|Boolean|Char|String|Any|Unit|Nothing)\b/g;
				keywords = /\b(as|break|continue|do|else|false|for|fun|if|in|interface|is|null|object|package|return|super|this|throw|true|try|typealias|typeof|when|while)\b/g;
			} else if (options.language == "cpp") {
				varTypes = /\b(int|long|float|double|bool|enum|char|wchar_t|unsigned|signed)\b/g;
				keywords = /\b(alignas|alignof|and|and_eq|auto|break|case|catch|compl|concept|continue|decltype|default|delete|do|else|explicit|export|extern|false|float|for|goto|if|import|inline|module|mutable|new|noexcept|not|or|private|protected|public|register|requires|return|sizeof|static|switch|template|this|true|try|typedef|typeid|typename|union|using|virtual|while|xor)\b/g;
			}


			text = text
				.replace(/\"(.*?)\"/g, '<span class="ss-string">"$1"</span>')
				.replace(/\'(.*?)\'/g, '<span class="ss-string">\'$1\'</span>')
				.replace(keywords, '<span class="ss-keyword">$1</span>')
				.replace(varTypes, '<span class="ss-type">$1</span>')
				.replace(/\/\*[\s\S]*?\*\//g, '<span class="ss-comment">$&</span>')
				.replace(/("[^"]*"|'[^']*')|(\{|\})/g, function(match, quoted, group) {
					if (quoted) return quoted;
					if (group) return '<span class="ss-brace ss-curly-brace">' + group + '</span>';
				})
				.replace(/("[^"]*"|'[^']*')|(\(|\))/g, function(match, quoted, group) {
					if (quoted) return quoted;
					if (group) return '<span class="ss-brace ss-round-brace">' + group + '</span>';
				})
				.replace(/(\/\/.*?)(?=\r?\n|<br>|$)/g, '<span class="ss-comment">$1</span>');


			if (options.language == "php") {
				text = text.replace(/(\$[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)/g, '<span class="ss-type">$1</span>')
					.replace(/(&lt;\?php|&lt;\?|&lt;\?|\?&gt;)/g, '<span class="ss-tag">$1</span>');
			}

		} else if (options.language == "css") {
			text = text
				.replace(/\"(.*?)\"/g, '<span class="ss-string">"$1"</span>')
				.replace(/\'(.*?)\'/g, '<span class="ss-string">"$1"</span>')
				.replace(/\/\*[\s\S]*?\*\//g, '<span class="ss-comment">$&</span>')
				.replace(/(\{|\})/g, '<span class="ss-brace ss-curly-brace">$1</span>')
				.replace(/(\:)/g, '<span class="ss-colon">$1</span>')
				.replace(/([a-zA-Z-]+)(\s*):/g, '<span class="ss-property">$1</span>$2:')
				.replace(/(\.[a-zA-Z0-9_-]+)/g, '<span class="ss-class">$1</span>')
				.replace(/(\#[a-zA-Z0-9_-]+)/g, '<span class="ss-id">$1</span>');



		}


		if (options.language != "none") {

			text = text.replace(/„/g, '"');
			text = text.replace(/‚/g, "'");
		}


		return text;
	}

	function findAllBraces() {

	}

	function handleTextChange() {
		this.removeEventListener('input', handleTextChange);
		let textContent = this.value;
		var highlightedHtml = highlightSyntax();
		codeDiv.innerHTML = highlightedHtml + "<br>";
		updateLineNumbers();

		this.addEventListener('input', handleTextChange);
	}



	textarea.addEventListener('click', function(event) {
		if (options.matchBraces) {
			var caretPosition = textarea.selectionStart;
			var caretBracePos = caretPosition;

			let code = textarea.value;


			var braceChar = "";

			if (code[caretPosition] === '{') {
				braceChar = '{';
			} else if (code[caretPosition] === '}') {
				braceChar = '}';
			} else if (code[caretPosition] === '(') {
				braceChar = '(';
			} else if (code[caretPosition] === ')') {
				braceChar = ')';
			} else if (code[caretPosition - 1] === '{') {
				braceChar = '{';
				caretBracePos--;
			} else if (code[caretPosition - 1] === '}') {
				braceChar = '}';
				caretBracePos--;
			} else if (code[caretPosition - 1] === '(') {
				braceChar = '(';
				caretBracePos--;
			} else if (code[caretPosition - 1] === ')') {
				braceChar = ')';
				caretBracePos--;
			}

			var currentIndex;
			if (braceChar == "{" || braceChar == "}")
				currentIndex = curlyBracesIndexes.indexOf(caretBracePos)
			else
				currentIndex = roundBracesIndexes.indexOf(caretBracePos)

			var braceIndex = -1;
			var braceFound = false;

			var braceCount = 1;
			if (braceChar == '{' && currentIndex != -1)
				for (let i = currentIndex + 1; i < curlyBracesTypes.length; i++) {
					switch (curlyBracesTypes[i]) {
						case '{':
							braceCount++;
							break;
						case '}':
							if ((braceCount - 1) == 0) {
								braceIndex = i;
								braceFound = true;
							} else braceCount--;
							break;
					}
					if (braceFound) break;
				}
			else if (braceChar == '}' && currentIndex != -1)
				for (let i = currentIndex - 1; i >= 0; i--) {
					switch (curlyBracesTypes[i]) {
						case '}':
							braceCount++;
							break;
						case '{':
							if ((braceCount - 1) == 0) {
								braceIndex = i;
								braceFound = true;
							} else braceCount--;
							break;
					}
					if (braceFound) break;
				}
			else if (braceChar == '(' && currentIndex != -1)
				for (let i = currentIndex + 1; i < roundBracesTypes.length; i++) {
					switch (roundBracesTypes[i]) {
						case '(':
							braceCount++;
							break;
						case ')':
							if ((braceCount - 1) == 0) {
								braceIndex = i;
								braceFound = true;
							} else braceCount--;
							break;
					}
					if (braceFound) break;
				}
			else if (braceChar == ')' && currentIndex != -1)
				for (let i = currentIndex - 1; i >= 0; i--) {
					switch (roundBracesTypes[i]) {
						case ')':
							braceCount++;
							break;
						case '(':
							if ((braceCount - 1) == 0) {
								braceIndex = i;
								braceFound = true;
							} else braceCount--;
							break;
					}
					if (braceFound) break;
				}

			var highlightedBraces = document.querySelectorAll('.ss-highlight');
			highlightedBraces.forEach(function(highlightedBrace) {
				highlightedBrace.classList.remove('ss-highlight');
			});



			if (braceIndex !== -1 && currentIndex !== -1) {
				var braceElements;
				if (braceChar == "{" || braceChar == "}")
					braceElements = codeDiv.querySelectorAll('.ss-curly-brace');
				else
					braceElements = codeDiv.querySelectorAll('.ss-round-brace');
				if (currentIndex < braceElements.length) {
					let braceElement = braceElements[currentIndex];
					braceElement.classList.add('ss-highlight');
				}
				if (braceIndex < braceElements.length) {
					let braceElement = braceElements[braceIndex];
					braceElement.classList.add('ss-highlight');
				}
			}
		}
	});

	this.insertText = function(text) {
		if (document.activeElement !== textarea) {
			textarea.focus();
		}
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		var beforeText = textarea.value.substring(0, startPos);
		var afterText = textarea.value.substring(endPos, textarea.value.length);
		textarea.value = beforeText + text + afterText;
		textarea.selectionStart = startPos;
		textarea.selectionEnd = startPos + text.length;
		handleTextChange();
	}

	this.insertHtmlTag = function(tagName) {
		if (document.activeElement !== textarea) {
			textarea.focus();
		}
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		var beforeText = textarea.value.substring(0, startPos);
		var afterText = textarea.value.substring(endPos, textarea.value.length);
		var selectedText = textarea.value.substring(startPos, endPos);
		var htmlTag = '<' + tagName + '>' + selectedText + '</' + tagName + '>';
		textarea.value = beforeText + htmlTag + afterText;
		textarea.selectionStart = startPos;
		textarea.selectionEnd = startPos + htmlTag.length;
		handleTextChange();
	}

	textarea.addEventListener('keydown', function(event) {

        if (event.key == 'Tab') {
            event.preventDefault();
            
            let selStart = textarea.selectionStart;
            let selEnd = textarea.selectionEnd;
            
            textarea.value = textarea.value.substring(0, selStart) +
                options.tabChars + textarea.value.substring(selEnd);
            textarea.selectionStart = textarea.selectionEnd = selStart + options.tabChars.length;
            handleTextChange();
        }

		if (event.ctrlKey && (event.key === 'f' || event.keyCode === 70)) {
			if (options.findAndReplace) {
				event.preventDefault();
				replaceInput.style.display = 'none';
				replaceButton.style.display = 'none';
				replaceAllButton.style.display = 'none';
				searchbarDiv.style.height = '46px';
				searchbarDiv.style.display = 'block';
			}
		}
		if (event.ctrlKey && (event.key === 'h' || event.keyCode === 72)) {
			if (options.findAndReplace) {
				event.preventDefault();
				replaceInput.style.display = 'inline-block';
				replaceButton.style.display = 'inline-block';
				replaceAllButton.style.display = 'inline-block';
				searchbarDiv.style.height = '67px';
				searchbarDiv.style.display = 'block';
			}
		}
	});

	let textContent = textarea.value;
	var highlightedHtml = highlightSyntax();
	codeDiv.innerHTML = highlightedHtml;
	updateLineNumbers();
	textarea.addEventListener('input', handleTextChange);

	textarea.addEventListener('scroll', function(event) {
		codeDiv.scrollTop = textarea.scrollTop;
		linesDiv.scrollTop = textarea.scrollTop;
		codeDiv.scrollLeft = textarea.scrollLeft;
	});
}