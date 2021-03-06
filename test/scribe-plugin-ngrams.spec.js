var chai = require('chai');
var webdriver = require('selenium-webdriver');
var helpers = require('scribe-test-harness/helpers');

var expect = chai.expect;

var when = helpers.when;
var given = helpers.given;
var givenContentOf = helpers.givenContentOf;
var executeCommand = helpers.executeCommand;

var scribeNode;
beforeEach(function() {
  scribeNode = helpers.scribeNode;
});

describe('scribe-plugin-words-bigrams-sentences', function(){
    /* This test was generated by the grunt-init plugin */
    givenContentOf("<p>some content</p>", function () {
        when('the command is executed', function () {
            it('should return the ngrams in an object', function() {
                executeCommand('ngrams').then(function (value) {
                    expect(value).to.have.property('bigrams');
                });
            });
        });
    });
});
