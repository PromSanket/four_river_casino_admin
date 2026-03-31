import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
} from '../../../layout/SubHeader/SubHeader';
import PaginationButtons from '../../../components/PaginationButtons';

interface IPaginationButtonsProps {
	data: any[]; // ✅ REQUIRED
	currentPage: number;
	setCurrentPage: (page: number) => void;
	perPage: number;
	setPerPage: (perPage: number) => void;
	label?: string;
}

const WithdrawalManagementPage = () => {
	const [activeTab, setActiveTab] = useState('pending');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(5);
	const [searchTerm, setSearchTerm] = useState('');

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
			id: '#W1235',
			player: 'John Doe',
			amount: '$8800',
			wallet: '0xA1C2...C9D9',
			network: 'USDT (TRC20)',
			before: '$8,000',
			after: '$1,200',
			status: 'Pending',
		},
		{
			id: '#W1236',
			player: 'Ronald Richards',
			amount: '$2500',
			wallet: '0xX9Y8...Z7W6',
			network: 'USDT (ERC20)',
			before: '$5000',
			after: '$2500',
			status: 'Completed',
		},
		{
			id: '#W1237',
			player: 'Sarah Johnson',
			amount: '$4500',
			wallet: '0xB2C3...D4E5',
			network: 'USDT (TRC20)',
			before: '$7,500',
			after: '$3,000',
			status: 'Pending',
		},
		{
			id: '#W1238',
			player: 'Michael Brown',
			amount: '$3200',
			wallet: '0xC3D4...E5F6',
			network: 'USDT (ERC20)',
			before: '$6,200',
			after: '$3,000',
			status: 'Pending',
		},
		{
			id: '#W1239',
			player: 'Emily Davis',
			amount: '$5600',
			wallet: '0xD4E5...F6G7',
			network: 'USDT (TRC20)',
			before: '$9,000',
			after: '$3,400',
			status: 'Completed',
		},
		{
			id: '#W1240',
			player: 'James Wilson',
			amount: '$1800',
			wallet: '0xE5F6...G7H8',
			network: 'USDT (ERC20)',
			before: '$4,800',
			after: '$3,000',
			status: 'Pending',
		},
		{
			id: '#W1241',
			player: 'Patricia Moore',
			amount: '$7200',
			wallet: '0xF6G7...H8I9',
			network: 'USDT (TRC20)',
			before: '$12,000',
			after: '$4,800',
			status: 'Pending',
		},
		{
			id: '#W1242',
			player: 'Robert Taylor',
			amount: '$2900',
			wallet: '0xG7H8...I9J0',
			network: 'USDT (ERC20)',
			before: '$5,900',
			after: '$3,000',
			status: 'Completed',
		},
		{
			id: '#W1245',
			player: 'Barbara Jackson',
			amount: '$1500',
			wallet: '0xJ0K1...L2M3',
			network: 'USDT (TRC20)',
			before: '$4,500',
			after: '$3,000',
			status: 'Completed',
		},
		{
			id: '#W1246',
			player: 'Christopher White',
			amount: '$6800',
			wallet: '0xK1L2...M3N4',
			network: 'USDT (ERC20)',
			before: '$10,800',
			after: '$4,000',
			status: 'Pending',
		},
		{
			id: '#W1247',
			player: 'Jennifer Harris',
			amount: '$3700',
			wallet: '0xL2M3...N4O5',
			network: 'USDT (TRC20)',
			before: '$6,700',
			after: '$3,000',
			status: 'Pending',
		},
		{
			id: '#W1248',
			player: 'David Martin',
			amount: '$5200',
			wallet: '0xM3N4...O5P6',
			network: 'USDT (ERC20)',
			before: '$8,200',
			after: '$3,000',
			status: 'Completed',
		},
		{
			id: '#W1249',
			player: 'Susan Thompson',
			amount: '$2100',
			wallet: '0xN4O5...P6Q7',
			network: 'USDT (TRC20)',
			before: '$5,100',
			after: '$3,000',
			status: 'Pending',
		},
		{
			id: '#W1250',
			player: 'Joseph Garcia',
			amount: '$9400',
			wallet: '0xO5P6...Q7R8',
			network: 'USDT (ERC20)',
			before: '$14,400',
			after: '$5,000',
			status: 'Pending',
		},
		{
			id: '#W1251',
			player: 'Margaret Martinez',
			amount: '$3300',
			wallet: '0xP6Q7...R8S9',
			network: 'USDT (TRC20)',
			before: '$6,300',
			after: '$3,000',
			status: 'Completed',
		},
		{
			id: '#W1252',
			player: 'Charles Robinson',
			amount: '$7600',
			wallet: '0xQ7R8...S9T0',
			network: 'USDT (ERC20)',
			before: '$11,600',
			after: '$4,000',
			status: 'Pending',
		},
		{
			id: '#W1253',
			player: 'Dorothy Clark',
			amount: '$4800',
			wallet: '0xR8S9...T0U1',
			network: 'USDT (TRC20)',
			before: '$7,800',
			after: '$3,000',
			status: 'Pending',
		},
		{
			id: '#W1254',
			player: 'Thomas Rodriguez',
			amount: '$1900',
			wallet: '0xS9T0...U1V2',
			network: 'USDT (ERC20)',
			before: '$4,900',
			after: '$3,000',
			status: 'Completed',
		},
		{
			id: '#W1256',
			player: 'Daniel Lee',
			amount: '$8500',
			wallet: '0xU1V2...W3X4',
			network: 'USDT (ERC20)',
			before: '$12,500',
			after: '$4,000',
			status: 'Pending',
		},
		{
			id: '#W1257',
			player: 'Nancy Walker',
			amount: '$2700',
			wallet: '0xV2W3...X4Y5',
			network: 'USDT (TRC20)',
			before: '$5,700',
			after: '$3,000',
			status: 'Completed',
		},
		{
			id: '#W1258',
			player: 'Paul Hall',
			amount: '$5400',
			wallet: '0xW3X4...Y5Z6',
			network: 'USDT (ERC20)',
			before: '$8,400',
			after: '$3,000',
			status: 'Pending',
		},
		{
			id: '#W1260',
			player: 'Mark Young',
			amount: '$7200',
			wallet: '0xY5Z6...A7B8',
			network: 'USDT (ERC20)',
			before: '$10,200',
			after: '$3,000',
			status: 'Completed',
		},
	];

	// ✅ FILTER DATA BY BOTH STATUS AND SEARCH
	const filteredData = data.filter((item) => {
		const matchesTab = activeTab === 'pending'
			? item.status === 'Pending'
			: item.status === 'Completed';
		const matchesSearch = item.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.id.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesTab && matchesSearch;
	});

	// ✅ PAGINATED DATA
	const paginatedData = filteredData.slice(
		(currentPage - 1) * perPage,
		currentPage * perPage
	);

	// ✅ RESET PAGE WHEN TAB CHANGES
	useEffect(() => {
		setCurrentPage(1);
	}, [activeTab]);

	return (
		<PageWrapper title='Withdrawal Management'>
			<SubHeader>
				<SubHeaderLeft>
					<b>Withdrawal Management</b>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				<input
					type='text'
					placeholder='Search...'
					className='form-control mb-3 w-25'
					value={searchTerm}
					onChange={(e) => {
								setSearchTerm(e.target.value);
								setCurrentPage(1);
							}}
						/>

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
				<div className='card p-3 bg-dark text-light border-0'>
					<div className='table-responsive'>
						<table
							className='table align-middle text-light'
							style={{
								borderCollapse: 'separate',
								borderSpacing: '0 12px',
							}}>

							<thead>
								<tr style={{ background: '#2a2d33' }}>
									<th className='py-3'>ID</th>
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
								{paginatedData.map((item, index) => (
									<tr
										key={index}
										style={{
											background: '#1f2228',
											borderRadius: '12px',
											boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
										}}>

										<td className='py-3'>{item.id}</td>
										<td>{item.player}</td>
										<td className='fw-semibold text-warning'>
											{item.amount}
										</td>
										<td>{item.wallet}</td>
										<td>{item.network}</td>
										<td>{item.before}</td>
										<td>{item.after}</td>

										<td>
											{item.status === 'Pending' ? (
												<div className='dropdown'>
													<button
														className='btn btn-sm btn-primary  dropdown-toggle'
														data-bs-toggle='dropdown'>
														Pending
													</button>

													<ul className='dropdown-menu dropdown-menu-dark'>
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

					{/* ✅ PAGINATION UI */}
					<div className='d-flex justify-content-between align-items-center mt-3'>
						<span className='small text-light'>
							Showing {(currentPage - 1) * perPage + 1} to{' '}
							{Math.min(currentPage * perPage, filteredData.length)} of{' '}
							{filteredData.length} items
						</span>

						<PaginationButtons
							data={filteredData}
							label='items'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
							// totalCount={filteredData.length}
						/>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default WithdrawalManagementPage;