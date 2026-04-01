import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
} from '../../../layout/SubHeader/SubHeader';

export default function SettingsPage() {
	const [settings, setSettings] = useState({
		rakePercentage: 2.5,
		minimumBet: 1,
		withdrawalMinimum: 50,
		maximumAffiliate: 30,
		depositExpiryTime: 15,
		usdtDisplayRate: 5.12,
		communityRefreshTime: 10,
		minActiveUsers: 100,
		minTotalVolume: 5000,
		minHoursHosted: 20,
	});

	const handleInputChange = (field: string, value: string | number) => {
		setSettings(prev => ({
			...prev,
			[field]: value
		}));
	};

	const handleSave = () => {
		console.log('Saving settings:', settings);
		// API call here
	};

	return (
		<PageWrapper title='Settings'>
			<SubHeader>
				<SubHeaderLeft>
					<b>System Settings</b>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				{/* Financial Parameters */}
				<div className='card mb-3'>
					<div className='card-header'>
						<h5 className='mb-0'>Financial Parameters</h5>
						<small className='text-muted'>Core limits and percentages for transactions</small>
					</div>
					<div className='card-body'>
						<div className='row g-3'>
							<div className='col-md-6'>
								<label className='form-label'>Rake Percentage (%)</label>
								<div className='input-group'>
									<input
										type='number'
										className='form-control'
										value={settings.rakePercentage}
										onChange={(e) => handleInputChange('rakePercentage', parseFloat(e.target.value))}
										step='0.1'
									/>
									<span className='input-group-text'>%</span>
								</div>
								<div className='form-text'>Platform fee taken from each pot</div>
							</div>

							<div className='col-md-6'>
								<label className='form-label'>Minimum Bet Amount (USDT)</label>
								<input
									type='number'
									className='form-control'
									value={settings.minimumBet}
									onChange={(e) => handleInputChange('minimumBet', parseFloat(e.target.value))}
								/>
								<div className='form-text'>Lowest allowed wager per user</div>
							</div>

							<div className='col-md-6'>
								<label className='form-label'>Withdrawal Minimum Amount (USDT)</label>
								<input
									type='number'
									className='form-control'
									value={settings.withdrawalMinimum}
									onChange={(e) => handleInputChange('withdrawalMinimum', parseFloat(e.target.value))}
								/>
								<div className='form-text'>Minimum balance required to initiate withdrawal</div>
							</div>

							<div className='col-md-6'>
								<label className='form-label'>Maximum Affiliate (%)</label>
								<div className='input-group'>
									<input
										type='number'
										className='form-control'
										value={settings.maximumAffiliate}
										onChange={(e) => handleInputChange('maximumAffiliate', parseFloat(e.target.value))}
									/>
									<span className='input-group-text'>%</span>
								</div>
								<div className='form-text'>Maximum commission allowed for affiliates</div>
							</div>
						</div>
					</div>
				</div>

				{/* Time & Display Settings */}
				<div className='card mb-3'>
					<div className='card-header'> 
						<h5 className='mb-0'>Telegram BOT Settings</h5>
						<small className='text-muted'>Expiry limits and currency display preferences</small>
					</div>
					<div className='card-body'>
						<div className='row g-3'>
							{/* <div className='col-md-6'>
								<label className='form-label'>Deposit Intent Expiry Time (Minutes)</label>
								<div className='input-group'>
									<input
										type='number'
										className='form-control'
										value={settings.depositExpiryTime}
										onChange={(e) => handleInputChange('depositExpiryTime', parseInt(e.target.value))}
									/>
									<span className='input-group-text'>min</span>
								</div>
								<div className='form-text'>Time before an unpaid deposit request cancels</div>
							</div>

							<div className='col-md-6'>
								<label className='form-label'>USDT → BRL Display Rate</label>
								<div className='input-group'>
									<input
										type='number'
										className='form-control'
										value={settings.usdtDisplayRate}
										onChange={(e) => handleInputChange('usdtDisplayRate', parseFloat(e.target.value))}
										step='0.01'
									/>
									{/* <button className='btn btn-outline-secondary' type='button'>
										Sync Live Rate
									</button> */}
								{/* </div>
								<div className='form-text'>Fixed display rate for UI conversion</div>
							</div> */} 

							<div className='col-md-6'>
								<label className='form-label'>Community Group Refresh Time (Minutes)</label>
								<div className='input-group'>
									<input
										type='number'
										className='form-control'
										value={settings.communityRefreshTime}
										onChange={(e) => handleInputChange('communityRefreshTime', parseInt(e.target.value))}
									/>
									<span className='input-group-text'>min</span>
								</div>
								<div className='form-text'>Interval for refreshing community group data</div>
							</div>
						</div>
					</div>
				</div>

				{/* Host of the Week */}
				<div className='card mb-3'>
					<div className='card-header'>
						<h5 className='mb-0'>Host of the Week Thresholds</h5>
						<small className='text-muted'>Metrics required to qualify for weekly rewards</small>
					</div>
					<div className='card-body'>
						<div className='row g-3'>
							<div className='col-md-4'>
								<label className='form-label'>Min. Active Users</label>
								<input
									type='number'
									className='form-control'
									value={settings.minActiveUsers}
									onChange={(e) => handleInputChange('minActiveUsers', parseInt(e.target.value))}
								/>
							</div>

							<div className='col-md-4'>
								<label className='form-label'>Min. Total Volume ($)</label>
								<input
									type='number'
									className='form-control'
									value={settings.minTotalVolume}
									onChange={(e) => handleInputChange('minTotalVolume', parseInt(e.target.value))}
								/>
							</div>

							<div className='col-md-4'>
								<label className='form-label'>Min. Hours Hosted</label>
								<input
									type='number'
									className='form-control'
									value={settings.minHoursHosted}
									onChange={(e) => handleInputChange('minHoursHosted', parseInt(e.target.value))}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Save Button */}
				<div className='d-flex justify-content-end'>
					<button className='btn btn-primary' onClick={handleSave}>
						Save Changes
					</button>
				</div>
			</Page>
		</PageWrapper>
	);
}