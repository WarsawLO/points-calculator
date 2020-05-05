export const isGradeValid = (value: any): boolean => value === null || (Number.isInteger(value) && value > 0 && value <= 6);

export const isExamResultValid = (value: any): boolean => value === null || (!Number.isNaN(value as any) && value >= 0 && value <= 1);
