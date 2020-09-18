# Validators

## Grade validator
Value must be an integer, less than or equal to 6, and greater than or equal to 1.

```typescript
import { validators } from '@warsawlo/points-calculator';
const { isGradeValid } = validators;

console.log(isGradeValid(4)); // true
console.log(isGradeValid(7)); // false
console.log(isGradeValid(-1)); // false
console.log(isGradeValid(2.5)) // false
console.log(isGradeValid("str")); // false
```

## Exam result validator
Value must be less than or equal to 1, and greater than or equal to 0.
```typescript
import { validators } from '@warsawlo/points-calculator';
const { isExamResultValid } = validators;

console.log(isExamResultValid(.75)); // true
console.log(isExamResultValid(1.2)); // false
console.log(isExamResultValid(5)); // false
console.log(isExamResultValid("str")); // false
```

