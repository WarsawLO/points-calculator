# Configs

## About configs
Config is an object with information how many points student get in given year from certain achievements.

Since 2019 until now (2020 recruitment) the way points were calculated didn't change so you can still use `config2018_2019`.
```typescript
import { PointsCalculator, configs } from '@warsawlo/points-calculator';
const { config2018_2019 } = configs;

const Calc = new PointsCalculator(config2018_2019);
```
We shipped configs with our package but if you need to change it or update it below you can find a way to create config on your own.

:::note
Current version of package doesn't include achievements list and corresponding points. 
We will add them in the next release.
For now if you need that feature feel free to extend `config2018_2019` to suit your needs.
:::
## Config template
```typescript
const config: Config = {
    grades: [0, 2, 8, 14, 17, 18],
    examResult: {
        polish: 35,
        math: 35,
        lang: 30
    },
    merit: 7,
    activity: 3,
    accomplishments: {}
};
```
### `grades`
Its array of 6 elements. First element is how many points you get for 1 grade, 2nd - points for 2 grade and so on...

### `examResult`
Multipliers. For example `<score> * 35 = <points no>`

### `merit` & `activity`
Points student get for merit and activity.

### `accomplishments`
Points student get for winning competitions.

```typescript
    accomplishments: {
        'WINNER OF X COMPETITION': 5
    }
```


