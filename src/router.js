import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Login
const Login = Loader(lazy(() => import('src/content/pages/Login/SignIn')));
const SignUp = Loader(lazy(() => import('src/content/pages/Login/SignUp')));

// Hydroponics
const HydroOverview = Loader(lazy(() => import('src/content/overview')));
// const HydroAutomation = Loader(lazy(() => import('src/content/firmware_manager')));
const ZoneOverview = Loader( lazy(() => import('src/content/app/my_devices/Zones')) );
const Dashboards = Loader( lazy(() => import('src/content/app/my_dashboards/Dashboards')) );
const HydroAnalytics = Loader(lazy(() => import('src/content/app/my_devices')));
const DashboardSettings = Loader(lazy(() => import('src/content/app/my_dashboards')));
const HydroCalendar = Loader(lazy(() => import('src/content/Calendar')));
// const HydroPlants = Loader(lazy(() => import('src/content/app/Recipe')));
const HydroBlog = Loader(lazy(() => import('src/content/blogs')));
const Docs = Loader(lazy(() => import('src/content/docs')));

// Status
const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));

const routes = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'overview',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'App',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        // element: <HydroOverview />
        element: (
          <Navigate
            to="/app/overview"
            replace
          />
        )
      },
      {
        path: 'overview',
        element: <HydroOverview />
      },
      // {
      //   path: 'storage',
      //   element: <HydroAutomation />
      // },
      {
        path: 'devices',
        element: <ZoneOverview />
      },
      {
        path: 'dashboards',
        element: <Dashboards />
      },
      {
        path: 'devices/:zoneId',
        element: <HydroAnalytics />
      },
      {
        path: 'dashboards/:zoneId',
        element: <DashboardSettings />
      },
      {
        path: 'calendar',
        element: <HydroCalendar />
      },
      // {
      //   path: 'plants',
      //   element: <HydroPlants />
      // },
      {
        path: 'blogs',
        // element: https://marutimuthu.gitbook.io/4gw-series-docs/
        element: <HydroBlog />
      },
      {
        path: 'docs',
        element: <Docs />
      }
    ]
  },
  // {
  //   path: 'user',
  //   element: (
  //     <SidebarLayout />
  //   ),
  //   children: [
  //     {
  //       path: '/',
  //       element: (
  //         <Navigate
  //           to="/user/profile"
  //           replace
  //         />
  //       )
  //     },
  //     {
  //       path: 'profile',
  //       element: <Profile />
  //     },
  //     {
  //       path: 'settings',
  //       element: <Settings />
  //     }
  //   ]
  
  // }
];

export default routes;
