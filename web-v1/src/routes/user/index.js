import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import withUserLayout from '../../layout/withUserLayout';
import Category from './category.js';
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const NotFound = lazy(() => import('../../container/pages/404'));
const Home = lazy(() => import('../../container/pages/Home'));
const Cart = lazy(() => import('../../container/pages/Cart'));
const Payment = lazy(() => import('./Payment'))
const ProductDetails = lazy(() => import('../../container/ecommerce/product/ProductDetails.js'))
const AddProduct = lazy(() => import('../../container/ecommerce/product/AddProduct.js'))
const EditProduct = lazy(() => import('../../container/ecommerce/product/EditProduct.js'))

const User = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin flex items-center justify-center bg-white dark:bg-dark h-screen w-full fixed z-[999] ltr:left-0 rtl:right-0 top-0">
          <Spin />
        </div>
      }
      className="bg-green-500"
    >
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/category/:category" element={<Category/>} />
        <Route exact path="tour-service/new" element={<AddProduct />} />
        <Route index path="tour-service/:id" element={<ProductDetails />} />
        <Route exact path="edit-tour-service/*" element={<EditProduct />} />
        <Route path="profile/myProfile/*" element={<Myprofile />} />
        <Route path='cart/*' element={<Cart/>}/>
        <Route path='payment/*' element={<Payment/>}/>
        <Route path="chat/*" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withUserLayout(User);
