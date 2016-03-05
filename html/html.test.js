describe('HTMLParser', function () {

    // Careful, once you uncomment this, you'll get an infinite loop
    // because of the while(true) in parseNodes
    // see if you can parseNode, parseElement implemented and then uncomment this
    it('should parse <html> tags', function () {
        var nodes = HTMLParser().parse('<html></html>');
        expect(nodes.children).to.eql([]);
        expect(nodes.attributes).to.eql({});
        expect(nodes.tagName).to.eql('html');
    });

    it('should parse html with newlines', function () {
        var nodes = HTMLParser().parse('<html>\n</html>');
        expect(nodes.children).to.eql([]);
        expect(nodes.attributes).to.eql({});
        expect(nodes.tagName).to.eql('html');
    });

    it('should parse nested tags', function () {
        var nodes = HTMLParser().parse('<html><body></body></html>');
        expect(nodes.children[0].tagName).to.eql('body');
        expect(nodes.children[0].children).to.eql([]);
        expect(nodes.attributes).to.eql({});
        expect(nodes.tagName).to.eql('html');
    });

    it('should parse text nodes', function () {
        var nodes = HTMLParser().parse('<html>hello</html>');

        expect(nodes.children[0].text).to.eql("hello");
        expect(nodes.attributes).to.eql({});
        expect(nodes.tagName).to.eql('html');
    });

    it('should parse attributes with quoted values', function () {
        var nodes = HTMLParser().parse('<html lang="us"></html>');
        expect(nodes.children).to.eql([]);
        expect(nodes.attributes).to.eql({
            lang: 'us'
        });
        expect(nodes.tagName).to.eql('html');
    });

    it('should create a root element if sibling nodes are parsed', function () {
        var nodes = HTMLParser().parse('<div></div><div></div>');
        expect(nodes.tagName).to.eql('html');
        expect(nodes.children.length).to.equal(2);
    });

    
});
