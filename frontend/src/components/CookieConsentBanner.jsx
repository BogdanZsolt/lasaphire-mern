import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { BsGear } from 'react-icons/bs';

const CookieConsentBanner = () => {
  const { t } = useTranslation('footer');
  const [showConsent, setShowConsent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cookieTypes, setCookieTypes] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  // const inOneMinute = new Date(new Date().getTime() + 1 * 60 * 1000);

  useEffect(() => {
    const consent = Cookies.get('CookieConsent');
    // const preferences = getCookiePreferences();
    if (!consent) {
      setShowConsent(true);
    } else {
      setShowConsent(false);
      setCookieTypes(getCookiePreferences());
    }
  }, []);

  // const allDisabled = Object.values(preferences).every((value) => !value);

  const handleAccept = () => {
    const types = ['necessary', 'analytics', 'marketing'];

    types.map((type) => handleCookieTypeTrue(type));

    handleSavePreferences();
    setShowConsent(false);
  };

  const handleAcceptAll = () => {
    const types = ['analytics', 'marketing'];
    types.map((type) => handleCookieTypeTrue(type));
  };

  const handleRejectAll = () => {
    const types = ['analytics', 'marketing'];
    types.map((type) => handleCookieTypeFalse(type));
  };

  const handleManage = () => {
    setShowModal(true);
    setShowConsent(false);
  };

  const handleCookieTypeChange = (type) => {
    setCookieTypes((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const handleCookieTypeTrue = (type) => {
    if (!cookieTypes[type]) {
      setCookieTypes((prevState) => ({
        ...prevState,
        [type]: !prevState[type],
      }));
    }
  };

  const handleCookieTypeFalse = (type) => {
    if (cookieTypes[type]) {
      setCookieTypes((prevState) => ({
        ...prevState,
        [type]: !prevState[type],
      }));
    }
  };

  const handleSavePreferences = () => {
    // Save the cookie preferences to a cookie
    const preferences = JSON.stringify(cookieTypes);
    Cookies.set('CookieConsent', preferences, { expires: 30 });

    setShowModal(false);
    setShowConsent(false);
  };

  const getCookiePreferences = () => {
    const preferencesStr = Cookies.get('CookieConsent');
    if (preferencesStr) {
      const preferences = JSON.parse(preferencesStr);
      return preferences;
    }
    return null;
  };

  return (
    <>
      {showConsent && (
        <div className="fixed-bottom">
          <div className="container cookie-consent-container glass">
            <h4 className="cookie-consent-title">{t('cookieTitle')}</h4>
            <div className="cookie-consent-description-box">
              <p className="cookie-consent-description">
                {t('cookieDescription')}
              </p>
            </div>
            <div className="mt-4 align-self-md-end d-flex flex-column flex-md-row">
              <Button
                variant="secondary"
                className="py-2 py-md-0"
                onClick={handleManage}
              >
                {t('cookieAdditionalButton')}
              </Button>
              <Button
                variant="success"
                className="btn-lasaphire px-5"
                onClick={handleAccept}
              >
                {t('cookieAcceptButton')}
              </Button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <>
          <Modal
            show={showModal}
            size="lg"
            centered
            // onHide={() => setShowModal(false)}
            backdrop="static"
          >
            <Modal.Header closeButton={false}>
              <Modal.Title id="contained-modal-title-vcenter">
                {t('cookieTitle')}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="cookie-consent-description-box scrolling mb-3">
                <p className="cookie-consent-description">
                  {t('cookieDescription')}
                </p>
              </div>
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                  <div className="ps-switch-title">{t('necessaryCookies')}</div>
                  <input
                    type="checkbox"
                    id="necessary-switch"
                    checked={cookieTypes.necessary}
                    onChange={() => handleCookieTypeChange('necessary')}
                    className="ps-switch"
                    disabled
                  />
                </div>
                <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                  <div className="ps-switch-title">{t('analyticsCookies')}</div>
                  <input
                    type="checkbox"
                    id="analytics-switch"
                    checked={cookieTypes.analytics}
                    onChange={() => handleCookieTypeChange('analytics')}
                    className="ps-switch"
                  />
                </div>
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <div className="ps-switch-title">
                    {t('Marketing Cookies')}
                  </div>
                  <input
                    type="checkbox"
                    id="marketing-switch"
                    checked={cookieTypes.marketing}
                    onChange={() => handleCookieTypeChange('marketing')}
                    className="ps-switch"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <Button variant="secondary" onClick={handleRejectAll}>
                  {t('cookieRejectsAll')}
                </Button>
                <Button variant="secondary" onClick={handleAcceptAll}>
                  {t('cookieAcceptsAll')}
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleSavePreferences}>
                Save preferences
              </Button>
              {/* <Button onClick={() => setShowModal(false)}>Cancel</Button> */}
            </Modal.Footer>
          </Modal>
        </>
      )}
      {!showConsent && (
        <div className="fixed-bottom data-protection">
          <Button
            variant="primary"
            className="d-flex justify-content-center align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <BsGear />
            {t('dataProtection')}
          </Button>
        </div>
      )}
    </>
  );
};

export default CookieConsentBanner;
