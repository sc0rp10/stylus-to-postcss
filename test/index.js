#!/usr/bin/env node
const assert = require('assert');
const converter = require('../lib/index.js');

const src = `body
    font 14px/1.5 Helvetica, arial, sans-serif
    & #logo
        border-radius 5px;
.foo
    min-width()
    height(1px, 2px)

// single line comment
.bar
    width 42
/* block comment */
.baz
    &_mod
        position absolute
`;

const expected = `body {
    font: 14px/1.5 Helvetica, arial, sans-serif;
    & #logo {
        border-radius: 5px;;
    }
}
.foo {
    @mixin min-width;
    @mixin height 1px, 2px;
}

// single line comment;
.bar {
    width: 42;
}
/* block comment */;
.baz {
    &_mod {
        position: absolute;
    }
}
`;

assert.equal(expected, converter(src));
