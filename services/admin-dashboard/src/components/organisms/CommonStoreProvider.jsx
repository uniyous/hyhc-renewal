import React, { useState, useEffect } from 'react';
import CommonStore from './CommonStore';

const CommonStoreProvider = ({ children }) => {
  const [wpstate, setWpstate] = useState(null);

  useEffect(() => {
    // 실제 환경에서는 SSO 시스템에서 wpstate를 받아옴
    // 개발 환경에서는 window.wpstate 또는 다른 방식으로 전달받을 수 있음
    if (window.wpstate) {
      setWpstate(window.wpstate);
    }

    // SSO 이벤트 리스너 (예시)
    const handleSSOUpdate = (event) => {
      if (event.detail && event.detail.wpstate) {
        setWpstate(event.detail.wpstate);
      }
    };

    window.addEventListener('sso-update', handleSSOUpdate);

    return () => {
      window.removeEventListener('sso-update', handleSSOUpdate);
    };
  }, []);

  return (
    <CommonStore wpstate={wpstate}>
      {children}
    </CommonStore>
  );
};

export default CommonStoreProvider;