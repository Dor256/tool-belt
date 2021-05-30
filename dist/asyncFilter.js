"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncFilter = void 0;
async function asyncFilter(array, fn) {
    const booleanArray = await Promise.all(array.map(fn));
    return array.filter((_, i) => booleanArray[i]);
}
exports.asyncFilter = asyncFilter;
