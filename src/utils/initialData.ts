import {CalculatedPoints, InputData} from "../types";

export const initialInputData: InputData = {
    examResult: {
        polish: null,
        math: null,
        lang: null
    },
    grades: {
        polish: null,
        math: null,
        firstSubject: null,
        secondSubject: null
    },
    merit: false,
    activity: false,
    accomplishments: []
};

export const initialCalculatedPoints: CalculatedPoints = {
    total: 0,
    examResult: {
        total: 0,
        polish: 0,
        math: 0,
        lang: 0,
        science: 0,
        history: 0
    },
    grades: {
        total: 0,
        polish: 0,
        math: 0,
        firstSubject: 0,
        secondSubject: 0
    },
    merit: 0,
    activity: 0,
    accomplishments: {
        total: 0,
        list: {}
    }
};
