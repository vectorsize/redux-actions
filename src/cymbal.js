/**
 * Small pseudo-polyphill that emulates Symbols "uniqueness"
 */
const shortid = require('shortid');
const Cymbal = str => `${shortid.generate()}:${str}`;
export default Cymbal;
