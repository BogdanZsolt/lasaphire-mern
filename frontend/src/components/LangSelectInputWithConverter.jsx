import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { MdContentCopy } from 'react-icons/md';
import { useConvertCurrencyMutation } from '../slices/convertsApiSlice';

const LangSelectInputWithConverter = ({
  label = '',
  placeholder = 'Enter the amount',
  placeholder_hu = 'Ada meg az összeget',
  defLang,
  setDefLang,
  secLang,
  setSecLang,
  className,
}) => {
  const [lang, setLang] = useState('en');
  const [converted, setConverted] = useState(0);

  const onChangeHandle = (val) => {
    lang === 'en' ? setDefLang(val) : setSecLang(val);
  };

  const [convertCurrency, { isLoading, isError, error }] =
    useConvertCurrencyMutation();

  const handleConvert = async () => {
    const isConv = lang === 'en' ? defLang > 0 : secLang > 0;
    if (isConv) {
      try {
        const res = await convertCurrency({
          from: lang === 'en' ? 'EUR' : 'HUF',
          to: lang === 'en' ? 'HUF' : 'EUR',
          amount: lang === 'en' ? defLang : secLang,
        });
        if (res && res.data.convertedAmount) {
          setConverted(res.data.convertedAmount);
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.warn('Enter the amount');
    }
  };

  const handleAmountCopy = () => {
    if (converted > 0) {
      lang === 'en' ? setSecLang(converted) : setDefLang(converted);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        isError && toast.error(error?.data?.message || error?.error)
      )}
      <Form.Group className={className}>
        <Form.Label>{label}</Form.Label>
        <Row>
          <Col md={6} lg={7}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder={lang === 'en' ? placeholder : placeholder_hu}
                value={lang === 'en' ? defLang : secLang}
                onChange={(e) => onChangeHandle(e.target.value)}
              ></Form.Control>
              <Form.Select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="col-md-4"
              >
                <option value="en">en</option>
                <option value="hu">hu</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col md={6} lg={5}>
            <InputGroup>
              <Button
                variant="outline-secondary"
                id="convert-button"
                onClick={() => handleConvert()}
              >
                Convert
              </Button>
              <Form.Control
                readOnly
                value={converted}
                aria-label="Example text with button addon"
                aria-describedby="convert-input"
              />
              <Button
                variant="outline-secondary"
                id="copy-button"
                onClick={handleAmountCopy}
              >
                <MdContentCopy />
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default LangSelectInputWithConverter;
