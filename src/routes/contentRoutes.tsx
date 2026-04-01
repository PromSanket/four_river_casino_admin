import React, { lazy } from 'react';
import { dashboardPagesMenu, demoPagesMenu, pageLayoutTypesPagesMenu } from '../menu';
import Login from '../pages/presentation/auth/Login';
import WithdrawalManagementPage from '../pages/presentation/withdrawal/WithdrawalManagementPage';
import PlayerManagement from '../pages/presentation/playerManagement/playerManagement';
import AffiliateManagement from '../pages/presentation/affilateManagement/affilateManagement';
import SettingsPage from '../pages/presentation/setting/setting';
import TelegramBot from '../pages/presentation/telegram/telegramBot';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};
const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
const PAGE_LAYOUTS = {
	HEADER_SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/HeaderAndSubheader')),
	HEADER: lazy(() => import('../pages/presentation/page-layouts/OnlyHeader')),
	SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/OnlySubheader')),
	CONTENT: lazy(() => import('../pages/presentation/page-layouts/OnlyContent')),
	BLANK: lazy(() => import('../pages/presentation/page-layouts/Blank')),
	ASIDE: lazy(() => import('../pages/presentation/aside-types/DefaultAsidePage')),
	MINIMIZE_ASIDE: lazy(() => import('../pages/presentation/aside-types/MinimizeAsidePage')),
};

const presentation = [
	/**
	 * Auth - Default Landing Page
	 */
	{
		path: '/',
		element: <Login />,
	},
	/**
	 * Dashboard
	 */
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <ProtectedRoute><LANDING.DASHBOARD /></ProtectedRoute>,
	},
	{
		path: '/withdrawal-management',
		element: <ProtectedRoute><WithdrawalManagementPage /></ProtectedRoute>,
	},
	{
		path:'/player-management',
		element:<ProtectedRoute><PlayerManagement /></ProtectedRoute>
	},
	{
		path:'/affilate-management',
		element:<ProtectedRoute><AffiliateManagement /></ProtectedRoute>
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/sign-up',
		element: <Login />,
	},
	{
		path:'/setting',
		element:<ProtectedRoute><SettingsPage /></ProtectedRoute>
	},
	{
		path:'/telegram-bot',
		element:<ProtectedRoute><TelegramBot /></ProtectedRoute>
	}
	// {
	// 	path: demoPagesMenu.page404.path,
	// 	element: <AUTH.PAGE_404 />,
	// },
	// {
	// 	path: demoPagesMenu.login.path,
	// 	element: <Login />,
	// },
	// {
	// 	path: demoPagesMenu.signUp.path,
	// 	element: <Login isSignUp />,
	// },

	// /** ************************************************** */

	// /**
	//  * 
	//  */
	// {
	// 	path: pageLayoutTypesPagesMenu.blank.path,
	// 	element: <PAGE_LAYOUTS.BLANK />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.pageLayout.subMenu.headerAndSubheader.path,
	// 	element: <PAGE_LAYOUTS.HEADER_SUBHEADER />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyHeader.path,
	// 	element: <PAGE_LAYOUTS.HEADER />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlySubheader.path,
	// 	element: <PAGE_LAYOUTS.SUBHEADER />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyContent.path,
	// 	element: <PAGE_LAYOUTS.CONTENT />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.asideTypes.subMenu.defaultAside.path,
	// 	element: <PAGE_LAYOUTS.ASIDE />,
	// },
	// {
	// 	path: pageLayoutTypesPagesMenu.asideTypes.subMenu.minimizeAside.path,
	// 	element: <PAGE_LAYOUTS.MINIMIZE_ASIDE />,
	// },
];
const contents = [...presentation];

const menu = {
  ...dashboardPagesMenu,
  ...demoPagesMenu,
  ...pageLayoutTypesPagesMenu
}

export default contents;
