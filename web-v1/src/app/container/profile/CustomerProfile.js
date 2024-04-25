import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { NavLink, Route, Routes } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import UilDollarSign from '@iconscout/react-unicons/icons/uil-dollar-sign';
import FavoriteProductList from './overview/FavoriteProductList';
import UseFetcher from '../../hooks/useFetcher';
import defaultProfile from '@/app/static/img/default_img/derleng-default-profile.png'
import defaultCover from '@/app/static/img/default_img/default_profile_cover.png'
import EditProfile from './overview/EditProfile';

const UserCards = lazy(() => import('./overview/UserCard'));
const CoverSection = lazy(() => import('./overview/CoverSection'));
const UserBio = lazy(() => import('./overview/UserBio'));
const Overview = lazy(() => import('./overview/Overview'));
const Timeline = lazy(() => import('./overview/Timeline'));
const Activity = lazy(() => import('./overview/Activity'));

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function CustomerProfile() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Explore',
    },
    {
      path: '',
      breadcrumbName: 'My Profile',
    },
  ];
  const path = '.'
  const useFetcher = new UseFetcher();
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    next: null,
    page: 1,
    message: null,
    success: false
  })
  const apiUrl = '/auth/user'

  useEffect(() => {
    useFetcher.retrieve(setState, apiUrl);
  }, [])

  return (
    <>
      <PageHeader
        className="flex flex-wrap items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col sm:justify-center"
        title="My Profile"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24}>
            <Suspense
              fallback={
                <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                  <Skeleton avatar active paragraph={{ rows: 3 }} />
                </div>
              }
            > 
              { state.data &&
              <UserCards
                user={{ name: state.data.fullname, designation: state.data.role.name, img: state.data.profileImage ? `${FILE_ENDPOINT}${state.data.profileImage}` : defaultProfile }}
              />
              }
            </Suspense>
            <div className="mt-[25px]">
              <Suspense
                fallback={
                  <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                  </div>
                }
              >
                { state.data && 
                <UserBio user={{email:state.data.email, phone:state.data.phone}} />
                }
              </Suspense>
            </div>
          </Col>
          {/* <Col xxl={18} lg={16} md={14} xs={24} className="md:order-[-1] md:mb-[25px]"> */}
          <Col xxl={18} lg={16} md={14} xs={24} className=" md:mb-[25px]">
            <>
              <div className="relative z-[1] bg-white dark:bg-white10 rounded-10 mb-[25px]">
                <Suspense
                  fallback={
                    <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                      <Skeleton active />
                    </div>
                  }
                > 
                  { state.data && 
                  <CoverSection img={state.data.coverImage ? `${FILE_ENDPOINT}${state.data.coverImage}` : defaultCover} />
                  }

                  {/* ===========================================> Nav Profile <=========================================== */}
                  {/* <nav className="px-[25px]">
                    <ul className="m-0 flex items-center gap-[22px]">
                      <li>
                        <NavLink
                          className="relative block py-[20px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                          to={`${path}/overview`}
                        >
                          Overview
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="relative block py-[20px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                          to={`${path}/timeline`}
                        >
                          Timeline
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="relative block py-[20px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                          to={`${path}/activity`}
                        >
                          Activity
                        </NavLink>
                      </li>
                    </ul>
                  </nav> */}
                </Suspense>
              </div>

              {/* <div className="p-0 bg-white dark:bg-white10 rounded-10 py-[15px] m-10 flex justify-center gap-[25px]">
                <div className='flex flex-col items-center'>
                  <Button
                    className="group text-[13px] border-normal font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] dark:border-white10 rounded-[6px] flex items-center justify-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary transition duration-300 dark:bg-transparent"
                    size="default"
                  >
                    <UilDollarSign className="w-4 h-4" />
                  </Button>
                  <span className="font-medium text-center"> Favorite </span>
                </div>
                <div className='flex flex-col items-center'>
                  <Button
                    className="group text-[13px] border-normal font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] dark:border-white10 rounded-[6px] flex items-center justify-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary transition duration-300 dark:bg-transparent"
                    size="default"
                  >
                    <UilDollarSign className="w-4 h-4" />
                  </Button>
                  <span className="font-medium text-center"> Billing </span>
                </div>
                <div className='flex flex-col items-center'>
                  <Button
                    className="group text-[13px] border-normal font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] dark:border-white10 rounded-[6px] flex items-center justify-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary transition duration-300 dark:bg-transparent"
                    size="default"
                  >
                    <UilDollarSign className="w-4 h-4" />
                  </Button>
                  <span className="font-medium text-center"> Cart </span>
                </div>
              </div> */}

              <Suspense
                fallback={
                  <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                  </div>
                }
              >
                <Routes>
                  <Route index element={<FavoriteProductList/>}/>
                  <Route path="favorite" element={<FavoriteProductList/>}/>
                  <Route path="setting/*" element={<EditProfile/>}/>
                  <Route path="overview" element={<Overview />} />
                  <Route path="timeline" element={<Timeline />} />
                  <Route path="activity" element={<Activity />} />
                </Routes>
              </Suspense>
            </>
          </Col>
        </Row>
      </main>
    </>
  );
}

CustomerProfile.propTypes = {
  // match: propTypes.object,
};

export default CustomerProfile;
