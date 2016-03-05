function HTMLParser() {
	// Variables shared by the parsing functions
	// to keep track of the data
	var pos = 0, input = ''; // we're shifting off + keeping track of where we are.
	
	// Used in your parser to throw errors
	var assert = function(condition) {
		if(!condition) {
			throw new Error("test failed");
		} // if not true throw an error
	}

	function parse(html) {
		pos = 0;
		input = html;

		var nodes = parseNodes();

		// wrap nodes in HTML if not a single root node
		if(nodes.length === 1) {
			return nodes[0];
		} else { 
			return new ElementNode('html', [], nodes);
		}
	}

	// parse a sequence of sibling nodes
	function parseNodes() {
		var nodes = [];
		while (true) {
			consumeWhiteSpace();
			if (eof() === true || startsWith('</') === true) {
			    break;
			}

			nodes.push(parseNode());
		}
		return nodes;
	}

	// Step 1:
	// Parse a single node, either an element or text node
	function parseNode() {
		// if the first char is a <, parse an Element
  	// else parseText


  	
  	/* if (startsWith("<")) {
					


  	}
  	*/

  	if (nextChar() === "<") {
  		return parseElement();
  	} else {
  		return parseText();
  	}


	}


	// Step 2:
	// Parse a single element tag
	function parseElement() {
		// check that we're starting with a <
    assert(consumeChar() === '<');

		// parseTagName
		var tagName = parseTagName();

		// TODO: parseAttributes
		var attrs = parseAttributes();

		// check that we've got an end >
		// 
		// <div class="MyClass"><h1>adsfs</h1>aflsdajkflsjdfkldjfkladsf</div>
    assert(consumeChar() === '>');

		// TODO: Parse all it's children Nodes (using parseNodes)
		var children = parseNodes();

    // check that we have a matching end tag
    // and that the tag is the same 
    // hint:
    //   use parseTagName to get the tagName and match it to the previous one
        assert(consumeChar() === '<');
        assert(consumeChar() === '/');
        assert(parseTagName() === tagName);
        assert(consumeChar() === '>');		

        return new ElementNode(tagName, attrs, children);
	}

	// this will return the tagName as a String

	// will keep consuming characters that pass those rules

	function parseTagName() {

		var tagName = "";
		while(/[A-Za-z0-9]/.test(nextChar())) {
			tagName += consumeChar();
		}
		return tagName;
		// function isTagNameChar(str) {
		// 	var nextChar = str.charAt(0);
		// 	return /[A-Za-z0-9]/.test(nextChar);
		// }

		// return consumeWhile(isTagNameChar);
	}

	// Step 3: Parse a set of attributes inside the element
	// e.g. class="my-class" id="testId"
	// Hint:
	// - You have continue parsing until you find the >
	// - Consume White Space until you find an Attribute	
	// 
	// attributes = attr*
	function parseAttributes() {
		var attributes = {};
		
		while(true) {

			consumeWhiteSpace(); // while true, eat up all the 
			// white space (between tag and attritubes)
			// keep going until we see: 
			if(nextChar() === '>') {break;}

			var attrData = parseAttribute();

			// merging into 1 attritube object
			attributes[attrData.name] = attrData.value;
		}

    
    
    return attributes;
	}

	// Step 4: Parse a single attribute assignment
	// e.g. class="myClass"
	function parseAttribute() {
		var name, value;

		name = parseTagName();
		assert(consumeChar() === '='); // consume =
		value = parseAttributeValue();

		return {
			name: name,
			value: value
		};
	}


	// Step 5: Parse a Quoted Value "myClass"
	// class="sectionTitle slider-image"
	function parseAttributeValue() {

		var value = ""
		if (nextChar() === '"'){
			consumeChar();
		}
		while (nextChar() !== '"'){
			value += consumeChar();
		}
		consumeChar();
		return value;

	}

	/*
		Consume text and create a TextNode
	 */
	 function parseText() {
	 	var innerText = consumeWhile(isTextChar);
	 	return new TextNode(innerText);
	 }


	// Given Utility Functions for your Parser
	// These should be pretty clear
	function isTextChar(c) {
		return c !== '<';
	}

	function consumeWhiteSpace() {
		consumeWhile(isWhiteSpace);
	}

	function isWhiteSpace(c) {
		return c === ' ' || c === '\n';
	}

	function consumeWhile(testFn) {
		var result = '';

		while(!eof() && testFn(nextChar())) {
			result += consumeChar();
		}
		return result;
	}

// get and peek in calculator parser
	function consumeChar() {
		return input.charAt(pos++);
	}

	function nextChar() {
		return input.charAt(pos);
	}

	function startsWith(str) {
		return input.substr(pos).indexOf(str) === 0;
	}

// once that's true we've parsed all tokens
	function eof() {
		return pos >= input.length;
	}

	return {
		parse: parse
	}

}



