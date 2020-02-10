const fs = require('fs');
const uglifycss = require('uglifycss');

module.exports = {
  getCSS(coreStyles, layoutStyles) {
    let css = '';
    let partials = [];

    if (coreStyles) {
      partials = [...partials, ...coreStyles];
    }

    if (layoutStyles) {
      partials = [...partials, ...layoutStyles];
    }

    css += fs.readFileSync(`${__dirname}/tmp/css/reset.css`, 'utf-8');
    css += fs.readFileSync(`${__dirname}/tmp/css/tokens.css`, 'utf-8');

    if (partials.length) {
      partials.forEach(partial => {
        css += fs.readFileSync(`${__dirname}/tmp/css/${partial}`);
      });
    }

    return uglifycss.processString(css);
  }
};
