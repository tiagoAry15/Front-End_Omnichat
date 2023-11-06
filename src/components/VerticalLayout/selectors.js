// selectors.js
import { createSelector } from 'reselect';

// This is the base selector that gets the 'Layout' slice of the state.
const selectLayout = state => state.Layout;

// Individual selectors for each property in the 'Layout' state.
export const makeSelectIsPreloader = createSelector(
  [selectLayout],
  layout => layout.isPreloader
);

export const makeSelectLayoutModeType = createSelector(
  [selectLayout],
  layout => layout.layoutModeType
);

export const makeSelectLeftSideBarThemeImage = createSelector(
  [selectLayout],
  layout => layout.leftSideBarThemeImage
);

export const makeSelectLeftSideBarType = createSelector(
  [selectLayout],
  layout => layout.leftSideBarType
);

export const makeSelectLayoutWidth = createSelector(
  [selectLayout],
  layout => layout.layoutWidth
);

export const makeSelectTopbarTheme = createSelector(
  [selectLayout],
  layout => layout.topbarTheme
);

export const makeSelectShowRightSidebar = createSelector(
  [selectLayout],
  layout => layout.showRightSidebar
);

export const makeSelectLeftSideBarTheme = createSelector(
  [selectLayout],
  layout => layout.leftSideBarTheme
);
