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
.bar_2
    width 123px;
.bar_3
    width: 123px
.bar_4
    width: 123px;
.bar_5
    &:hover
        color red
.bar-{$index}
    color red
`;

const expected = `body {
    font: 14px/1.5 Helvetica, arial, sans-serif;
    & #logo {
        border-radius: 5px;
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
.bar_2 {
    width: 123px;
}
.bar_3 {
    width: 123px;
}
.bar_4 {
    width: 123px;
}
.bar_5 {
    &:hover {
        color: red;
    }
}
.bar-\${index} {
    color: red;
}
`;

assert.equal(expected, converter(src));
