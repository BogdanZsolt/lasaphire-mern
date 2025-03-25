import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';

const CommnentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = '',
}) => {
  const { t } = useTranslation('comment');

  const [comment, setComment] = useState(initialText);

  const submitHandler = async (e) => {
    e.preventDefault();
    formSubmitHandler(comment);
    setComment('');
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="comment" className="my-2">
        <Form.Label as="h4">{t('comment')}</Form.Label>
        <Form.Control
          as="textarea"
          row="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={`${t('leaveComment')}...`}
          className="mb-2 bg-transparent"
        ></Form.Control>
        <div className="d-flex align-items-center gap-2">
          {formCancelHandler && (
            <Button onClick={formCancelHandler} type="button" variant="primary">
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary">
            {btnLabel}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default CommnentForm;
