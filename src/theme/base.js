import { NebulaFighterTheme } from './schemes/NebulaFighterTheme';
import { PureLightTheme } from './schemes/PureLightTheme';

export function themeCreator(theme) {
  return themeMap[theme];
}

const themeMap = {
  NebulaFighterTheme, PureLightTheme
};
