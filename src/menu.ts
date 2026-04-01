export const summaryPageTopMenu = {
	intro: { id: 'intro', text: 'Intro', path: '#intro', icon: 'Vrpano', subMenu: null },
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap Components',
		path: '#bootstrap',
		icon: 'BootstrapFill',
		subMenu: null,
	},
	storybook: {
		id: 'storybook',
		text: 'Storybook',
		path: '#storybook',
		icon: 'CustomStorybook',
		subMenu: null,
	},
	formik: {
		id: 'formik',
		text: 'Formik',
		path: '#formik',
		icon: 'CheckBox',
		subMenu: null,
	},
	apex: {
		id: 'apex',
		text: 'Apex Charts',
		path: '#apex',
		icon: 'AreaChart',
		subMenu: null,
	},
};

export const dashboardPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/dashboard',
		icon: 'Dashboard',
		subMenu: null,
	},
	playerMangement:{
		id: 'playerMangement',
		text: 'Player Management',
		path: '/player-management',
		icon: 'People',
		subMenu: null,
	},
	withdrawalManagement:{
		id: 'withdrawalManagement',
		text: 'Withdrawal Management',
		path: '/withdrawal-management',
		icon: 'Money',
		subMenu: null,
	},
	affilateManagement:{
		id:'affilateManagement',
		text:'Affilate Management',
		path:'/affilate-management',
		icon:'Groups',
		subMenu: null,
	},
	setting:{
		id:'setting',
		text:'Setting',
		path:'/setting',
		icon:'AdminPanelSettings',
		subMenu: null,
	},
	telegramBot:{
		id:'telegramBot',
		text:'Telegram Bot',
		path:'/telegram-bot',
		icon:'Storm',
		subMenu: null,
	}
};

// export const demoPagesMenu = {
// 	auth: {
// 		id: 'auth',
// 		text: 'Auth Pages',
// 		icon: 'Extension',
// 	},
// 	login: {
// 		id: 'login',
// 		text: 'Login',
// 		path: 'auth-pages/login',
// 		icon: 'Login',
// 	},
// 	signUp: {
// 		id: 'signUp',
// 		text: 'Sign Up',
// 		path: 'auth-pages/sign-up',
// 		icon: 'PersonAdd',
// 	},
// 	page404: {
// 		id: 'Page404',
// 		text: '404 Page',
// 		path: 'auth-pages/404',
// 		icon: 'ReportGmailerrorred',
// 	},
// };

// export const pageLayoutTypesPagesMenu = {
// 	layoutTypes: {
// 		id: 'layoutTypes',
// 		text: '',
// 	},
// 	blank: {
// 		id: 'blank',
// 		text: 'Blank',
// 		path: 'page-layouts/blank',
// 		icon: 'check_box_outline_blank ',
// 	},
// 	pageLayout: {
// 		id: 'pageLayout',
// 		text: 'Page Layout',
// 		path: 'page-layouts',
// 		icon: 'BackupTable',
// 		subMenu: {
// 			headerAndSubheader: {
// 				id: 'headerAndSubheader',
// 				text: 'Header & Subheader',
// 				path: 'page-layouts/header-and-subheader',
// 				icon: 'ViewAgenda',
// 			},
// 			onlyHeader: {
// 				id: 'onlyHeader',
// 				text: 'Only Header',
// 				path: 'page-layouts/only-header',
// 				icon: 'ViewStream',
// 			},
// 			onlySubheader: {
// 				id: 'onlySubheader',
// 				text: 'Only Subheader',
// 				path: 'page-layouts/only-subheader',
// 				icon: 'ViewStream',
// 			},
// 			onlyContent: {
// 				id: 'onlyContent',
// 				text: 'Only Content',
// 				path: 'page-layouts/only-content',
// 				icon: 'WebAsset',
// 			},
// 		},
// 	},
// 	asideTypes: {
// 		id: 'asideTypes',
// 		text: 'Aside Types',
// 		path: 'aside-types',
// 		icon: 'Vertical Split',
// 		subMenu: {
// 			defaultAside: {
// 				id: 'defaultAside',
// 				text: 'Default Aside',
// 				path: 'aside-types/default-aside',
// 				icon: 'ViewQuilt',
// 			},
// 			minimizeAside: {
// 				id: 'minimizeAside',
// 				text: 'Minimize Aside',
// 				path: 'aside-types/minimize-aside',
// 				icon: 'View Compact',
// 			},
// 		},
// 	},
// };

export const demoPagesMenu = {
	login: {
		id: 'login',
		text: 'Login',
		path: '/login',
	},
	signUp: {
		id: 'signUp',
		text: 'Sign Up',
		path: '/auth-pages/sign-up',
	},
	page404: {
		id: 'page404',
		text: '404',
		path: '/auth-pages/404',
	},
};

export const pageLayoutTypesPagesMenu = {
	pageLayout: {
		subMenu: {
			onlySubheader: {
				path: '/page-layouts/only-subheader',
			},
		},
	}
};



export const productsExampleMenu = {
	companyA: { id: 'companyA', text: 'Company A', path: 'grid-pages/products', subMenu: null },
	companyB: { id: 'companyB', text: 'Company B', path: '/', subMenu: null },
	companyC: { id: 'companyC', text: 'Company C', path: '/', subMenu: null },
	companyD: { id: 'companyD', text: 'Company D', path: '/', subMenu: null },
};
