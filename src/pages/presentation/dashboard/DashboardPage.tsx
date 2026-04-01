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
			title: 'Total users',
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
			title: 'House Rake Balance',
			value: '$12,780',
			color: 'secondary',
		},
		{
			title: "Today's Rake (USDT)",
			value: '320 USDT',
			color: 'danger',
		},
		{
			title: 'Total Affiliate',
			value: 25,
			color: '',
		},
		{
			title: 'Total Deposit',
			value: '$1,20,000',
			color: '',
		},
		{
			title: 'Total Withdrawals',
			value: '$80,000',
			color: '',
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
				{/* <div className='row mt-4'>
					<div className='col-12'>
						<div className='card'>
							<div className='card-body'>
								<h5>Recent Activity (Coming Soon)</h5>
							</div>
						</div>
					</div>
				</div> */}
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;