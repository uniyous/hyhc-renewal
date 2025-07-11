import { createSelector } from 'reselect';

const selectApp = (state) => state.app;
const selectAuth = (state) => state.auth;

export const selectLoading = createSelector(
  [selectApp],
  (app) => app.loading
);

export const selectError = createSelector(
  [selectApp],
  (app) => app.error
);

export const selectNotifications = createSelector(
  [selectApp],
  (app) => app.notifications
);

export const selectTheme = createSelector(
  [selectApp],
  (app) => app.theme
);

export const selectLanguage = createSelector(
  [selectApp],
  (app) => app.language
);

export const selectSidebarCollapsed = createSelector(
  [selectApp],
  (app) => app.sidebarCollapsed
);

export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectAuthLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading
);

export const selectAuthError = createSelector(
  [selectAuth],
  (auth) => auth.error
);