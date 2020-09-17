import {
    Accomplishment, AccomplishmentsList,
    AccomplishmentsPoints,
    CalculatedPoints,
    ExamResult, ExamResultPoints,
    Grades,
    GradesPoints,
    InputData,
    Config, WatchFunction
} from "./types";
import {initialCalculatedPoints, initialInputData} from "./utils/initialData";
import {isExamResultValid, isGradeValid} from "./utils/validators";


export class PointsCalculator {
    readonly config: Config;
    private inputData: InputData = {...initialInputData};
    private calculatedPoints: CalculatedPoints = {...initialCalculatedPoints};
    private watchFn?: WatchFunction

    constructor(config: Config){
        this.config = config;

        this.calcGradesPoints = this.calcGradesPoints.bind(this);
        this.calcAccomplishmentsPoints = this.calcAccomplishmentsPoints.bind(this);
        this.calcExamResultPoints = this.calcExamResultPoints.bind(this);
    }

    watch(cb: WatchFunction) {
        this.watchFn = cb;
    }

    get points(): CalculatedPoints{
        return this.calculatedPoints;
    }

    private savePoints(points: CalculatedPoints){
        this.calculatedPoints = points;

        if(typeof this.watchFn === 'function')
            this.watchFn(this.calculatedPoints)
    }

    get data(){
        return this.inputData;
    }

    setData(data: Partial<InputData>){
        this.inputData = {
            ...this.inputData,
            ...data
        };
        this.calc();
    }

    setExamResult(examResult: Partial<ExamResult>){
        this.inputData.examResult = {
            lang: undefined, math: undefined,
            ...this.inputData.examResult,
            ...examResult
        };
        this.calc();
    }

    setGrades(grades: Partial<Grades>){
        this.inputData.grades = {
            ...this.inputData.grades,
            ...grades
        };
        this.calcGradesPoints();
    }

    setAccomplishments(accomplishments: Accomplishment | Accomplishment[]){
        this.inputData.accomplishments = [
            ...this.inputData.accomplishments,
            ...(Array.isArray(accomplishments) ? accomplishments : [accomplishments])
        ];
        this.calcAccomplishmentsPoints();
    }

    setMerit(merit: boolean){
        this.inputData.merit = merit;
        this.calcPointsFromBoolean('merit');
    }

    setActivity(activity: boolean){
        this.inputData.activity = activity;
        this.calcPointsFromBoolean('activity');
    }

    private calc(){
        const points = {
            grades: this.calcGradesPoints(false),
            examResult: this.calcExamResultPoints(false),
            merit: this.calcPointsFromBoolean('merit', false),
            activity: this.calcPointsFromBoolean('activity', false),
            accomplishments: this.calcAccomplishmentsPoints(false)
        };
        this.savePoints({
            ...points,
            total: PointsCalculator.calcTotalFromAll(points as Omit<CalculatedPoints, 'total'>)
        })
    }

    private calcExamResultPoints(propagate=true): ExamResultPoints{
        let total = 0;
        const examResultPoints: Partial<ExamResultPoints> = {};
        for(const [subject, score] of Object.entries(this.inputData.examResult)){
            if(!isExamResultValid(score))
                throw new Error('Invalid exam score value');

            // @ts-ignore
            const pointsFromSubject = score === null ? 0 : score * this.config.examResult[subject];
            examResultPoints[subject] = pointsFromSubject;
            total += pointsFromSubject;
        }
        const output = {
            ...initialCalculatedPoints.examResult,
            total,
            ...examResultPoints
        };

        if(propagate)
            this.saveCategoryPoints<ExamResultPoints>('examResult', output);

        return output;
    }

    private calcGradesPoints(propagate=true): GradesPoints{
        let total = 0;
        const gradesPoints: Partial<GradesPoints> = {};
        for(const [subject, grade] of Object.entries(this.inputData.grades)){
            if(!isGradeValid(grade))
                throw new Error('Invalid grade value');

            const pointsFromGrade = grade === null ? 0 : this.config.grades[grade-1];
            gradesPoints[subject] = pointsFromGrade;
            total += pointsFromGrade;
        }

        const output = {
            ...initialCalculatedPoints.grades,
            total,
            ...gradesPoints
        };

        if(propagate)
            this.saveCategoryPoints<GradesPoints>('grades', output);

        return output;
    }

    private calcAccomplishmentsPoints(propagate=true): AccomplishmentsPoints{
        if(this.config.accomplishments === null)
            return initialCalculatedPoints.accomplishments;

        let total = 0;
        const accomplishmentsList: AccomplishmentsList = {};
        for(const accomplishment of this.inputData.accomplishments){
            const pointsFromAccomplishment = this.config.accomplishments[accomplishment];
            accomplishmentsList[accomplishment] = pointsFromAccomplishment;
            total += pointsFromAccomplishment;
        }
        const output = {
            total,
            list: accomplishmentsList
        };

        if(propagate)
            this.saveCategoryPoints<AccomplishmentsPoints>('accomplishments', output);

        return output;
    }

    private calcPointsFromBoolean(key: 'merit' | 'activity', propagate=true): number{
        let output = 0;
        if(this.inputData[key])
            output = this.config[key];

        if(propagate)
            this.saveCategoryPoints<number>(key, output);

        return output;
    }

    private saveCategoryPoints<R>(key: string, value: R): void{
        const points = {...this.points};
        const getTotal = (key: string) => points[key].hasOwnProperty('total') ? (points[key] as any).total : points[key];
        points.total = points.total - getTotal(key);
        (points[key] as any) = value;
        points.total += getTotal(key);

        this.savePoints(points);
    }

    private static calcTotalFromAll(points: Omit<CalculatedPoints, 'total'>): number{
        let total = 0;
        for(const value of Object.values(points)){
            total += value.hasOwnProperty('total') ? (value as any).total : value;
        }
        return total;
    }
}
