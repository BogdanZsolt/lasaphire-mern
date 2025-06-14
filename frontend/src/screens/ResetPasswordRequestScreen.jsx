import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
// import ReCAPTCHA from 'react-google-recaptcha';
import { usePasswordResetRequestMutation } from '../slices/usersApiSlice';
import PantherCaptcha from '../components/PantherCaptcha';

const ResetPasswordRequestScreen = () => {
  const { t } = useTranslation(['login']);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false);
  // const [capVal, setCapVal] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300); // delay for the fade-in effect
    return () => clearTimeout(timeout);
  }, []);

  const [PasswordResetRequest, { isLoading, isSuccess }] =
    usePasswordResetRequestMutation();

  const passRequestHandler = async (e) => {
    e.preventDefault();
    try {
      await PasswordResetRequest({ email }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <Banner
        title={t('passwordResetRequest')}
        src="/uploads/image-1724508536083.jpg"
      />
      <Container>
        {isVisible && (
          <div className="password-reset-req">
            <div className="title-info">
              <div className="title-box">
                <div className="title-wrap pt-5 shadow">
                  {!isSuccess ? (
                    <Form onSubmit={passRequestHandler} className="text-center">
                      <Form.Group controlId="email" className="my-3">
                        <Form.Label>{t('emailAddress')}</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder={t('enterEmail')}
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <PantherCaptcha setIsCaptcha={setIsCaptcha} />
                      {/* <div className="d-flex justify-content-center">
                        <ReCAPTCHA
                          hl={i18n.language}
                          onChange={(val) => setCapVal(val)}
                          sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA}
                        />
                      </div> */}
                      <Button
                        type="submit"
                        variant="primary"
                        className="mt-3 "
                        disabled={!isCaptcha}
                      >
                        {t('send')}
                      </Button>
                      {isLoading && <Loader />}
                    </Form>
                  ) : (
                    <>
                      <div className="d-flex align-items-stretch">
                        <FaCheckCircle className="fs-2 me-1 pt-0 text-success-emphasis" />
                        <h3>{t('emailSendingIsSuccessful')}</h3>
                      </div>
                      <div className="fs-5">{t('passwordResetEmail')}</div>
                      <Button
                        type="button"
                        variant="primary"
                        className="mt-2"
                        onClick={() => {
                          navigate('/');
                        }}
                      >
                        {t('goingOn')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default ResetPasswordRequestScreen;
