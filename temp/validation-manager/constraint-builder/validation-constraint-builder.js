"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationConstraintBuilder = exports.ValidationConstraintTypeEnum = void 0;
var ValidationConstraintTypeEnum;
(function (ValidationConstraintTypeEnum) {
    ValidationConstraintTypeEnum["required"] = "required";
    ValidationConstraintTypeEnum["min"] = "min";
    ValidationConstraintTypeEnum["max"] = "max";
    ValidationConstraintTypeEnum["minLength"] = "minLength";
    ValidationConstraintTypeEnum["maxLength"] = "maxLength";
    ValidationConstraintTypeEnum["pattern"] = "pattern";
    ValidationConstraintTypeEnum["custom"] = "custom";
})(ValidationConstraintTypeEnum || (exports.ValidationConstraintTypeEnum = ValidationConstraintTypeEnum = {}));
exports.ValidationConstraintBuilder = function (type) {
    this.type = type;
    this.errorMessage = null;
    this.guideMessage = null;
    this.setConstraint = function (constraint) {
        this.constraint = constraint;
        return this;
    };
    this.setName = function (name) {
        this.name = name;
        return this;
    };
    this.setErrorMessage = function (errorMessage) {
        this.errorMessage = errorMessage;
        return this;
    };
    this.setGuideMessage = function (guideMessage) {
        this.guideMessage = guideMessage;
        return this;
    };
    this.build = function () {
        return {
            [this.type]: {
                value: this.constraint,
                error: {
                    message: this.errorMessage,
                    code: this.type,
                    name: this.name ?? this.type
                },
                guide: {
                    message: this.guideMessage,
                    code: this.type,
                    name: this.name ?? this.type
                }
            }
        };
    };
    this.clone = function () {
        const cloneInstance = new exports.ValidationConstraintBuilder(this.type);
        cloneInstance.type = this.type;
        cloneInstance.constraint = this.constraint;
        cloneInstance.errorMessage = this.errorMessage;
        cloneInstance.guideMessage = this.guideMessage;
        return cloneInstance;
    };
};
