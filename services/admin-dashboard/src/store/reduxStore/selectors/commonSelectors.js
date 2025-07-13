import { createSelector } from 'reselect';

const selectCommon = (state) => state.common;

export const selectProfile = createSelector(
  [selectCommon],
  (common) => common.profile
);

export const selectAppInfo = createSelector(
  [selectCommon],
  (common) => common.appInfo
);

export const selectIsInitialized = createSelector(
  [selectCommon],
  (common) => common.isInitialized
);

export const selectUserRoles = createSelector(
  [selectProfile],
  (profile) => profile?.roles || []
);

export const selectUserName = createSelector(
  [selectProfile],
  (profile) => profile?.userName || 'Guest'
);

export const selectUserId = createSelector(
  [selectProfile],
  (profile) => profile?.userId || null
);

export const selectHasRole = (role) => createSelector(
  [selectUserRoles],
  (roles) => roles.includes(role)
);

export const selectIsAdmin = createSelector(
  [selectUserRoles],
  (roles) => roles.includes('ADMIN')
);

export const selectIsAppAdmin = createSelector(
  [selectUserRoles],
  (roles) => roles.includes('APP_ADMIN')
);