const cssnano = require("cssnano");
const lab = require('postcss-lab-function')
const colormod = require('postcss-color-mod-function');
const nesting = require('postcss-nesting');
const normalize = require('postcss-normalize')

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const config = {
	plugins: [
		lab(),
		colormod(),
		nesting(),
		normalize(),
		!dev && cssnano({
			preset: "default",
		}),
	],
};

module.exports = config;