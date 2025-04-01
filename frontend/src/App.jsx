// https://youtu.be/dltHi9GWMIo?si=5dEcZZagXPhZKsra
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AdminScreen,
  AuthorScreen,
  IngredientsScreen,
  BlogScreen,
  CartScreen,
  CategoryPostScreen,
  CommentCheckScreen,
  CommentListScreen,
  ContactScreen,
  FaqsScreen,
  HerStory,
  HomeScreen,
  LoginScreen,
  ResetPasswordRequestScreen,
  ResetPasswordScreen,
  MainScreen,
  MePetraScreen,
  OrderListScreen,
  OrderScreen,
  MessageListScreen,
  MessageScreen,
  PaymentCompleteScreen,
  PaymentScreen,
  PlaceOrderScreen,
  PostCatEditScreen,
  PostCategoryListScreen,
  PostEditScreen,
  PostListScreen,
  PostScreen,
  HomePageSetup,
  HeroEditScreen,
  ProductCatEditScreen,
  ProductCategoryListScreen,
  ProductEditScreen,
  ProductListScreen,
  ProductScreen,
  IngredientListScreen,
  IngredientEditScreen,
  IngredientCategoryListScreen,
  IngredientCategoryEditScreen,
  ProfileScreen,
  AccountVerification,
  ProtectRoute,
  RegisterScreen,
  BillingScreen,
  ShippingScreen,
  ShopScreen,
  SubscriberListScreen,
  UserEditScreen,
  UserListScreen,
  MembershipPlanListScreen,
  MembershipPlanEditScreen,
  ValuesScreen,
  WishListScreen,
  AdminOrderScreen,
  FaqListScreen,
  FaqEditScreen,
  FaqCategoryListScreen,
  FaqCategoryEditScreen,
  PremiumRoute,
  NinetyDaysProgramScreen,
  YoutubeChannelScreen,
  HolisticScreen,
  SophiaCircleScreen,
  NaturalBeautyScreen,
  PrivacyScreen,
  SccScreen,
  ShippingGuaranteeScreen,
  OrderPaymentScreen,
} from './Pages';
import Root from './components/Root';
import Loader from './components/Loader';
import Message from './components/Message';
import { useCheckAuthStatusQuery } from './slices/usersApiSlice';
import { isAuthenticated } from './slices/authSlice';

const App = () => {
  let router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <MainScreen />,
          children: [
            {
              path: '',
              element: <HomeScreen />,
            },
            {
              path: 'herstory',
              element: <HerStory />,
            },
            {
              path: 'mepetra',
              element: <MePetraScreen />,
            },
            {
              path: 'ingredients',
              element: <IngredientsScreen />,
            },
            {
              path: 'values',
              element: <ValuesScreen />,
            },
            {
              path: 'faqs',
              element: <FaqsScreen />,
            },
            {
              path: '90daysprogram',
              element: <NinetyDaysProgramScreen />,
            },
            {
              path: '90daysprogram',
              element: <NinetyDaysProgramScreen />,
            },
            {
              path: 'youtubechannel',
              element: <YoutubeChannelScreen />,
            },
            {
              path: 'holistic',
              element: <HolisticScreen />,
            },
            {
              path: 'naturalbeauty',
              element: <NaturalBeautyScreen />,
            },
            {
              path: 'shop',
              element: <ShopScreen />,
              children: [
                {
                  path: 'search/:keyword',
                  element: <ShopScreen />,
                },
                {
                  path: 'page/:pageNumber',
                  element: <ShopScreen />,
                },
                {
                  path: 'search/:keyword/page/:pageNumber',
                  element: <ShopScreen />,
                },
                {
                  path: 'category/:productCategory',
                  element: <ShopScreen />,
                },
                {
                  path: 'category/:productCategory/page/:pageNumber',
                  element: <ShopScreen />,
                },
              ],
            },
            {
              path: 'product/:id',
              element: <ProductScreen />,
            },
            {
              path: 'sophiecircle',
              element: <SophiaCircleScreen />,
            },
            {
              path: 'sophiecircle/:id',
              element: <SophiaCircleScreen />,
            },
            {
              path: 'blog',
              element: <BlogScreen />,
              children: [
                {
                  path: 'search/:keyword',
                  element: <BlogScreen />,
                },
                {
                  path: 'page/:pageNumber',
                  element: <BlogScreen />,
                },
                {
                  path: 'search/:keyword/page/:pageNumber',
                  element: <BlogScreen />,
                },
              ],
            },
            {
              path: 'post/:id',
              element: <PostScreen />,
            },
            {
              path: 'author/:id',
              element: <AuthorScreen />,
            },
            {
              path: 'category/:id',
              element: <CategoryPostScreen />,
            },
            {
              path: 'contact',
              element: <ContactScreen />,
            },
            {
              path: 'login',
              element: <LoginScreen />,
            },
            {
              path: 'register',
              element: <RegisterScreen />,
            },
            {
              path: 'forgot-password',
              element: <ResetPasswordRequestScreen />,
            },
            {
              path: 'reset-password/:token',
              element: <ResetPasswordScreen />,
            },
            {
              path: 'privacy',
              element: <PrivacyScreen />,
            },
            {
              path: 'scc',
              element: <SccScreen />,
            },
            {
              path: 'shipping&garantee',
              element: <ShippingGuaranteeScreen />,
            },
            {
              path: 'order&payment',
              element: <OrderPaymentScreen />,
            },
            {
              path: '',
              element: <ProtectRoute />,
              children: [
                {
                  path: 'cart',
                  element: <CartScreen />,
                },
                {
                  path: 'profile',
                  element: <ProfileScreen />,
                },
                {
                  path: 'account-verification/:verifyToken',
                  element: <AccountVerification />,
                },
                {
                  path: 'billing',
                  element: <BillingScreen />,
                },
                {
                  path: 'shipping',
                  element: <ShippingScreen />,
                },
                {
                  path: 'payment',
                  element: <PaymentScreen />,
                },
                {
                  path: 'placeorder',
                  element: <PlaceOrderScreen />,
                },
                {
                  path: 'order/:id',
                  element: <OrderScreen />,
                },
                {
                  path: 'order/complete',
                  element: <PaymentCompleteScreen />,
                },
                {
                  path: 'wishlist',
                  element: <WishListScreen />,
                },
                {
                  path: '',
                  element: <PremiumRoute />,
                },
              ],
            },
          ],
        },
        {
          path: 'admin',
          element: <AdminScreen />,
          children: [
            {
              path: 'homepagesetup',
              element: <HomePageSetup />,
            },
            {
              path: '',
              element: <HomePageSetup />,
            },
            {
              path: 'hero/:id/edit',
              element: <HeroEditScreen />,
            },
            {
              path: 'productlist',
              element: <ProductListScreen />,
            },
            {
              path: 'productlist/page/:pageNumber',
              element: <ProductListScreen />,
            },
            {
              path: 'product/:id/edit',
              element: <ProductEditScreen />,
            },
            {
              path: 'productcategorylist',
              element: <ProductCategoryListScreen />,
            },
            {
              path: 'productcategory/:id/edit',
              element: <ProductCatEditScreen />,
            },
            {
              path: 'ingredientlist',
              element: <IngredientListScreen />,
            },
            {
              path: 'ingredientlist/page/:pagenumber',
              element: <IngredientListScreen />,
            },
            {
              path: 'ingredient/:id/edit',
              element: <IngredientEditScreen />,
            },
            {
              path: 'ingredientcategorylist',
              element: <IngredientCategoryListScreen />,
            },
            {
              path: 'ingredientcategorylist/page/:pagenumber',
              element: <IngredientCategoryListScreen />,
            },
            {
              path: 'ingredientcategory/:id/edit',
              element: <IngredientCategoryEditScreen />,
            },
            {
              path: 'postlist',
              element: <PostListScreen />,
            },
            {
              path: 'post/:id/edit',
              element: <PostEditScreen />,
            },
            {
              path: 'postcategorylist',
              element: <PostCategoryListScreen />,
            },
            {
              path: 'postcategory/:id/edit',
              element: <PostCatEditScreen />,
            },
            {
              path: 'commentlist',
              element: <CommentListScreen />,
            },
            {
              path: 'comment/:id',
              element: <CommentCheckScreen />,
            },
            {
              path: 'faqlist',
              element: <FaqListScreen />,
            },
            {
              path: 'faq/:id/edit',
              element: <FaqEditScreen />,
            },
            {
              path: 'faqcategorylist',
              element: <FaqCategoryListScreen />,
            },
            {
              path: 'faqcategory/:id/edit',
              element: <FaqCategoryEditScreen />,
            },
            {
              path: 'userlist',
              element: <UserListScreen />,
            },
            {
              path: 'user/:id/edit',
              element: <UserEditScreen />,
            },
            {
              path: 'membershipplan',
              element: <MembershipPlanListScreen />,
            },
            {
              path: 'membershipplan/:id/edit',
              element: <MembershipPlanEditScreen />,
            },
            {
              path: 'orderlist',
              element: <OrderListScreen />,
            },
            {
              path: 'orderlist/page/:pageNumber',
              element: <OrderListScreen />,
            },
            {
              path: 'order/:id',
              element: <AdminOrderScreen />,
            },
            {
              path: 'messagelist',
              element: <MessageListScreen />,
            },
            {
              path: 'messagelist/page/:pageNumber',
              element: <MessageListScreen />,
            },
            {
              path: 'message/:id',
              element: <MessageScreen />,
            },
            {
              path: 'subscriberlist',
              element: <SubscriberListScreen />,
            },
          ],
        },
      ],
    },
  ]);

  const { data, isLoading, error } = useCheckAuthStatusQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(isAuthenticated(data));
    }
  }, [data, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <RouterProvider router={router} />
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default App;
