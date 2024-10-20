import { lazy } from 'react';

export const App = lazy(() => import('./App.jsx'));
export const MainScreen = lazy(() => import('./screens/MainScreen.jsx'));
export const HomeScreen = lazy(() => import('./screens/HomeScreen.jsx'));
export const ProductScreen = lazy(() => import('./screens/ProductScreen.jsx'));
export const LoginScreen = lazy(() => import('./screens/LoginScreen.jsx'));
export const RegisterScreen = lazy(() =>
  import('./screens/RegisterScreen.jsx')
);
export const ResetPasswordRequestScreen = lazy(() =>
  import('./screens/ResetPasswordRequestScreen.jsx')
);
export const ResetPasswordScreen = lazy(() =>
  import('./screens/ResetPasswordScreen.jsx')
);
export const CartScreen = lazy(() => import('./screens/CartScreen.jsx'));
export const WishListScreen = lazy(() =>
  import('./screens/WishListScreen.jsx')
);
export const ShippingScreen = lazy(() =>
  import('./screens/ShippingScreen.jsx')
);
export const PaymentScreen = lazy(() => import('./screens/PaymentScreen.jsx'));
export const HerStory = lazy(() => import('./screens/HerStoryScreen.jsx'));
export const MePetraScreen = lazy(() => import('./screens/MePetraScreen.jsx'));
export const ValuesScreen = lazy(() => import('./screens/ValuesScreen.jsx'));
export const IngredientsScreen = lazy(() =>
  import('./screens/IngredientsScreen.jsx')
);
export const FaqsScreen = lazy(() => import('./screens/FaqsScreen.jsx'));
export const ContactScreen = lazy(() => import('./screens/ContactScreen.jsx'));
export const ShopScreen = lazy(() => import('./screens/ShopScreen.jsx'));
export const BlogScreen = lazy(() => import('./screens/BlogScreen.jsx'));
export const PostScreen = lazy(() => import('./screens/PostScreen.jsx'));
export const AuthorScreen = lazy(() => import('./screens/AuthorScreen.jsx'));
export const CategoryPostScreen = lazy(() =>
  import('./screens/CategoryPostScreen.jsx')
);
export const PrivateRoute = lazy(() => import('./components/PrivateRoute.jsx'));
export const PlaceOrderScreen = lazy(() =>
  import('./screens/PlaceOrderScreen.jsx')
);
export const OrderScreen = lazy(() => import('./screens/OrderScreen.jsx'));
export const PaymentCompleteScreen = lazy(() =>
  import('./screens/PaymentCompleteScreen.jsx')
);
export const ProfileScreen = lazy(() => import('./screens/ProfileScreen.jsx'));
export const AccountVerification = lazy(() =>
  import('./components/AccountVerification.jsx')
);

// Admin Pages
export const AdminScreen = lazy(() =>
  import('./screens/admin/AdminScreen.jsx')
);
export const ProductListScreen = lazy(() =>
  import('./screens/admin/ProductListScreen.jsx')
);
export const ProductEditScreen = lazy(() =>
  import('./screens/admin/ProductEditScreen.jsx')
);
export const ProductCategoryListScreen = lazy(() =>
  import('./screens/admin/ProductCategoryListScreen.jsx')
);
export const ProductCatEditScreen = lazy(() =>
  import('./screens/admin/ProductCatEditScreen.jsx')
);
export const IngredientListScreen = lazy(() =>
  import('./screens/admin/IngredientListScreen.jsx')
);
export const IngredientEditScreen = lazy(() =>
  import('./screens/admin/IngredientEditScreen.jsx')
);
export const IngredientCategoryListScreen = lazy(() =>
  import('./screens/admin/IngredientCategoryListScreen.jsx')
);
export const IngredientCategoryEditScreen = lazy(() =>
  import('./screens/admin/IngredientCategoryEditScreen.jsx')
);
export const PostListScreen = lazy(() =>
  import('./screens/admin/PostListScreen.jsx')
);
export const PostEditScreen = lazy(() =>
  import('./screens/admin/PostEditScreen.jsx')
);
export const PostCategoryListScreen = lazy(() =>
  import('./screens/admin/PostCategoryListScreen.jsx')
);
export const PostCatEditScreen = lazy(() =>
  import('./screens/admin/PostCatEditScreen.jsx')
);
export const CommentListScreen = lazy(() =>
  import('./screens/admin/CommentListScreen.jsx')
);
export const CommentCheckScreen = lazy(() =>
  import('./screens/admin/CommentCheckScreen.jsx')
);
export const FaqListScreen = lazy(() =>
  import('./screens/admin/FaqListScreen.jsx')
);
export const FaqEditScreen = lazy(() =>
  import('./screens/admin/FaqEditScreen.jsx')
);
export const FaqCategoryListScreen = lazy(() =>
  import('./screens/admin/FaqCategoryListScreen.jsx')
);
export const FaqCategoryEditScreen = lazy(() =>
  import('./screens/admin/FaqCategoryEditScreen.jsx')
);
export const UserListScreen = lazy(() =>
  import('./screens/admin/UserListScreen.jsx')
);
export const UserEditScreen = lazy(() =>
  import('./screens/admin/UserEditScreen.jsx')
);
export const OrderListScreen = lazy(() =>
  import('./screens/admin/OrderListScreen.jsx')
);
export const AdminOrderScreen = lazy(() =>
  import('./screens/admin/OrderScreen.jsx')
);
export const MessageListScreen = lazy(() =>
  import('./screens/admin/MessageListScreen.jsx')
);
export const MessageScreen = lazy(() =>
  import('./screens/admin/MessageScreen.jsx')
);
export const SubscriberListScreen = lazy(() =>
  import('./screens/admin/SubscriberListScreen.jsx')
);
export const ProtectRoute = lazy(() => import('./components/ProtectRoute.jsx'));
export const PremiumRoute = lazy(() => import('./components/PremiumRoute.jsx'));
