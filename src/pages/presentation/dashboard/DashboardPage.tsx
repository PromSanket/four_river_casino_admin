// import React from 'react';
// import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
// import SubHeader, {
// 	SubHeaderLeft,
// 	SubHeaderRight,
// 	SubheaderSeparator,
// } from '../../../layout/SubHeader/SubHeader';
// import Page from '../../../layout/Page/Page';
// import Popovers from '../../../components/bootstrap/Popovers';

// const DashboardPage = () => {
// 	return (
// 		<PageWrapper title='Dashboard Page'>
// 			<SubHeader>
// 				<SubHeaderLeft>
// 					<Popovers
// 						title='DashboardPage.tsx'
// 						desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
// 						SubHeaderLeft
// 					</Popovers>
// 					<code>DashboardPage.tsx</code>
// 					<SubheaderSeparator />
// 				</SubHeaderLeft>
// 				<SubHeaderRight>
// 					<Popovers
// 						title='DashboardPage.tsx'
// 						desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
// 						SubHeaderRight
// 					</Popovers>
// 					<code>DashboardPage.tsx</code>
// 				</SubHeaderRight>
// 			</SubHeader>
// 			<Page>
// 				<div className='row'>
// 					<div className='col-12 mb-3'>
// 						<Popovers
// 							title='DashboardPage.tsx'
// 							desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
// 							Page
// 						</Popovers>
// 						<code className='ps-3'>DashboardPage.tsx</code>
// 					</div>
// 				</div>
// 			</Page>
// 		</PageWrapper>
// 	);
// };

// export default DashboardPage;

import React from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Popovers from '../../../components/bootstrap/Popovers';

const DashboardPage = () => {
	// 👉 Temporary static data (later replace with API)
	const metrics = [
		{
			title: 'Pending Deposits',
			value: 12,
			color: 'primary',
		},
		{
			title: 'Pending Withdrawals',
			value: 8,
			color: 'warning',
		},
		{
			title: 'Active Tables',
			value: 5,
			color: 'info',
		},
		{
			title: 'Total Player Balances',
			value: '$45,320',
			color: 'success',
		},
		{
			title: 'House Wallet Balance',
			value: '$12,780',
			color: 'secondary',
		},
		{
			title: "Today's Rake (USDT)",
			value: '320 USDT',
			color: 'danger',
		},
	];

	return (
		<PageWrapper title='Dashboard'>
			<SubHeader>
				<SubHeaderLeft>
					<b>Dashboard Overview</b>
					<SubheaderSeparator />
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				<div className='row'>
					{metrics.map((item, index) => (
						<div className='col-xl-4 col-md-6 mb-4' key={index}>
							<div className={`card shadow-sm border-${item.color}`}>
								<div className='card-body'>
									<div className='d-flex justify-content-between align-items-center'>
										<div>
											<h6 className='text-muted'>{item.title}</h6>
											<h3 className={`text-${item.color}`}>
												{item.value}
											</h3>
										</div>
										<div className={`bg-${item.color} text-white p-3 rounded`}>
											<i className='fas fa-chart-line'></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* OPTIONAL: placeholder for future tables like your screenshot */}
				<div className='row mt-4'>
					<div className='col-12'>
						<div className='card'>
							<div className='card-body'>
								<h5>Recent Activity (Coming Soon)</h5>
							</div>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;