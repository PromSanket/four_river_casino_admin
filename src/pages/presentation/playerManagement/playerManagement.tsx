import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
} from '../../../layout/SubHeader/SubHeader';
import { FaEye, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function PlayerManagement() {
	const [activeTab, setActiveTab] = useState('stats');

	// ✅ Toggle between LIST & DETAILS
	const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

	// ✅ Modal State (UNCHANGED)
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState('');
	const [reason, setReason] = useState('');

	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;
	const indexOfLast = currentPage * rowsPerPage;
	const indexOfFirst = indexOfLast - rowsPerPage;
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [playerToDelete, setPlayerToDelete] = useState<any>(null);


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

	// Ledger Data (UNCHANGED)
	const ledgerData = [
		{ date: "2025-01-01", type: "Credit", amt: "+5000", reference: "TXN12345" },
		{ date: "2025-01-01", type: "Debit", amt: "-2000", reference: "TXN12346" },
		{ date: "2025-01-01", type: "Adjustment", amt: "+1000", reference: "SYS12347" }
	];



	const filteredPlayers = players.filter((p) =>
		p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
		p.telegram.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const currentPlayers = filteredPlayers.slice(indexOfFirst, indexOfLast);
	const totalPages = Math.ceil(filteredPlayers.length / rowsPerPage);

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
		setShowModal(true);
	};

	const handleConfirm = () => {
		if ((actionType === 'credit' || actionType === 'debit') && !reason.trim()) {
			alert('Please enter a reason');
			return;
		}
		console.log('Action:', actionType, 'Reason:', reason);
		setShowModal(false);
	};

	const handleDeleteConfirm = () => {
		console.log("Deleting:", playerToDelete);

		// 👉 API CALL HERE

		setShowDeleteModal(false);
		setPlayerToDelete(null);
	};

	return (
		<PageWrapper title='Player Management'>
			<SubHeader>
				<SubHeaderLeft>
					<b>Player Management</b>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				{/* ========================= */}
				{/* ✅ PLAYER LIST VIEW */}
				{/* ========================= */}
				{!selectedPlayer && (
					<div className='card p-3'>
						<h5>Player List</h5>

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
						<table className='table'>
							<thead>
								<tr>
									<th>Full Name</th>
									<th>Telegram</th>
									<th>Email</th>
									<th>DOB</th>
									<th>Created At</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>

							<tbody>
								{currentPlayers.map((p, i) => (
									<tr key={i}>
										<td>{p.fullName}</td>
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
						<div className='d-flex justify-content-end mt-3'>
							<button
								className='btn btn-light me-2'
								disabled={currentPage === 1}
								onClick={() => setCurrentPage(currentPage - 1)}
							>
								<FaChevronLeft />
							</button>

							<span className='align-self-center'>
								Page {currentPage} of {totalPages}
							</span>

							<button
								className='btn btn-light ms-2'
								disabled={currentPage === totalPages}
								onClick={() => setCurrentPage(currentPage + 1)}
							>
								<FaChevronRight />
							</button>
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
									<h5>{selectedPlayer.fullName}</h5>

									<span className={`badge ${selectedPlayer.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
										{selectedPlayer.status}
									</span>

									<div className="mt-3 text-start">
										<p><b>ID:</b> {selectedPlayer.id}</p>
										<p><b>Email:</b> {selectedPlayer.email}</p>
										<p><b>Telegram Username:</b> {selectedPlayer.telegram}</p>
										<p><b>Host:</b> {selectedPlayer.host}</p>
									</div>
								</div>
							</div>

							{/* FINANCIAL */}
							<div className="col-md-9">
								<div className="card p-3 bg-dark text-white">
									<h6>Financial Overview</h6>
									<h2>{selectedPlayer.balance}</h2>

									<div className="row mt-3">
										<div className="col">
											<small>Deposits</small>
											<h5>{selectedPlayer.deposits}</h5>
										</div>
										<div className="col">
											<small>Withdrawals</small>
											<h5>{selectedPlayer.withdrawals}</h5>
										</div>
									</div>
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
												onChange={() => {
													const val = !isFrozen;
													setIsFrozen(val);
													console.log("Freeze:", val);
												}}
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
												onChange={() => {
													const val = !isWithdrawLocked;
													setIsWithdrawLocked(val);
													console.log("Withdraw Lock:", val);
												}}
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
							<div className="border rounded p-3 mt-4">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<b>+ New Credit Adjustment</b>
									<span style={{ cursor: "pointer" }}>✕</span>
								</div>

								<div className="row mb-3">
									<div className="col-md-6">
										<label>Amount ($)</label>
										<input className="form-control" placeholder="0.00" />
									</div>

									<div className="col-md-6">
										<label>Wallet Type</label>
										<select className="form-control">
											<option>Main Wallet</option>
										</select>
									</div>
								</div>

								<div className="mb-3">
									<label>Reason (Required)</label>
									<textarea
										className="form-control"
										placeholder="Enter detailed reason for this adjustment..."
									/>
								</div>

								<div className="d-flex justify-content-end gap-2">
									<button className="btn btn-light">Cancel</button>
									<button className="btn btn-success">Confirm Credit</button>
								</div>
							</div>
						</div>

						{/* TRANSACTIONS */}
						<div className="card p-3 mb-3">
							<h5>Player Ledger</h5>

							<table className="table mt-2">
								<thead>
									<tr>
										<th>ID</th>
										<th>Type</th>
										<th>Date</th>
										<th>Amount</th>
										<th>Status</th>
									</tr>
								</thead>

								<tbody>
									{ledgerData.map((row, i) => (
										<tr key={i}>
											<td>{row.reference}</td>
											<td>{row.type}</td>
											<td>{row.date}</td>
											<td className={row.amt.includes("+") ? "text-success" : "text-danger"}>
												{row.amt}
											</td>
											<td><span className="badge bg-success">Completed</span></td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* BACK */}
						<button
							className="btn btn-secondary"
							onClick={() => setSelectedPlayer(null)}
						>
							← Back
						</button>
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
									<p>Are you sure you want to <b>{actionType}</b> this player?</p>

									{(actionType === 'credit' || actionType === 'debit') && (
										<div>
											<label>Enter Reason</label>
											<textarea
												className="form-control"
												value={reason}
												onChange={(e) => setReason(e.target.value)}
											/>
										</div>
									)}
								</div>

								<div className="modal-footer">
									<button className="btn btn-secondary" onClick={() => setShowModal(false)}>No</button>
									<button className="btn btn-primary" onClick={handleConfirm}>Yes</button>
								</div>

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

			</Page>
		</PageWrapper>
	);
}