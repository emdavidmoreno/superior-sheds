import * as migration_20260917_212324 from './20260917_212324';

export const migrations = [
  {
    up: migration_20260917_212324.up,
    down: migration_20260917_212324.down,
    name: '20260917_212324'
  },
];
