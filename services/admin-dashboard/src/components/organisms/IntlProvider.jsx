import React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/reduxStore/selectors';
import { messages } from '../../language';

const IntlProvider = ({ children }) => {
  const locale = useSelector(selectLanguage);
  
  return (
    <ReactIntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale="ko"
    >
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;