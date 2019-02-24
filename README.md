
# Points Calcutator

## Installation

 
Install Points Calculator

  

```bash

yarn add @warsawlo/points-calculator

```

or

```bash

npm i -S @warsawlo/points-calculator

```

## Getting started

```javascript

import  PointsCalucator  from  '@warsawlo/points-calculator'

const  Calc = new PointsCalculator()

Calc.setGrades({
	polish:  6,
	math:  4
})
.setExamResult({
	polish:  90
})

console.log(Calc.calc())  // 63.5


Calc.points.subscribe(points => {
    console.log(points) // { examPoints: 0,
                        //   gradesPoints: 63.5,
                        //   otherPoints: 7,
                        //   accomplishmentsPoints: 0,
                        //   all: 70.5 }

})
setTimeout(() => Calc.setMerit(true), 1000)

```


## API Reference

  

### new PointsCalculator(schoolType)

Returns new PointsCalculator instance.

| Param | Type | Default value | Description |
| - | - | - | - |
| schoolType | ``string`` | ``primarySchool`` | Sets calculator mode. For primary school choose ```primarySchool```. For secondary school (gimnazjum) choose ``secondarySchool``.

#### .setGrades(grades)

Returns PointsCalculator instance.

| Param | Type | Description |
| - | - | - |
| grades | ``object`` | Keys for ``grades`` object can be ``polish``, ``math``, ``firstSubject``, ``secondSubject``. Object values are integers.

#### .setExamResult(examResult)

Returns PointsCalculator instance.

| Param | Type | Description |
| - | - | - |
| examResult | ``Object`` | Keys for ``grades`` object can be ``polish``, ``math``, ``lang``, ``science``, ``history``. Object values are integers representing percentage results of described exam parts.

#### .setAchievements(achievements)

Returns PointsCalculator instance.

| Param | Type | Description |
| - | - | - |
| achievements | ``Achievement[]`` | Sets achievements. [See list of available achievements .](#achievements)

#### .setMerit(merit)

Returns PointsCalculator instance.

| Param | Type | Description |
| - | - | - |
| merit | ``Boolean`` | Sets merit from school report card (did student has average higher than 4.75)

#### .setActivity(activity)

Returns PointsCalculator instance.

| Param | Type | Description |
| - | - | - |
| activity | ``Boolean`` | Did student take part in some volunteer work or did something for the community?

#### .calcGradesPoints()

Returns points number derived from grades data.

#### .calcAchievementsPoints()

Returns points number derived from achievements data.

#### .calcExamPoints()

Returns points number derived from exam results data.

#### .calcOtherPoints()

Returns points number derived from merit and activity data.

#### .calc()

Returns points number derived from all provided data.

<a id="achievements"></a>
## Available achievements list (PL only)
| Achievement |
| :-- |
|  Co najmniej podwójny finalista konkursu przedmiotowego |
|  Co najmniej podwójny laureat konkursu tematycznego lub interdyscyplinarnego |
|  Co najmniej podwójny finalista konkursu tematycznego lub interdyscyplinarnego |
|  Finalista konkursu przedmiotowego  |
|  Laureat konkursu tematycznego lub interdyscyplinarnego |
|  Finalista konkursu tematycznego lub interdyscyplinarnego |
|  Finalista konkursu przedmiotowego |
|  Laureat konkursu tematycznego lub interdyscyplinarnego |
|  Finalista konkursu tematycznego lub interdyscyplinarnego |
|  Finalista konkursu z przedmiotu lub przedmiotów artystycznych objętych ramowym planem nauczania szkoły artystycznej |
|  Laureat turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej |
|  Finalista turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej |