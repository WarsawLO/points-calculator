# PointsCalculator - reference

## `new PointsCalculator(config)`

Returns new PointsCalculator instance.

| Param | Type | Required | Description |
| - | - | :-: | - |
| config | [`Config`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#config) | :heavy_check_mark: | Sets calculator mode. For primary school choose ```primarySchool```. For secondary school (gimnazjum) choose ``secondarySchool``.

### Methods

#### `.setGrades(grades)`

| Param | Type | Description |
| - | - | - |
| grades | [`Partial<Grades>`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#grades) | Values must be integers, less than or equal to 6, and greater than or equal to 1. (See [grade validator](/docs/packages/@warsawlo__points-calculator/api-reference/validators#grade-validator))

#### `.setExamResult(examResult)`

| Param | Type | Description |
| - | - | - |
| examResult | [`Partial<ExamResult>`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#examresult) | Values must be less than or equal to 1, and greater than or equal to 0. (See [exam result validator](/docs/packages/@warsawlo__points-calculator/api-reference/validators#exam-result-validator))

#### `.setAccomplishments(accomplishments)`

| Param | Type | Description |
| - | - | :-: | - |
| accomplishments | [`Accomplishment[] or Accomplishment`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#accomplishment) | Values must be integers, less than or equal to 6, and greater than or equal to 1. (See [grade validator](/docs/packages/@warsawlo__points-calculator/api-reference/validators#gradeValidator))

#### `.setMerit(merit)`

| Param | Type | Description |
| - | - | - |
| merit | ``Boolean`` | Sets merit from school report card (did student has average higher than 4.75)

#### `.setActivity(activity)`

| Param | Type | Description |
| - | - | - |
| activity | ``Boolean`` | Did student take part in some volunteer work or did something for the community?

#### `.setData(data)`

| Param | Type | Description |
| - | - | - |
| data | [`InputData`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#InputData) | Object that overwrites all data provided before.


#### `.watch()`

Returns [`Observable<CalculatedPoints>`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#CalculatedPoints)

### Properties

#### `.points`

[`CalculatedPoints`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#CalculatedPoints) object with values derived from all provided data.

#### `.data`

Currently used [`InputData`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#InputData)

#### `.config`

Currently used [`Config`](/docs/packages/@warsawlo__points-calculator/api-reference/interfaces#Config). This is `readonly` property.
