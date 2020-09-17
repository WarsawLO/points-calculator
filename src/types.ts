export interface Config {
    grades: number[]
    examResult: ExamResult
    merit: number
    activity: number
    accomplishments: Record<Accomplishment, number> | null
}

export interface InputData{
    examResult: ExamResult
    grades: Grades
    merit: boolean
    activity: boolean
    accomplishments: Accomplishment[]
}

export type WatchFunction = (points: CalculatedPoints) => void

export interface ExamResult {
    [polish: string]: number | null
    math: number | null
    lang: number | null
}

export interface ExamResultPoints extends ExamResult {
    [total: string]: number | null
}

export interface Grades {
    polish: number | null
    math: number | null
    firstSubject: number | null
    secondSubject: number | null
}

export interface GradesPoints extends Grades {
    [total: string]: number | null
}

export type Accomplishment = string;

export type AccomplishmentsList = Record<Accomplishment, number>;

export interface AccomplishmentsPoints {
    total: number
    list: AccomplishmentsList
}

export interface CalculatedPoints{
    total: number
    examResult: ExamResultPoints
    grades: GradesPoints
    merit: number
    activity: number
    accomplishments: AccomplishmentsPoints

    [propName: string]: number | ExamResultPoints | GradesPoints | AccomplishmentsPoints;
}
