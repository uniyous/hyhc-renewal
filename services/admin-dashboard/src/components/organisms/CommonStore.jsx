import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile, setAppInfo, setInitialized } from '../../store/reduxStore/slices/commonSlice';

const CommonStore = ({ wpstate, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // SSO 인증 정보가 wpstate로 전달되면 Redux에 저장
    if (wpstate) {
      if (wpstate.profile) {
        dispatch(setProfile(wpstate.profile));
      }
      
      if (wpstate.appInfo) {
        dispatch(setAppInfo(wpstate.appInfo));
      }

      dispatch(setInitialized(true));
    }
  }, [wpstate, dispatch]);

  return children;
};

export default CommonStore;