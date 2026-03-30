// import React, { useLayoutEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
// import Popovers from '../../../components/bootstrap/Popovers';
// import Button, { IButtonProps } from '../../../components/bootstrap/Button';
// import useDarkMode from '../../../hooks/useDarkMode';
// import LANG, { getLangWithKey, ILang } from '../../../lang';
// import Dropdown, {
// 	DropdownItem,
// 	DropdownMenu,
// 	DropdownToggle,
// } from '../../../components/bootstrap/Dropdown';
// import showNotification from '../../../components/extras/showNotification';
// import Icon from '../../../components/icon/Icon';
// import Spinner from '../../../components/bootstrap/Spinner';

// const DashboardHeader = () => {
// 	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
// 	const styledBtn: IButtonProps = {
// 		color: darkModeStatus ? 'dark' : 'light',
// 		hoverShadow: 'default',
// 		isLight: !darkModeStatus,
// 		size: 'lg',
// 	};

// 	const { i18n } = useTranslation();

// 	const changeLanguage = (lng: ILang['key']['lng']) => {
// 		i18n.changeLanguage(lng).then(() =>
// 			showNotification(
// 				<span className='d-flex align-items-center'>
// 					<Icon icon={getLangWithKey(lng)?.icon} size='lg' className='me-1' />
// 					<span>{`Language changed to ${getLangWithKey(lng)?.text}`}</span>
// 				</span>,
// 				'You updated the language of the site. (Only "Aside" was prepared as an example.)',
// 			),
// 		);
// 	};

// 	/**
// 	 * Language attribute
// 	 */
// 	useLayoutEffect(() => {
// 		document.documentElement.setAttribute('lang', i18n.language);
// 	});

// 	return (
// 		<Header>
// 			<HeaderLeft>
// 				<Popovers title='' desc=''>
// 					Search
// 				</Popovers>
// 				{/* <code>DashboardHeader.tsx</code> */}
// 			</HeaderLeft>

// 			<HeaderRight>
// 				<div className='row g-3 align-items-center'>
// 					<div className='col-auto'>
// 						<Popovers title='' desc=''>
// 							HeaderRight
// 						</Popovers>
// 						{/* <code className='ps-3'>DashboardHeader.tsx</code> */}
// 					</div>
// 					{/* Dark Mode */}
// 					<div className='col-auto'>
// 						<Popovers trigger='hover' desc='Dark / Light mode'>
// 							<Button
// 								// eslint-disable-next-line react/jsx-props-no-spreading
// 								{...styledBtn}
// 								onClick={() => setDarkModeStatus(!darkModeStatus)}
// 								className='btn-only-icon'
// 								data-tour='dark-mode'
// 								aria-label='Toggle dark mode'>
// 								<Icon
// 									icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
// 									color={darkModeStatus ? 'info' : 'warning'}
// 									className='btn-icon'
// 								/>
// 							</Button>
// 						</Popovers>
// 					</div>
// 					{/* Lang Selector */}
// 					<div className='col-auto'>
// 						<Dropdown>
// 							<DropdownToggle hasIcon={false}>
// 								{typeof getLangWithKey(i18n.language as ILang['key']['lng'])
// 									?.icon === 'undefined' ? (
// 									<Button
// 										// eslint-disable-next-line react/jsx-props-no-spreading
// 										{...styledBtn}
// 										className='btn-only-icon'
// 										aria-label='Change language'
// 										data-tour='lang-selector'>
// 										<Spinner isSmall inButton='onlyIcon' isGrow />
// 									</Button>
// 								) : (
// 									<Button
// 										// eslint-disable-next-line react/jsx-props-no-spreading
// 										{...styledBtn}
// 										icon={
// 											getLangWithKey(i18n.language as ILang['key']['lng'])
// 												?.icon
// 										}
// 										aria-label='Change language'
// 										data-tour='lang-selector'
// 									/>
// 								)}
// 							</DropdownToggle>
// 							<DropdownMenu isAlignmentEnd data-tour='lang-selector-menu'>
// 								{Object.keys(LANG).map((i) => (
// 									<DropdownItem key={LANG[i].lng}>
// 										<Button
// 											icon={LANG[i].icon}
// 											onClick={() => changeLanguage(LANG[i].lng)}>
// 											{LANG[i].text}
// 										</Button>
// 									</DropdownItem>
// 								))}
// 							</DropdownMenu>
// 						</Dropdown>
// 					</div>
// 				</div>
// 			</HeaderRight>
// 		</Header>
// 	);
// };

// export default DashboardHeader;

import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import Popovers from '../../../components/bootstrap/Popovers';
import Button, { IButtonProps } from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import LANG, { getLangWithKey, ILang } from '../../../lang';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Spinner from '../../../components/bootstrap/Spinner';

const DashboardHeader = () => {
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	const { i18n } = useTranslation();

	// const [searchTerm, setSearchTerm] = useState('');

	const styledBtn: IButtonProps = {
		color: darkModeStatus ? 'dark' : 'light',
		hoverShadow: 'default',
		isLight: !darkModeStatus,
		size: 'lg',
	};

	const changeLanguage = (lng: ILang['key']['lng']) => {
		i18n.changeLanguage(lng).then(() =>
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon={getLangWithKey(lng)?.icon} size='lg' className='me-1' />
					<span>{`Language changed to ${getLangWithKey(lng)?.text}`}</span>
				</span>,
				'Language updated successfully',
			),
		);
	};

	// // Search handler
	// const handleSearch = () => {
	// 	console.log('Searching for:', searchTerm);

	// 	// 👉 Replace this with API call or filter logic
	// };

	useLayoutEffect(() => {
		document.documentElement.setAttribute('lang', i18n.language);
	}, [i18n.language]);

	return (
		<Header>
			<HeaderLeft>
				{/* 🔍 SEARCH BAR */}
				<div className='d-flex align-items-center'>
					{/* <div className='position-relative'>
						<input
							type='text'
							placeholder='Search...'
							className='form-control pe-5'
							style={{ width:'250px' }}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleSearch();
							}}
						/>
						<span
							className='position-absolute'
							style={{
								right: '10px',
								top: '50%',
								transform: 'translateY(-50%)',
							}}>
							<Icon icon='Search' />
						</span>
					</div> */}

					{/* <Button
						className='ms-2'
						onClick={handleSearch}
						color='primary'
						icon='Search'>
						Search
					</Button> */}
				</div>
			</HeaderLeft>

			<HeaderRight>
				<div className='row g-3 align-items-center'>

					{/* 🌙 Dark Mode */}
						{/* <div className='col-auto'>
							<Popovers trigger='hover' desc='Dark mode'>
								<Button
									{...styledBtn}
									// onClick={() => setDarkModeStatus(!darkModeStatus)}
									onClick={() => setDarkModeStatus(true)}
									className='btn-only-icon'
									aria-label='Toggle dark mode'>
									<Icon
										icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
										// color={darkModeStatus ? 'info' : 'warning'}
										color='info'
										className='btn-icon'
									/>
								</Button>
							</Popovers>
						</div> */}

					{/* 🌐 Language Selector */}
					<div className='col-auto'>
						<Dropdown>
							<DropdownToggle hasIcon={false}>
								{typeof getLangWithKey(i18n.language as ILang['key']['lng'])
									?.icon === 'undefined' ? (
									<Button
										{...styledBtn}
										className='btn-only-icon'
										aria-label='Change language'>
										<Spinner isSmall inButton='onlyIcon' isGrow />
									</Button>
								) : (
									<Button
										{...styledBtn}
										icon={
											getLangWithKey(i18n.language as ILang['key']['lng'])
												?.icon
										}
										aria-label='Change language'
									/>
								)}
							</DropdownToggle>

							<DropdownMenu isAlignmentEnd>
								{Object.keys(LANG).map((i) => (
									<DropdownItem key={LANG[i].lng}>
										<Button
											icon={LANG[i].icon}
											onClick={() => changeLanguage(LANG[i].lng)}>
											{LANG[i].text}
										</Button>
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
			</HeaderRight>
		</Header>
	);
};

export default DashboardHeader;