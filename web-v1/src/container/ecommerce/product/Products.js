import React, { lazy, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, Spin } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import UilApps from '@iconscout/react-unicons/icons/uil-apps';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import { PageHeader } from '../../../components/page-headers/page-headers';

// ==============================> Local <==============================
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { sorting } from '../../../redux/product/actionCreator';
import usePackageFetcher from '../../../hooks/Product/usePackageFetcher';

const Grid = lazy(() => import('./overview/Grid'));
const List = lazy(() => import('./overview/List'));
const NotFound = lazy(() => import('../../pages/404'));

function Product() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Home',
    },
    {
      path: '',
      breadcrumbName: 'Tour Service',
    },
  ];
  const path = '.';
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.headerSearchData);
  const packageFetcher = usePackageFetcher()

  const [state, setState] = useState({
    notData: searchData,
    active: 'active',
  });

  const { notData } = state;

  // ============================> Set param view <===============================
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const view = params.get('view') || 'grid';

  const handleSearch = (searchText) => {
    const data = searchData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = (e) => {
    dispatch(sorting(e.target.value));
  };

  const [activeSort, setActiveSort] = useState('top-rated');
  const [activeView, setActiveView] = useState('grid');

  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Shop"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <div className="items-center flex flex-wrap justify-between 3xl:justify-center mb-[30px] gap-y-[15px]">
          <div className="flex items-center flex-wrap gap-[25px] min-3xl:[&>div>div>span>span]:w-[360px] [&>div>div>span>.ant-input-affix-wrapper]:!border-none [&>div>div>span>.ant-input-affix-wrapper>input]:focus:!border-none [&>div>div]:!h-[48px] [&>div]:!w-auto [&>div]:!border-none 3xl:justify-center">
            <AutoComplete onSearch={handleSearch} dataSource={notData} placeholder="Search" patterns />
            <p className="mb-0 text-body dark:text-white60">Showing 1–8 of 86 results</p>
          </div>
          <div className="flex items-center flex-wrap gap-[25px] 3xl:justify-center">
            <div className="text-body dark:text-white60 flex flex-wrap items-center gap-[20px] 3xl:justify-center">
              <span>Sort by:</span>
              <Radio.Group
                onChange={onSorting}
                defaultValue="rate"
                className="bg-white dark:bg-[#1b1d2a] px-[10px] 4xl:px-0 border-transparent dark:border-1 dark:border-white10 rounded-4"
              >
                <Radio.Button
                  value="rate"
                  onClick={() => {
                    setActiveSort('top-rated');
                  }}
                  className={`bg-transparent h-10 leading-[42px] px-3 border-none shadow-none before:bg-section dark:before:bg-white10 before:h-1/2 before:top-1/2 before:-translate-y-1/2 ${activeSort === 'top-rated'
                      ? 'text-primary dark:text-white87'
                      : 'text-light-extra dark:text-white60'
                    }`}
                >
                  Top Rated
                </Radio.Button>
                <Radio.Button
                  value="popular"
                  onClick={() => {
                    setActiveSort('popular');
                  }}
                  className={`bg-transparent h-10 leading-[42px] px-3 border-none shadow-none before:bg-section dark:before:bg-white10 before:h-1/2 before:top-1/2 before:-translate-y-1/2 ${activeSort === 'popular'
                      ? 'text-primary dark:text-white87'
                      : 'text-light-extra dark:text-white60'
                    }`}
                >
                  Popular
                </Radio.Button>
                <Radio.Button
                  value="time"
                  onClick={() => {
                    setActiveSort('newest');
                  }}
                  className={`bg-transparent h-10 leading-[42px] px-3 border-none shadow-none before:bg-section dark:before:bg-white10 before:h-1/2 before:top-1/2 before:-translate-y-1/2 ${activeSort === 'newest'
                      ? 'text-primary dark:text-white87'
                      : 'text-light-extra dark:text-white60'
                    }`}
                >
                  Newest
                </Radio.Button>
                <Radio.Button
                  value="price"
                  onClick={() => {
                    setActiveSort('price');
                  }}
                  className={`bg-transparent h-10 leading-[42px] px-3 border-none shadow-none before:bg-section dark:before:bg-white10 before:h-1/2 before:top-1/2 before:-translate-y-1/2 ${activeSort === 'price' ? 'text-primary dark:text-white87' : 'text-light-extra dark:text-white60'
                    }`}
                >
                  Price
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className="flex items-center">
              <NavLink
                to={`${path}/?view=grid`}
                onClick={() => {
                  setActiveView('grid');
                }}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${activeView === 'grid'
                    ? 'bg-white dark:bg-white10 text-primary dark:text-white87'
                    : 'bg-transparent text-light dark:text-white60'
                  }`}
              >
                <UilApps className="w-4 h-4" />
              </NavLink>
              <NavLink
                to={`${path}/?view=list`}
                onClick={() => {
                  setActiveView('list');
                }}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${activeView === 'list'
                    ? 'bg-white dark:bg-white10 text-primary dark:text-white87'
                    : 'bg-transparent text-light dark:text-white60'
                  }`}
              >
                <UilListUl className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
              <Spin />
            </div>
          }
        >
          {view === 'grid' ? <Grid state={packageFetcher} /> : <List state={packageFetcher} />}
        </Suspense>
      </main>
    </>
  );
}

export default Product;
