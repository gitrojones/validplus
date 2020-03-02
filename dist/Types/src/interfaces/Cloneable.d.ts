/**
 * Cloneable indicates the element follows the clone pattern
 */
export default interface Cloneable {
    clone: () => Cloneable;
}
