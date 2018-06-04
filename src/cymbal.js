/**
 * Small pseudo-polyphill that emulates Symbols "uniqueness"
 */
import shortid from 'shortid';
const Cymbal = str => `${shortid.generate()}:${str}`;
export default Cymbal;
