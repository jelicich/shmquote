import { BREAKPOINT } from '@angular/flex-layout';

const CUSTOM_BREAKPOINTS = [{
  alias: 'mob',
  suffix: 'Mob',
  mediaQuery: 'only screen and (max-width: 1124px)',
  overlapping: false,
  priority: 1001 // Needed if overriding the default print breakpoint
}];

export const CustomBreakPointsProvider = { 
  provide: BREAKPOINT,
  useValue: CUSTOM_BREAKPOINTS,
  multi: true
};