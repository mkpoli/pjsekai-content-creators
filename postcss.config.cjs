const cssnano = require("cssnano");
const lab = require('postcss-lab-function')
const nesting = require('postcss-nesting');

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const config = {
	plugins: [
		lab(),
		nesting(),
		!dev && cssnano({
			preset: "default",
		}),
	],
};

module.exports = config;