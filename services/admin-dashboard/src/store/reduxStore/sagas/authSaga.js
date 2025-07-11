import { call, put, takeEvery } from 'redux-saga/effects';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { setLoading } from '../slices/appSlice';
import authService from '../../../services/authService';

function* loginSaga(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(authService.login, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || 'Login failed'));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* authSaga() {
  yield takeEvery(loginStart.type, loginSaga);
}