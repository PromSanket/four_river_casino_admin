import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
} from '../../../layout/SubHeader/SubHeader';
import { FaEye, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PaginationButtons from '../../../components/PaginationButtons';

export default function PlayerManagement() {
	const [activeTab, setActiveTab] = useState('stats');

	// ✅ Toggle between LIST & DETAILS
	const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

	// ✅ Modal State (UNCHANGED)
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState('');
	const [reason, setReason] = useState('');
	const [amount, setAmount] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [pendingAction, setPendingAction] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(5);
	const [searchTerm, setSearchTerm] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [playerToDelete, setPlayerToDelete] = useState<any>(null);

	const [showConfirmDialog, setShowConfirmDialog] = useState(false);

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const [errors, setErrors] = useState({
		amount: '',
		reason: '',
	});

	// Ledger tab state
	const [activeLedgerTab, setActiveLedgerTab] = useState('gameHistory');

	// ✅ Dummy Player List
	const players = [
		{
			id: "PLR001",
			fullName: "Darrell Steward",
			email: "darrell23@gmail.com",
			telegram: "@darrell23",
			dob: "1998-05-12",
			createdAt: "2025-01-01",
			status: "Active",
			balance: "₹50,000",
			deposits: "₹1,20,000",
			withdrawals: "₹70,000",
			host: "Host_01"
		},
		{
			id: "PLR002",
			fullName: "Ronald Richards",
			email: "ronald@gmail.com",
			telegram: "@ronald",
			dob: "1995-02-20",
			createdAt: "2025-01-02",
			status: "Inactive",
			balance: "₹30,000",
			deposits: "₹90,000",
			withdrawals: "₹40,000",
			host: "Host_02"
		},
		{ id: "PLR003", fullName: "Cody Fisher", email: "cody@gmail.com", telegram: "@cody", dob: "1992-06-11", createdAt: "2025-01-03", status: "Active", balance: "₹20,000", deposits: "₹60,000", withdrawals: "₹30,000", host: "Host_01" },
		{ id: "PLR004", fullName: "Kathryn Murphy", email: "kathryn@gmail.com", telegram: "@kathryn", dob: "1997-08-15", createdAt: "2025-01-04", status: "Active", balance: "₹40,000", deposits: "₹1,00,000", withdrawals: "₹50,000", host: "Host_03" },
		{ id: "PLR005", fullName: "Jacob Jones", email: "jacob@gmail.com", telegram: "@jacob", dob: "1993-09-21", createdAt: "2025-01-05", status: "Inactive", balance: "₹10,000", deposits: "₹30,000", withdrawals: "₹15,000", host: "Host_02" },
		{ id: "PLR006", fullName: "Leslie Alexander", email: "leslie@gmail.com", telegram: "@leslie", dob: "1996-11-10", createdAt: "2025-01-06", status: "Active", balance: "₹80,000", deposits: "₹1,50,000", withdrawals: "₹60,000", host: "Host_04" },
		{ id: "PLR007", fullName: "Devon Lane", email: "devon@gmail.com", telegram: "@devon", dob: "1994-04-25", createdAt: "2025-01-07", status: "Inactive", balance: "₹25,000", deposits: "₹70,000", withdrawals: "₹20,000", host: "Host_01" },
		{ id: "PLR008", fullName: "Bessie Cooper", email: "bessie@gmail.com", telegram: "@bessie", dob: "1991-03-30", createdAt: "2025-01-08", status: "Active", balance: "₹55,000", deposits: "₹1,10,000", withdrawals: "₹45,000", host: "Host_03" },
		{ id: "PLR009", fullName: "Guy Hawkins", email: "guy@gmail.com", telegram: "@guy", dob: "1990-12-05", createdAt: "2025-01-09", status: "Active", balance: "₹65,000", deposits: "₹1,30,000", withdrawals: "₹70,000", host: "Host_02" },
		{ id: "PLR010", fullName: "Jane Cooper", email: "jane@gmail.com", telegram: "@jane", dob: "1999-07-14", createdAt: "2025-01-10", status: "Inactive", balance: "₹15,000", deposits: "₹40,000", withdrawals: "₹10,000", host: "Host_04" },
		{ id: "PLR011", fullName: "Albert Flores", email: "albert@gmail.com", telegram: "@albert", dob: "1992-02-18", createdAt: "2025-01-11", status: "Active", balance: "₹90,000", deposits: "₹2,00,000", withdrawals: "₹1,00,000", host: "Host_01" },
		{ id: "PLR012", fullName: "Savannah Nguyen", email: "savannah@gmail.com", telegram: "@savannah", dob: "1998-10-22", createdAt: "2025-01-12", status: "Active", balance: "₹35,000", deposits: "₹80,000", withdrawals: "₹25,000", host: "Host_03" }
	];

	// Ledger Data for different categories
	const gameHistoryData = [
		{ datetime: "2025-01-15 14:30:25", tableName: "Texas Hold'em #1", stake: "₹1,000", result: "Win", payout: "₹2,000" },
		{ datetime: "2025-01-15 13:15:10", tableName: "Blackjack Table 3", stake: "₹500", result: "Lose", payout: "₹0" },
		{ datetime: "2025-01-15 11:45:30", tableName: "Roulette VIP", stake: "₹2,000", result: "Win", payout: "₹4,000" },
		{ datetime: "2025-01-14 20:30:15", tableName: "Poker Room 2", stake: "₹1,500", result: "Win", payout: "₹3,000" },
		{ datetime: "2025-01-14 18:22:45", tableName: "Baccarat Table 1", stake: "₹3,000", result: "Lose", payout: "₹0" }
	];

	const purchasesData = [
		{ datetime: "2025-01-15 16:20:10", amount: "₹5,000", network: "UPI", status: "Success" },
		{ datetime: "2025-01-14 12:15:30", amount: "₹10,000", network: "Bank Transfer", status: "Success" },
		{ datetime: "2025-01-13 09:45:20", amount: "₹2,500", network: "Credit Card", status: "Failed" },
		{ datetime: "2025-01-12 15:30:45", amount: "₹7,500", network: "UPI", status: "Success" },
		{ datetime: "2025-01-11 11:10:15", amount: "₹3,000", network: "Wallet", status: "Success" }
	];

	const withdrawalData = [
		{ datetime: "2025-01-15 17:45:30", amount: "₹8,000", network: "UPI", walletAddress: "user@upi", status: "Success" },
		{ datetime: "2025-01-14 14:20:15", amount: "₹15,000", network: "Bank Transfer", walletAddress: "ACC123456789", status: "Processing" },
		{ datetime: "2025-01-13 10:30:45", amount: "₹4,000", network: "UPI", walletAddress: "user2@upi", status: "Success" },
		{ datetime: "2025-01-12 16:15:20", amount: "₹6,000", network: "Wallet", walletAddress: "WALLET789", status: "Failed" },
		{ datetime: "2025-01-11 13:25:10", amount: "₹12,000", network: "Bank Transfer", walletAddress: "ACC987654321", status: "Success" }
	];

	const othersData = [
		{ datetime: "2025-01-15 18:10:25", amount: "₹1,000", type: "Credit", reason: "Referral Bonus" },
		{ datetime: "2025-01-14 19:30:15", amount: "₹500", type: "Debit", reason: "Penalty Charge" },
		{ datetime: "2025-01-13 20:45:30", amount: "₹2,000", type: "Credit", reason: "Promotional Bonus" },
		{ datetime: "2025-01-12 21:15:45", amount: "₹300", type: "Debit", reason: "Transaction Fee" },
		{ datetime: "2025-01-11 22:30:10", amount: "₹1,500", type: "Credit", reason: "Loyalty Reward" }
	];

	const filteredPlayers = players.filter((p) =>
		p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
		p.telegram.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const paginatedPlayers = filteredPlayers.slice(
		(currentPage - 1) * perPage,
		currentPage * perPage
	);

	const [isFrozen, setIsFrozen] = useState(false);
	const [isWithdrawLocked, setIsWithdrawLocked] = useState(false);

	useEffect(() => {
		if (selectedPlayer) {
			setIsFrozen(selectedPlayer.status === "Inactive");
			setIsWithdrawLocked(false);
		}
	}, [selectedPlayer]);

	// ✅ Actions (UNCHANGED)
	const handleActionClick = (type: string) => {
		setActionType(type);
		setReason('');
		setAmount('');
		setShowModal(true);
	};

	const handleFreezeToggle = () => {
		setShowModal(false); // Close any open credit/debit modal
		setPendingAction('freeze');
		setShowConfirmModal(true);
		setActionType(''); // Clear action type when showing freeze confirmation
	};

	const handleWithdrawLockToggle = () => {
		setShowModal(false); // Close any open credit/debit modal
		setPendingAction('withdrawLock');
		setShowConfirmModal(true);
		setActionType(''); // Clear action type when showing withdraw lock confirmation
	};

	const handleConfirmAction = () => {
		if (pendingAction === 'freeze') {
			const val = !isFrozen;
			setIsFrozen(val);
			console.log("Freeze:", val);
		} else if (pendingAction === 'withdrawLock') {
			const val = !isWithdrawLocked;
			setIsWithdrawLocked(val);
			console.log("Withdraw Lock:", val);
		}
		setShowConfirmModal(false);
		setPendingAction('');
	};

	const handleModalConfirm = () => {
		// if ((actionType === 'credit' || actionType === 'debit') && !reason.trim()) {
		// 	alert('Please enter a reason');
		// 	return;
		// }
		// if ((actionType === 'credit' || actionType === 'debit') && !amount.trim()) {
		// 	alert('Please enter an amount');
		// 	return;
		// }
		let newErrors = { amount: '', reason: '' };

		if ((actionType === 'credit' || actionType === 'debit')) {
			if (!amount || Number(amount) <= 0) {
				newErrors.amount = 'Amount is required and must be greater than 0';
			}

			if (!reason.trim()) {
				newErrors.reason = 'Reason is required';
			}
		}

		setErrors(newErrors);

		// Stop submit if errors exist
		if (newErrors.amount || newErrors.reason) return;
		setShowModal(false);
		setShowConfirmModal(true);
		setPendingAction(''); // Clear pending action when showing credit/debit confirmation
	};

	// const handleConfirm = () => {
	// 	console.log('Action:', actionType, 'Amount:', amount, 'Reason:', reason);
	// 	setShowConfirmModal(false);
	// 	setActionType('');
	// 	setReason('');
	// 	setAmount('');
	// 	setPendingAction(''); // Clear pending action after credit/debit confirmation
	// };

	const handleConfirm = () => {
		console.log('Action:', actionType, 'Amount:', amount, 'Reason:', reason);

		setShowConfirmModal(false);

		// ✅ Toast message
		setToastMessage(
			actionType === 'credit'
				? 'Credit successfully completed'
				: 'Debit successfully completed'
		);
		setShowToast(true);

		// reset
		setActionType('');
		setReason('');
		setAmount('');

		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	};

	const handleDeleteConfirm = () => {
		console.log("Deleting:", playerToDelete);

		// API CALL HERE
		// 👉 API CALL HERE

		setShowDeleteModal(false);
		setPlayerToDelete(null);
	};

	return (
		<PageWrapper title='Player Management'>
			<SubHeader className='mb-3 mt-3 me-0 ms-0'>
				<SubHeaderLeft>
					<b>Player Management</b>
				</SubHeaderLeft>
			</SubHeader>

			<Page container={false} className="p-0">
				<div className="container-fluid p-0">
					{selectedPlayer && (
						<div className="d-flex justify-content-between align-items-center mb-3">
							<input
								type='text'
								placeholder='Search...'
								className='form-control w-25'
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setCurrentPage(1);
								}}
							/>
							<button
								className="btn btn-secondary d-flex align-items-center gap-2"
								onClick={() => setSelectedPlayer(null)}
							>
								<FaChevronLeft />
								Back
							</button>
						</div>
					)}

					{!selectedPlayer && (
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
					)}

					{/* ========================= */}
					{/* ✅ PLAYER LIST VIEW */}
					{/* ========================= */}
					{!selectedPlayer && (
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
											<th className='py-3 justify-con'>Full Name</th>
											<th>Telegram</th>
											<th>Email</th>
											<th>DOB</th>
											<th>Created At</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>

									<tbody>
										{paginatedPlayers.map((p, i) => (
											<tr
												key={i}
												style={{
													background: '#1f2228',
													borderRadius: '12px',
													boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
												}}>
												<td className='py-3'>{p.fullName}</td>
												<td>{p.telegram}</td>
												<td>{p.email}</td>
												<td>{p.dob}</td>
												<td>{p.createdAt}</td>
												<td>
													<span className={`badge ${p.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
														{p.status}
													</span>
												</td>
												<td>
													<button
														className='btn btn-sm btn-info me-2'
														onClick={() => setSelectedPlayer(p)}
													>
														<FaEye />
													</button>

													<button
														className='btn btn-sm btn-danger'
														onClick={() => {
															setPlayerToDelete(p);
															setShowDeleteModal(true);
														}}
													>
														<FaTrash />
													</button>
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
									{Math.min(currentPage * perPage, filteredPlayers.length)} of{' '}
									{filteredPlayers.length} items
								</span>

								<PaginationButtons
									data={filteredPlayers}
									label='players'
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
									perPage={perPage}
									setPerPage={setPerPage}
								/>
							</div>
						</div>
					)}

					{/* ========================= */}
					{/* ✅ PLAYER DETAIL VIEW (YOUR UI) */}
					{/* ========================= */}
					{selectedPlayer && (
						<>
							{/* TOP SECTION */}
							<div className="row g-3 mb-3">

								{/* LEFT PROFILE */}
								<div className="col-md-3">
									<div className="card p-3 text-center">
										<img
											src="https://i.pravatar.cc/100"
											className="rounded-circle mb-2"
											width="80"
										/>
										<h5 className='text-start'>{selectedPlayer.fullName}</h5>

										{/* <span className={`badge ${selectedPlayer.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
										{selectedPlayer.status}
									</span> */}

										<div className="mt-3 text-start">
											<p><b>ID:</b> {selectedPlayer.id}</p>
											<p><b>Email:</b> {selectedPlayer.email}</p>
											<p><b>Telegram Username:</b> {selectedPlayer.telegram}</p>
											{/* <p><b>Host:</b> {selectedPlayer.host}</p> */}
										</div>
									</div>
								</div>

								{/* FINANCIAL */}
								<div className="col-md-9">
									<div className="card p-3 bg-dark text-white">
										<h6>Balance</h6>
										<h2>{selectedPlayer.balance}</h2>

										{/* <div className="row mt-3">
										<div className="col">
											<small>Deposits</small>
											<h5>{selectedPlayer.deposits}</h5>
										</div>
										<div className="col">
											<small>Withdrawals</small>
											<h5>{selectedPlayer.withdrawals}</h5>
										</div>
									</div> */}
									</div>

									<div className="row mt-3">
										<div className="col-md-6">
											<div className="card p-3 bg-success text-white">
												<h6>Total Deposits</h6>
												<h4>{selectedPlayer.deposits}</h4>
											</div>
										</div>

										<div className="col-md-6">
											<div className="card p-3 bg-danger text-white">
												<h6>Total Withdrawals</h6>
												<h4>{selectedPlayer.withdrawals}</h4>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* ACTIONS + GRAPH */}
							<div className="card p-4">
								<h5 className="mb-1">Account Actions</h5>
								<p className="text-muted mb-4">
									Manage player access, restrictions, and manual balance adjustments.
								</p>

								<div className="row g-4">

									{/* ================= LEFT SIDE ================= */}
									<div className="col-md-6">
										<h6 className="text-muted mb-3">SECURITY CONTROLS</h6>

										{/* FREEZE ACCOUNT */}
										<div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center gap-3">
												<div
													style={{
														width: 40,
														height: 40,
														borderRadius: "50%",
														background: "#e7f0ff",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: 18
													}}
												>
													❄️
												</div>

												<div>
													<b>Freeze Account</b>
													<div className="text-muted" style={{ fontSize: 12 }}>
														Suspend all player activity
													</div>
												</div>
											</div>

											<div className="form-check form-switch">
												<input
													className="form-check-input"
													type="checkbox"
													checked={isFrozen}
													onChange={handleFreezeToggle}
												/>
											</div>
										</div>

										{/* LOCK WITHDRAWALS */}
										<div className="border rounded p-3 d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center gap-3">
												<div
													style={{
														width: 40,
														height: 40,
														borderRadius: "50%",
														background: "#fff3e6",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: 18
													}}
												>
													🔒
												</div>

												<div>
													<b>Lock Withdrawals</b>
													<div className="text-muted" style={{ fontSize: 12 }}>
														Prevent cash-outs only
													</div>
												</div>
											</div>

											<div className="form-check form-switch">
												<input
													className="form-check-input"
													type="checkbox"
													checked={isWithdrawLocked}
													onChange={handleWithdrawLockToggle}
												/>
											</div>
										</div>
									</div>

									{/* ================= RIGHT SIDE ================= */}
									<div className="col-md-6">
										<h6 className="text-muted mb-3">BALANCE ADJUSTMENTS</h6>

										{/* CREDIT */}
										<div
											className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center cursor-pointer"
											onClick={() => handleActionClick("credit")}
										>
											<div className="d-flex align-items-center gap-3">
												<div
													style={{
														width: 40,
														height: 40,
														borderRadius: "50%",
														background: "#e6f7ed",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: 20,
														color: "green"
													}}
												>
													+
												</div>

												<div>
													<b>Credit Balance</b>
													<div className="text-muted" style={{ fontSize: 12 }}>
														Add funds manually
													</div>
												</div>
											</div>

											<span style={{ fontSize: 20 }}>›</span>
										</div>

										{/* DEBIT */}
										<div
											className="border rounded p-3 d-flex justify-content-between align-items-center cursor-pointer"
											onClick={() => handleActionClick("debit")}
										>
											<div className="d-flex align-items-center gap-3">
												<div
													style={{
														width: 40,
														height: 40,
														borderRadius: "50%",
														background: "#fdecea",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: 20,
														color: "red"
													}}
												>
													−
												</div>

												<div>
													<b>Debit Balance</b>
													<div className="text-muted" style={{ fontSize: 12 }}>
														Remove funds manually
													</div>
												</div>
											</div>

											<span style={{ fontSize: 20 }}>›</span>
										</div>
									</div>
								</div>

								{/* ================= CREDIT FORM ================= */}
								{/* <div className="border rounded p-3 mt-4">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<b>+ New Credit Adjustment</b>
									<span style={{ cursor: "pointer" }}>✕</span>
								</div>

								<div className="row mb-3">
									<div className="col-md-6">
										<label className="mb-2">Amount ($)</label>
										<input className="form-control" placeholder="0.00" />
									</div>

									<div className="col-md-6">
										<label className="mb-2">Wallet Type</label>
										<select className="form-control">
											<option>Main Wallet</option>
										</select>
									</div>
								</div>

								<div className="mb-3">
									<label className="mb-2">Reason (Required)</label>
									<textarea
										className="form-control"
										placeholder="Enter detailed reason for this adjustment..."
									/>
								</div>

								<div className="d-flex justify-content-end gap-2">
									<button className="btn btn-light">Cancel</button>
									<button className="btn btn-success"
										onClick={() => setShowConfirmDialog(true)}
									>
										Confirm Credit

								</div>
							</div> */}
							</div>

							{/* PLAYER LEDGER WITH TABS */}
							<div className="card p-3 mb-3" style={{ borderRadius: '12px' }}>
								<h5>Player Ledger</h5>

								{/* Tabs Navigation */}
								{/* <div className="d-flex border-bottom mb-3">
								<button
									className={`btn px-4 py-2 border-0 rounded-0 ${
										activeLedgerTab === 'gameHistory'
											? 'bg-primary text-white'
											: 'bg-transparent text-muted'
									}`}
									onClick={() => setActiveLedgerTab('gameHistory')}
								>
									Game History
								</button>
								<button
									className={`btn px-4 py-2 border-0 rounded-0 ${
										activeLedgerTab === 'purchases'
											? 'bg-primary text-white'
											: 'bg-transparent text-muted'
									}`}
									onClick={() => setActiveLedgerTab('purchases')}
								>
									Purchases
								</button>
								<button
									className={`btn px-4 py-2 border-0 rounded-0 ${
										activeLedgerTab === 'withdrawal'
											? 'bg-primary text-white'
											: 'bg-transparent text-muted'
									}`}
									onClick={() => setActiveLedgerTab('withdrawal')}
								>
									Withdrawal
								</button>
								<button
									className={`btn px-4 py-2 border-0 rounded-0 ${
										activeLedgerTab === 'others'
											? 'bg-primary text-white'
											: 'bg-transparent text-muted'
									}`}
									onClick={() => setActiveLedgerTab('others')}
								>
									Others
								</button>
							</div> */}
								<div className="d-flex gap-3 p-3" style={{ borderRadius: '12px' }}>
									{[
										{ key: 'gameHistory', label: 'Game History' },
										{ key: 'purchases', label: 'Purchases' },
										{ key: 'withdrawal', label: 'Withdrawal' },
										{ key: 'others', label: 'Others' },
									].map((tab) => (
										<button
											key={tab.key}
											className="btn px-4 py-2"
											style={{
												borderRadius: '20px',
												fontWeight: 500,
												border: 'none',
												backgroundColor:
													activeLedgerTab === tab.key ? '#49b39c' : '#e4e7ec',
												color:
													activeLedgerTab === tab.key ? '#fff' : '#344054',
												transition: '0.2s',
											}}
											onClick={() => setActiveLedgerTab(tab.key)}
										>
											{tab.label}
										</button>
									))}
								</div>

								{/* Tab Content */}
								<div className="table-responsive">
									{activeLedgerTab === 'gameHistory' && (
										<table className="table table-dark table-hover">
											<thead>
												<tr>
													<th>Datetime</th>
													<th>Table name</th>
													<th>Stake</th>
													<th>Result</th>
													<th>Payout</th>
												</tr>
											</thead>
											<tbody>
												{gameHistoryData.map((row, i) => (
													<tr key={i}>
														<td>{row.datetime}</td>
														<td>{row.tableName}</td>
														<td>{row.stake}</td>
														<td>
															<span className={`badge ${row.result === 'Win' ? 'bg-success' : 'bg-danger'}`}>
																{row.result}
															</span>
														</td>
														<td className={row.result === 'Win' ? 'text-success' : 'text-danger'}>
															{row.payout}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									)}

									{activeLedgerTab === 'purchases' && (
										<table className="table table-dark table-hover">
											<thead>
												<tr>
													<th>Datetime</th>
													<th>Amount</th>
													<th>Network</th>
													<th>Status</th>
												</tr>
											</thead>
											<tbody>
												{purchasesData.map((row, i) => (
													<tr key={i}>
														<td>{row.datetime}</td>
														<td>{row.amount}</td>
														<td>{row.network}</td>
														<td>
															<span className={`badge ${row.status === 'Success' ? 'bg-success' : 'bg-danger'}`}>
																{row.status}
															</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									)}

									{activeLedgerTab === 'withdrawal' && (
										<table className="table table-dark table-hover">
											<thead>
												<tr>
													<th>Datetime</th>
													<th>Amount</th>
													<th>Network</th>
													<th>Wallet Address</th>
													<th>Status</th>
												</tr>
											</thead>
											<tbody>
												{withdrawalData.map((row, i) => (
													<tr key={i}>
														<td>{row.datetime}</td>
														<td>{row.amount}</td>
														<td>{row.network}</td>
														<td>{row.walletAddress}</td>
														<td>
															<span className={`badge ${row.status === 'Success' ? 'bg-success' :
																	row.status === 'Processing' ? 'bg-warning' : 'bg-danger'
																}`}>
																{row.status}
															</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									)}

									{activeLedgerTab === 'others' && (
										<table className="table table-dark table-hover">
											<thead>
												<tr>
													<th>Datetime</th>
													<th>Amount</th>
													<th>Type</th>
													<th>Reason</th>
												</tr>
											</thead>
											<tbody>
												{othersData.map((row, i) => (
													<tr key={i}>
														<td>{row.datetime}</td>
														<td className={row.type === 'Credit' ? 'text-success' : 'text-danger'}>
															{row.type === 'Credit' ? '+' : '-'}{row.amount}
														</td>
														<td>
															<span className={`badge ${row.type === 'Credit' ? 'bg-success' : 'bg-danger'}`}>
																{row.type}
															</span>
														</td>
														<td>{row.reason}</td>
													</tr>
												))}
											</tbody>
										</table>
									)}
								</div>
							</div>
						</>
					)}

					{/* MODAL (UNCHANGED) */}
					{showModal && (
						<div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title text-capitalize">
											{actionType} Confirmation
										</h5>
										<button className="btn-close" onClick={() => setShowModal(false)}></button>
									</div>

									<div className="modal-body">
										<p>Current Balance: {selectedPlayer?.balance}</p>

										{(actionType === 'credit' || actionType === 'debit') && (
											<div>
												{/* <div className="mb-3">
												<label className="mb-2">Amount ($)</label>
												<input
													type="number"
													className="form-control"
													placeholder="0.00"
													value={amount}
													onChange={(e) => setAmount(e.target.value)}
												/>
											</div>
											<div>
												<label className="mb-2">Enter Reason</label>
												<textarea
													className="form-control"
													value={reason}
													onChange={(e) => setReason(e.target.value)}
												/>
											</div> */}
												<div className="mb-3">
													<label className="mb-2">Amount ($)</label>
													<input
														type="number"
														className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
														placeholder="0.00"
														value={amount}
														onChange={(e) => {
															setAmount(e.target.value);
															setErrors({ ...errors, amount: '' }); // clear error on typing
														}}
													/>
													{errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
												</div>

												<div>
													<label className="mb-2">Enter Reason</label>
													<textarea
														className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
														value={reason}
														onChange={(e) => {
															setReason(e.target.value);
															setErrors({ ...errors, reason: '' }); // clear error
														}}
													/>
													{errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
												</div>
											</div>
										)}
									</div>

									<div className="modal-footer">
										{/* <button className="btn btn-secondary" onClick={() => setShowModal(false)}>No</button> */}
										<button className="btn btn-primary" onClick={handleModalConfirm}>Submit</button>
									</div>

								</div>
							</div>
						</div>
					)}

					{showConfirmModal && (actionType === 'credit' || actionType === 'debit') && (
						<div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title text-capitalize">
											{actionType} Confirmation
										</h5>
										<button className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
									</div>

									{/* <div className="modal-body">
									<p>Current Balance: {selectedPlayer?.balance}</p>
									<p>Amount: ${amount}</p>
									<p>Reason: {reason}</p>
								</div> */}
									<div className="modal-body text-center">
										<p className="fs-5">
											Are you sure you want to {actionType} this player?
										</p>
									</div>

									{/* <div className="modal-footer">
									<button className="btn btn-primary" onClick={handleConfirm}>Submit</button>
								</div> */}
									<div className="modal-footer justify-content-center">
										<button
											className="btn btn-secondary"
											onClick={() => setShowConfirmModal(false)}
										>
											No
										</button>

										<button
											className={`btn ${actionType === 'credit' ? 'btn-success' : 'btn-danger'}`}
											onClick={handleConfirm}
										>
											Yes
										</button>
									</div>

								</div>
							</div>
						</div>
					)}

					{showConfirmModal && (pendingAction === 'freeze' || pendingAction === 'withdrawLock') && (
						<div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title text-capitalize">
											{pendingAction === 'freeze' ? 'Freeze Account' : 'Lock Withdrawals'} Confirmation
										</h5>
										<button className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
									</div>

									<div className="modal-body">
										<p>Are you sure you want to {pendingAction === 'freeze' ? 'freeze' : 'lock withdrawals'} this player?</p>
									</div>

									<div className="modal-footer">
										<button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>No</button>
										<button className="btn btn-primary" onClick={handleConfirmAction}>Yes</button>
									</div>

								</div>
							</div>
						</div>
					)}

					{showConfirmDialog && (
						<div
							className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
							style={{
								backgroundColor: 'rgba(0,0,0,0.5)',
								zIndex: 1050,
							}}
						>
							<div className="bg-dark text-light p-4 rounded shadow" style={{ width: '300px' }}>
								<h5 className="mb-3 text-center">Are you sure?</h5>
								<p className="text-center">Do you want to confirm credit?</p>

								<div className="d-flex justify-content-end gap-2 mt-4">
									<button
										className="btn btn-secondary"
										onClick={() => setShowConfirmDialog(false)}
									>
										No
									</button>

									<button
										className="btn btn-success"
										onClick={() => {
											setShowConfirmDialog(false);

											// 👉 Your existing confirm logic here
											console.log('Credit Confirmed');
										}}
									>
										Yes
									</button>
								</div>
							</div>
						</div>
					)}

					{showDeleteModal && (
						<div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">

									<div className="modal-header">
										<h5 className="modal-title text-danger">
											Delete Confirmation
										</h5>
										<button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
									</div>

									<div className="modal-body text-center">
										<p className="fs-5">
											Are you sure you want to delete this player?
										</p>
									</div>

									<div className="modal-footer justify-content-center">
										<button
											className="btn btn-secondary"
											onClick={() => setShowDeleteModal(false)}
										>
											No
										</button>

										<button
											className="btn btn-danger"
											onClick={handleDeleteConfirm}
										>
											Yes
										</button>
									</div>

								</div>
							</div>
						</div>
					)}

					{showToast && (
						<div
							className="position-fixed bottom-0 end-0 p-3"
							style={{ zIndex: 9999 }}
						>
							<div className="toast show align-items-center text-bg-success border-0">
								<div className="d-flex">
									<div className="toast-body">
										{toastMessage || 'Successfully completed'}
									</div>
									<button
										type="button"
										className="btn-close btn-close-white me-2 m-auto"
										onClick={() => setShowToast(false)}
									></button>
								</div>
							</div>
						</div>
					)}
				</div>
			</Page>
		</PageWrapper>
	);
}