import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';

const WithdrawalManagementPage = () => {
	const [activeTab, setActiveTab] = useState('pending');

	const data = [
		{
			id: '#W1234',
			player: 'Darrell Steward',
			amount: '$6700',
			wallet: '0xA1B2...C9D8',
			network: 'USDT (TRC20)',
			before: '$10,000',
			after: '$3,300',
			status: 'Pending',
		},
        {
			id: '#W1234',
			player: 'John Doe',
			amount: '$8800',
			wallet: '0xA1C2...C9D9',
			network: 'USDT (TRC20)',
			before: '$8,000',
			after: '$1,200',
			status: 'Pending',
		},
		{
			id: '#W1235',
			player: 'Ronald Richards',
			amount: '$2500',
			wallet: '0xX9Y8...Z7W6',
			network: 'USDT (ERC20)',
			before: '$5000',
			after: '$2500',
			status: 'Completed',
		},
	];

	return (
		<PageWrapper title='Withdrawal Management'>
			<SubHeader>
				<SubHeaderLeft>
					<b>Withdrawal Management</b>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span>Admin Control Panel</span>
				</SubHeaderRight>
			</SubHeader>

			<Page>
				{/* SEARCH */}
				<div className='card mb-3 p-3'>
					<input
						type='text'
						className='form-control'
						placeholder='Search...'
					/>
				</div>

				{/* TABS */}
				<div className='mb-3'>
					<button
						className={`btn me-2 ${
							activeTab === 'pending' ? 'btn-success' : 'btn-light'
						}`}
						onClick={() => setActiveTab('pending')}>
						Pending Withdrawals
					</button>

					<button
						className={`btn ${
							activeTab === 'completed' ? 'btn-secondary' : 'btn-light'
						}`}
						onClick={() => setActiveTab('completed')}>
						Completed Withdrawals
					</button>
				</div>

				{/* TABLE */}
				<div className='card'>
					<div className='table-responsive'>
						<table className='table table-hover align-middle'>
							<thead className='table-light'>
								<tr>
									<th>ID</th>
									<th>Player</th>
									<th>Amount</th>
									<th>Wallet Address</th>
									<th>Network</th>
									<th>Balance Before</th>
									<th>Balance After</th>
									<th>Action</th>
								</tr>
							</thead>

							<tbody>
								{data
									.filter((item) =>
										activeTab === 'pending'
											? item.status === 'Pending'
											: item.status === 'Completed'
									)
									.map((item, index) => (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.player}</td>
											<td>{item.amount}</td>
											<td>{item.wallet}</td>
											<td>{item.network}</td>
											<td>{item.before}</td>
											<td>{item.after}</td>

											<td>
												{item.status === 'Pending' ? (
													<div className='dropdown'>
														<button
															className='btn btn-primary btn-sm dropdown-toggle'
															data-bs-toggle='dropdown'>
															Pending
														</button>

														<ul className='dropdown-menu'>
															<li>
																<button className='dropdown-item text-success'>
																	Approve
																</button>
															</li>
															<li>
																<button className='dropdown-item text-danger'>
																	Reject
																</button>
															</li>
															<li>
																<button className='dropdown-item'>
																	Mark as Paid
																</button>
															</li>
															<li>
																<button className='dropdown-item'>
																	Attach TX Hash
																</button>
															</li>
															<li>
																<button className='dropdown-item'>
																	Add Note
																</button>
															</li>
														</ul>
													</div>
												) : (
													<span className='badge bg-success'>
														Completed
													</span>
												)}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default WithdrawalManagementPage;