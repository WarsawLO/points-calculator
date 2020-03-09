"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Subject = require('rxjs').Subject;
exports.func1 = function (person) {
    return "to jest " + person;
};
exports.func1('Ana');
module.exports = /** @class */ (function () {
    function PointsCalculator(mode) {
        this.mode = mode === 'secondarySchool' ? mode : 'primarySchool';
        this.examResult = {
            polish: 0,
            math: 0,
            lang: 0,
            science: 0,
            history: 0
        };
        this.accomplishments = [];
        this.grades = {
            polish: 0,
            math: 0,
            firstSubject: 0,
            secondSubject: 0
        };
        this.other = {
            merit: false,
            activity: false
        };
        this.mapping = {
            grades: {
                0: 0,
                1: 0,
                2: 2,
                3: 8,
                4: 14,
                5: 17,
                6: 18
            },
            other: {
                merit: 7,
                activity: 3
            },
            accomplishments: {
                'Co najmniej podwójny finalista konkursu przedmiotowego': 10,
                'Co najmniej podwójny laureatem konkursu tematycznego lub interdyscyplinarnego': 7,
                'Co najmniej podwójny finalista konkursu tematycznego lub interdyscyplinarnego': 5,
                'Finalista konkursu przedmiotowego ': 7,
                'Laureat konkursu tematycznego lub interdyscyplinarnego': 5,
                'Finalista konkursu tematycznego lub interdyscyplinarnego': 3,
                'Finalista konkursu przedmiotowego': 10,
                // 'Laureat konkursu tematycznego lub interdyscyplinarnego': 7,
                // 'Finalista konkursu tematycznego lub interdyscyplinarnego': 5,
                'Finalista konkursu z przedmiotu lub przedmiotów artystycznych objętych ramowym planem nauczania szkoły artystycznej': 10,
                'Laureat turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej': 4,
                'Finalista turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej': 3
            }
        };
        this.calcGradesPoints = this.calcGradesPoints.bind(this);
        this.calcOtherPoints = this.calcOtherPoints.bind(this);
        this.calcAccomplishmentsPoints = this.calcAccomplishmentsPoints.bind(this);
        this.calcExamPoints = this.calcExamPoints.bind(this);
        this.points = new Subject();
    }
    //
    PointsCalculator.prototype.setExamResult = function (examResult) {
        this.examResult = __assign(__assign({}, this.examResult), examResult);
        this.calc();
        return this;
    };
    //
    PointsCalculator.prototype.setGrades = function (grades) {
        this.grades = __assign(__assign({}, this.grades), grades);
        this.calc();
        return this;
    };
    //
    PointsCalculator.prototype.setAccomplishments = function (accomplishments) {
        this.accomplishments = __spreadArrays(this.accomplishments, accomplishments);
        this.calc();
        return this;
    };
    //
    PointsCalculator.prototype.setMerit = function (merit) {
        this.other.merit = Boolean(merit);
        this.calc();
        return this;
    };
    //
    PointsCalculator.prototype.setActivity = function (activity) {
        this.other.activity = Boolean(activity);
        this.calc();
        return this;
    };
    //
    PointsCalculator.prototype.calc = function () {
        var _this = this;
        var points = {
            all: 0
        };
        var calculated = [
            'examPoints',
            'gradesPoints',
            'otherPoints',
            'accomplishmentsPoints'
        ].reduce(function (prev, curr) {
            var value = _this["calc" + (curr.charAt(0).toUpperCase() + curr.slice(1))]();
            points[curr] = value;
            return prev + value;
        }, 0);
        points.all = calculated;
        this.points.next(points);
        return calculated;
    };
    //
    PointsCalculator.prototype.calcExamPoints = function () {
        var _a = this.examResult, polish = _a.polish, math = _a.math, lang = _a.lang;
        var examResult = {
            polish: polish,
            math: math,
            lang: lang,
            science: 0,
            history: 0
        };
        if (this.mode === 'primarySchool')
            return Object.entries(examResult)
                .reduce(function (prev, curr) { return prev + curr[1] * (curr[0] !== 'lang' ? 0.35 : 0.3); }, 0);
        examResult = __assign(__assign({}, examResult), { science: this.examResult.science, history: this.examResult.history });
        return Object.values(examResult).reduce(function (prev, curr) { return prev + curr * 0.2; }, 0);
    };
    //
    PointsCalculator.prototype.calcGradesPoints = function () {
        var _this = this;
        return Object.values(this.grades)
            .map(function (grade) {
            if (grade < 0 || grade > 6 || !Number.isInteger(grade))
                throw new Error('Invalid grade value');
            return grade;
        })
            .reduce(function (prev, curr) { return prev + _this.mapping.grades[curr]; }, 0);
    };
    PointsCalculator.prototype.calcAccomplishmentsPoints = function () {
        var _this = this;
        return this.accomplishments.reduce(function (prev, curr) { return prev + _this.mapping.accomplishments[curr]; }, 0);
    };
    PointsCalculator.prototype.calcOtherPoints = function () {
        var _this = this;
        return Object.keys(this.other).reduce(function (prev, curr) { return _this.other[curr] ? (prev + _this.mapping.other[curr]) : prev; }, 0);
    };
    return PointsCalculator;
}());
