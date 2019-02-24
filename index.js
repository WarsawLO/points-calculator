exports = class PointsCalculator{
    constructor(mode){
        this.mode = mode === 'secondarySchool' ? mode : 'primarySchool'
        this.examResult = {
            polish: 0,
            math: 0,
            lang: 0,
            science: 0,
            history: 0
        }
        this.accomplishments = []
        this.grades = {
            polish: 0,
            math: 0,
            firstSubject: 0,
            secondSubject: 0
        }
        this.other = {
            merit: false,
            activity: false
        }


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
                    'Laureat konkursu tematycznego lub interdyscyplinarnego': 7,
                    'Finalista konkursu tematycznego lub interdyscyplinarnego': 5,
                    'Finalista konkursu z przedmiotu lub przedmiotów artystycznych objętych ramowym planem nauczania szkoły artystycznej': 10,
                    'Laureat turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej': 4,
                    'Finalista turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej': 3
            }
        }
    this._calcGradesPoints = this._calcGradesPoints.bind(this)
    this._calcOtherPoints = this._calcOtherPoints.bind(this)
    this._calcAccomplishmentsPoints = this._calcAccomplishmentsPoints.bind(this)
    this._calcExamPoints = this._calcExamPoints.bind(this)
    }
    setExamResult(examResult){
        this.examResult = {
            ...this.examResult,
            ...examResult
        }
        return this
    }
    setGrades(grades){
        this.grades = {
            ...this.grades,
            ...grades
        }
        return this
    }
    setAccomplishments(accomplishments){
        this.accomplishments = [ ...this.accomplishments, ...accomplishments]
        return this
    }
    setMerit(merit){
        this.other.merit = Boolean(merit)
        return this
    }
    setActivity(activity){
        this.other.activity = Boolean(activity)
        console.log(this.other)
        return this
    }

    calc(){
        return [
            this.calcExamPoints,
            this.calcGradesPoints,
            this.calcOtherPoints,
            this.calcAccomplishmentsPoints
        ].reduce((prev, curr) => prev + curr(), 0)
    }
    calcExamPoints(){
        let {
            polish,
            math,
            lang
        } = this.examResult
        let examResult = {
            polish,
            math,
            lang
        }
        
        if(this.mode === 'primarySchool')
            return Object.entries(examResult).reduce((prev, curr) => prev+curr[1]*(curr[0] !== 'lang' ? 0.35 : 0.3),0)
        
        examResult = {
            ...examResult,
            science: this.examResult.science,
            history: this.examResult.history
        }
        return Object.values(examResult).reduce((prev, curr) => prev+curr*0.2,0)
    }
    
    calcGradesPoints(){
        return Object.values(this.grades)
        .map(grade => {
            if(grade < 0 || grade > 6 || !Number.isInteger(grade))
                throw new Error('Invalid grade value')
            return grade
        })
        .reduce((prev, curr) => prev + this.mapping.grades[curr], 0)
    }
    calcAccomplishmentsPoints(){
        return this.accomplishments.reduce((prev, curr) => prev + this.mapping.accomplishments[curr], 0)
    }
    calcOtherPoints(){
        return Object.keys(this.other).reduce((prev, curr) => this.other[curr] ? (prev + this.mapping.other[curr]) : prev, 0)
    }
}