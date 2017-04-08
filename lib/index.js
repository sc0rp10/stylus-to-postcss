const postcss = require('postcss');
const parser = require('sugarss');
const stringifier = require('postcss-scss');

module.exports = (str) => {
    const output = postcss()
        .process(str, {
            stringifier,
            parser,
        })
        .css
        .trim()
        .replace(/\{\}/g, '') // skip stringifier bug with {} at each block ending
        .replace(/\t/g, '    ') // tabs -> spaces
    ;

    const lines = output.split('\n').map(line => line.trimRight()).map((line) => {
        let content = line.trim();
        const indents = ' '.repeat(line.length - content.length);

        if (content.length === 0) {
            return '';
        }

        if (content.indexOf('}') === -1 && content.indexOf('{') === -1 && !content.endsWith(',')) {
            // this is not selector
            const parts = content.split(' ');

            if (parts.length > 1 && /^[a-z-]+$/.test(parts[0])) {
                // this is ordinar `rule: value` string
                content = `${parts[0]}: ${parts.slice(1).join(' ')}`;
            } else {
                if (!/^\//.test(parts[0])) {
                    // this is no rule, no comment, maybe there is mixin?
                    content = content.replace(/\(/g, ' ').replace(/\)/g, '').trimRight();
                    content = `@mixin ${content}`;
                }
            }

            content = `${content};`;
        }

        return `${indents}${content}`;
    });

    lines.push('');

    return lines.join('\n');
};
