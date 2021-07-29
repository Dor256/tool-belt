"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maybe = void 0;
class Maybe {
    #value;
    constructor(value) {
        this.#value = value;
    }
    static Just(value) {
        return new Maybe(value);
    }
    static Nothing() {
        return new Maybe(null);
    }
    static fromValue(value) {
        if (value === null || value === undefined) {
            return Maybe.Nothing();
        }
        return Maybe.Just(value);
    }
    inCaseOf(options) {
        if (this.#value === undefined || this.#value === null) {
            return options.Nothing();
        }
        return options.Just(this.#value);
    }
    orElse(fallback) {
        return this.#value ?? fallback;
    }
    map(f) {
        if (this.#value === null || this.#value === undefined) {
            return Maybe.Nothing();
        }
        return Maybe.fromValue(f(this.#value));
    }
    flatMap(f) {
        if (this.#value === null || this.#value === undefined) {
            return Maybe.Nothing();
        }
        return f(this.#value);
    }
}
exports.Maybe = Maybe;
