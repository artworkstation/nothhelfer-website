import * as migration_20261121_162614_initial from './20261121_162614_initial';
import * as migration_20261121_164257_einstellungen_portrait from './20261121_164257_einstellungen_portrait';

export const migrations = [
  {
    up: migration_20261121_162614_initial.up,
    down: migration_20261121_162614_initial.down,
    name: '20261121_162614_initial',
  },
  {
    up: migration_20261121_164257_einstellungen_portrait.up,
    down: migration_20261121_164257_einstellungen_portrait.down,
    name: '20261121_164257_einstellungen_portrait'
  },
];
