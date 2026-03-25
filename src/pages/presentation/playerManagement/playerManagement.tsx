import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';

export default function PlayerManagement() {
	const [activeTab, setActiveTab] = useState('stats');

	const playerData = [
		{
			wl: "-10,000",
			hands: 10,
			fee: "15,420"
		},
		{
			wl: "+2,500",
			hands: 12,
			fee: "15,420"
		},
		{
			wl: "-10,000",
			hands: 20,
			fee: "15,420"
		}
	];

	const ledgerData = [
		{
			date: "2025-01-01",
			type: "Credit",
			amt: "+5000",
			reference: "TXN12345"
		},
		{
			date: "2025-01-01",
			type: "Debit",
			amt: "-2000",
			reference: "TXN12346"
		},
		{
			date: "2025-01-01",
			type: "Adjustment",
			amt: "+1000",
			reference: "TXN12347"
		}
	];

	return (
		<PageWrapper title='Player Management'>
			<SubHeader>
				<SubHeaderLeft>
					<b>Player Management</b>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				{/* SEARCH */}
				<div className='card mb-3 p-3'>
					<input
						type='text'
						className='form-control'
						placeholder='Search players...'
					/>
				</div>

				{/* Player Card */}
				<div className='card mb-3 p-4'>
					<h4 className='mb-1'>Darrell Steward</h4>
					<p className='text-muted'>darrell23@gmail.com</p>

					<div className='row g-3 mt-2'>
						<div className='col-md-6 col-lg-3'>
							<div className='bg-light p-3 rounded'>
								<small className='text-muted d-block'>Social Chips</small>
								<strong>0</strong>
							</div>
						</div>
						<div className='col-md-6 col-lg-3'>
							<div className='bg-light p-3 rounded'>
								<small className='text-muted d-block'>D1 Chips</small>
								<strong>0.00</strong>
							</div>
						</div>
					</div>
				</div>

				{/* Club Info */}
				<div className='row g-3 mb-3'>
					<div className='col-md-4'>
						<div className='card h-100'>
							<div className='card-body'>
								<small className='text-muted d-block'>ClubGG Name</small>
								<strong>ClubGG01</strong>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<div className='card h-100'>
							<div className='card-body'>
								<small className='text-muted d-block'>ClubGG ID</small>
								<strong>GG123455</strong>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<div className='card h-100'>
							<div className='card-body'>
								<small className='text-muted d-block'>Clubs</small>
								<div className='mt-1'>
									<span className='badge bg-secondary me-1'>Division 1</span>
									<span className='badge bg-secondary me-1'>Division 2</span>
									<span className='badge bg-secondary'>Division 3</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Player Actions */}
				<div className='card mb-3'>
					<div className='card-header'>
						<h5 className='mb-0'>Player Actions</h5>
					</div>
					<div className='card-body'>
						<div className='row g-2'>
							<div className='col-md-6 col-lg-4'>
								<button className='btn btn-warning w-100'>
									Freeze Player
								</button>
							</div>
							<div className='col-md-6 col-lg-4'>
								<button className='btn btn-success w-100'>
									Unfreeze Player
								</button>
							</div>
							<div className='col-md-6 col-lg-4'>
								<button className='btn btn-danger w-100'>
									Lock Withdrawals
								</button>
							</div>
							<div className='col-md-6 col-lg-4'>
								<button className='btn btn-info w-100'>
									Unlock Withdrawals
								</button>
							</div>
							<div className='col-md-6 col-lg-4'>
								<button className='btn btn-primary w-100'>
									Credit Balance (Reason required)
								</button>
							</div>
							<div className='col-md-6 col-lg-4'>
								<button className='btn btn-secondary w-100'>
									Debit Balance (Reason required)
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* TABS */}
				<div className='mb-3'>
					{["Player Stats", "Chip Activity", "Payment", "Rewards", "Ledger"].map(
						(tab, i) => (
							<button
								key={i}
								className={`btn me-2 ${
									i === 0 && activeTab === 'stats'
										? "btn-success"
										: "btn-light"
								}`}
								onClick={() => setActiveTab(i === 4 ? 'ledger' : 'stats')}>
								{tab}
							</button>
						)
					)}
				</div>

				{/* Player Stats Table */}
				{activeTab === 'stats' && (
					<div className='card'>
						<div className='table-responsive'>
							<table className='table table-hover align-middle'>
								<thead className='table-light'>
									<tr>
										<th>Win & Loss</th>
										<th>Total Hands</th>
										<th>Total Fee</th>
									</tr>
								</thead>
								<tbody>
									{playerData.map((row, i) => (
										<tr key={i}>
											<td className={row.wl.includes("+") ? "text-success" : "text-danger"}>
												{row.wl}
											</td>
											<td>{row.hands}</td>
											<td>{row.fee}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* Player Ledger Table */}
				{activeTab === 'ledger' && (
					<div className='card'>
						<div className='card-header'>
							<h5 className='mb-0'>Player Ledger</h5>
						</div>
						<div className='table-responsive'>
							<table className='table table-hover align-middle'>
								<thead className='table-light'>
									<tr>
										<th>Date</th>
										<th>Type</th>
										<th>Amount</th>
										<th>Reference</th>
									</tr>
								</thead>
								<tbody>
									{ledgerData.map((row, i) => (
										<tr key={i}>
											<td>{row.date}</td>
											<td>{row.type}</td>
											<td className={row.amt.includes("+") ? "text-success" : "text-danger"}>
												{row.amt}
											</td>
											<td>{row.reference}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

			</Page>
		</PageWrapper>
	);
}