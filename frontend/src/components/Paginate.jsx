import { Navigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  pageName = !isAdmin ? 'shop' : 'productlist',
  productCategory,
}) => {
  const createLink = () => {
    let lnk;
    if (!isAdmin) {
      lnk = `/${pageName}`;
      if (keyword !== '') {
        lnk = `/search/${keyword}`;
      }
      if (productCategory !== '' && productCategory !== undefined) {
        lnk = lnk + `/category/${productCategory}`;
      }
    } else {
      lnk = `/admin/${pageName}`;
    }
    return lnk;
  };

  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer key={x + 1} to={createLink() + `/page/${x + 1}`}>
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : (
    <Navigate to={createLink} />
  );
};

export default Paginate;
