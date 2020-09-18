
# Points Calcutator

Package for calculating recruitment points.

## Installation

```bash
yarn add @warsawlo/points-calculator
```

or

```bash
npm i -S @warsawlo/points-calculator
```


We've migrated our docs to [https://oss.warsawlo.pl](https://oss.warsawlo.pl/docs/packages/overview).

### Warning!
There are some key differences between v1 and v2 of the package.
If you don't migrate to the latest version, your code won't work properly.

**Version 1.0.2 is deprecated. Use that version only if you want to support `secondarySchool` mode.**

## Basic usage

```typescript
import { PointsCalculator, configs } from '@warsawlo/points-calculator';
const { config2018_2019 } = configs;

const Calc = new PointsCalculator(config2018_2019);

Calc.setGrades({
	polish: 6,
	math: 4
});

Calc.setExamResult({
	polish: .95
});

console.log(Calc.points);

Calc.watch(points => {});

setTimeout(() => Calc.setMerit(true), 1000);
```

## Docs

* [Configs](https://github.com/WarsawLO/points-calculator/tree/master/docs/configs.md)
* Utils
    * [Validators](https://github.com/WarsawLO/points-calculator/tree/master/docs/validators.md)
    * [Initial data](https://github.com/WarsawLO/points-calculator/tree/master/docs/initial-data.md)
* API Reference
    * [PointsCalculator](https://github.com/WarsawLO/points-calculator/tree/master/docs/api-reference/PointsCalculator.md)
    * [Interfaces & types](https://github.com/WarsawLO/points-calculator/tree/master/docs/api-reference/interfaces.md)
* [Changelog](https://github.com/WarsawLO/points-calculator/tree/master/CHANGELOG.md)
    


