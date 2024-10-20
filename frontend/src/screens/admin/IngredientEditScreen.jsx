import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import FormContainer from '../../components/FormContainer';
import LangSelectInput from '../../components/LangSelectInput';
import LangSelectEditor from '../../components/LangSelectEditor.jsx';
import ImageList from '../../components/ImageList';
import {
  useGetIngredientDetailsQuery,
  useUpdateIngredientMutation,
} from '../../slices/ingredientsApiSlice.js';
import { toast } from 'react-toastify';

const IngredientEditScreen = () => {
  const { id: ingredientId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  // const [category, setCategory] = useState(null);
  const [transNameHu, setTransNameHu] = useState('');
  const [transDescriptionHu, setTransDescriptionHu] = useState('');

  const {
    data: ingredient,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetIngredientDetailsQuery(ingredientId);

  const [
    updateIngradient,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateIngredientMutation();

  useEffect(() => {
    if (ingredient) {
      setName(ingredient.name);
      setDescription(ingredient.description);
      setThumbnail(ingredient.thumbnail);
      // setCategory(ingredient?.category?._id);
      setTransNameHu(ingredient?.translations?.hu?.name);
      setTransDescriptionHu(ingredient?.translations?.hu?.description);
    }
  }, [ingredient]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateIngradient({
        ingredientId,
        name,
        thumbnail,
        description,
        translations: {
          hu: {
            name: transNameHu,
            description: transDescriptionHu,
          },
        },
      }).unwrap();
      toast.success('Ingredient updated');
      refetch();
      navigate('/admin/ingredientlist');
    } catch (err) {
      toast.error(err?.data?.Message || err.error);
    }
  };

  console.log(ingredient);

  return (
    <>
      {isLoadingUpdate ? (
        <Loader />
      ) : (
        isErrorUpdate && toast.error(errorUpdate?.data?.message)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error?.data?.Message}</Message>
      ) : (
        <Container className="mt-3">
          <Link to="/admin/ingredientlist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center fs-1 fw-bold">Edit ingredient</h2>
          </Row>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <LangSelectInput
                label="Name"
                defLang={name}
                setDefLang={setName}
                secLang={transNameHu}
                setSecLang={setTransNameHu}
              />
              <ImageList images={thumbnail} setImages={setThumbnail} />

              {/* Select category */}

              <LangSelectEditor
                label="Description"
                placeholder="Enter description"
                placeholder_hu="Add meg a leírást"
                defLang={description}
                setDefLang={setDescription}
                secLang={transDescriptionHu}
                setSecLang={setTransDescriptionHu}
              />
              <Button type="submit" variant="primary" className="mt-2 mb-4">
                Update
              </Button>
            </Form>
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default IngredientEditScreen;
