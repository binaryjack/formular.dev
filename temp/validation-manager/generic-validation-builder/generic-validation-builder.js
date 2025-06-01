"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericValidationBuilder = void 0;
exports.GenericValidationBuilder = function () {
    this.constraints = [];
    this.setConstraints = function (constraints) {
        this.constraints = constraints;
        return this;
    };
    this.build = function () {
        const output = this.constraints.map((constraint) => constraint.build());
        return output;
    };
    this.clone = function () {
        const clone = new exports.GenericValidationBuilder();
        clone.setConstraints(this.constraints.map((c) => c.clone()));
        return clone;
    };
    return this;
};
