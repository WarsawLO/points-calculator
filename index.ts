const { Subject } = require('rxjs');

export const func1 = (person: string) => {
    return `to jest ${person}`
};

func1('Ana');



module.exports = class PointsCalculator{
    mode: string;
    examResult: {
        polish: number,
        math: number,
        lang: number,
        science: number,
        history: number
    };
    accomplishments: string[];
    grades: {
        polish: number,
        math: number,
        firstSubject: number,
        secondSubject: number
    };
    other: {
        merit: boolean,
        activity: boolean
    };
    mapping: {
        grades: {
            0: number,
            1: number,
            2: number,
            3: number,
            4: number,
            5: number,
            6: number
        },
        other: {
            merit: number,
            activity: number
        },
        accomplishments: {
            'Co najmniej podwójny finalista konkursu przedmiotowego': number,
            'Co najmniej podwójny laureatem konkursu tematycznego lub interdyscyplinarnego': number,
            'Co najmniej podwójny finalista konkursu tematycznego lub interdyscyplinarnego': number,
            'Finalista konkursu przedmiotowego ': number,
            'Laureat konkursu tematycznego lub interdyscyplinarnego': number,
            'Finalista konkursu tematycznego lub interdyscyplinarnego': number,
            'Finalista konkursu przedmiotowego': number,
            // 'Laureat konkursu tematycznego lub interdyscyplinarnego': 7,
            // 'Finalista konkursu tematycznego lub interdyscyplinarnego': 5,
            'Finalista konkursu z przedmiotu lub przedmiotów artystycznych objętych ramowym planem nauczania szkoły artystycznej': number,
            'Laureat turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej': number,
            'Finalista turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej': number
        }
    };
    points: {
        curr: any,
        all: any,
        next: any
    };

    constructor(mode: string){
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

        this.points = new Subject()
    }

    setExamResult(examResult: object){
        this.examResult = {
            ...this.examResult,
            ...examResult
        };
        this.calc();
        return this;
    }

    setGrades(grades: object){
        this.grades = {
            ...this.grades,
            ...grades
        };
        this.calc();
        return this;
    }

    setAccomplishments(accomplishments: string[]){
        this.accomplishments = [ ...this.accomplishments, ...accomplishments];
        this.calc();
        return this;
    }

    setMerit(merit: boolean){ // ?
        this.other.merit = Boolean(merit);
        this.calc();
        return this;
    }

    setActivity(activity: boolean){ // ?
        this.other.activity = Boolean(activity);
        this.calc();
        return this
    }

    calc(){
        let points = {
            all: 0
        };
        let calculated = [
                'examPoints',
                'gradesPoints',
                'otherPoints',
                'accomplishmentsPoints'
            ].reduce((prev, curr) => {
                let value = this[`calc${curr.charAt(0).toUpperCase() + curr.slice(1)}`]();
                points[curr] = value;
                return prev + value
            }, 0);
        points.all = calculated;
        this.points.next(points);
        return calculated;
    }

    calcExamPoints(){
        let {
            polish,
            math,
            lang
        } = this.examResult;

        let examResult = {
            polish,
            math,
            lang,
            science: 0,
            history: 0
        };

        if (this.mode === 'primarySchool')
            return Object.entries(examResult)
                .reduce((prev, curr) => prev + curr[1]*(curr[0] !== 'lang' ? 0.35 : 0.3), 0);

        examResult = {
            ...examResult,
            science: this.examResult.science,
            history: this.examResult.history
        };
        return Object.values(examResult).reduce((prev, curr) => prev + curr*0.2, 0);
    }

    calcGradesPoints(){
        return Object.values(this.grades)
            .map(grade => {
                if(grade < 0 || grade > 6 || !Number.isInteger(grade))
                    throw new Error('Invalid grade value');
                return grade;
            })
            .reduce((prev, curr) => prev + this.mapping.grades[curr], 0);
    }

    calcAccomplishmentsPoints(){
        return this.accomplishments
            .reduce((prev, curr) => prev + this.mapping.accomplishments[curr], 0);
    }

    calcOtherPoints(){
        return Object.keys(this.other)
            .reduce((prev, curr) => this.other[curr] ? (prev + this.mapping.other[curr]) : prev, 0);
    }
};
