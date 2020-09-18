# Interfaces & types

## `Config`
```typescript
interface Config {
    grades: number[]
    examResult: ExamResult
    merit: number
    activity: number
    accomplishments: Record<Accomplishment, number> | null
}
```

## `InputData`
```typescript
interface InputData {
    examResult: ExamResult
    grades: Grades
    merit: boolean
    activity: boolean
    accomplishments: Accomplishment[]
}
```

## `WatchFunction`
```typescript
type WatchFunction = (points: CalculatedPoints) => void
```

## `Grades`
```typescript
interface Grades {
    polish: number | null
    math: number | null
    firstSubject: number | null
    secondSubject: number | null
}
```

## `GradesPoints`
```typescript
interface GradesPoints extends Grades {
    [total: string]: number | null
}
```

## `ExamResult`
```typescript
interface ExamResult {
    [polish: string]: number | null
    math: number | null
    lang: number | null
}
```

## `ExamResultPoints`
```typescript
interface ExamResultPoints extends ExamResult {
    [total: string]: number | null
}
```

## `Accomplishment`
```typescript
type Accomplishment = string;
```

## `AccomplishmentList`
```typescript
type AccomplishmentsList = Record<Accomplishment, number>
```

## `AccomplishmentsPoints`
```typescript
interface AccomplishmentsPoints {
    total: number
    list: AccomplishmentsList
}
```

## `CalculatedPoints`
```typescript
interface CalculatedPoints {
    total: number
    examResult: ExamResultPoints
    grades: GradesPoints
    merit: number
    activity: number
    accomplishments: AccomplishmentsPoints

    [propName: string]: number | ExamResultPoints | GradesPoints | AccomplishmentsPoints;
}
```
