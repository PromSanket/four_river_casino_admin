import React, { FC, startTransition, useCallback, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';
import { getUserDataWithUsername, IUserProps } from '../../../common/data/userDummyData';
import USERS from '../../../common/data/userDummyData';

interface ILoginProps {}
const Login: FC<ILoginProps> = () => {
	const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();

	// Set default credentials in localStorage on component mount
	useEffect(() => {
		if (!localStorage.getItem('defaultCredentials')) {
			localStorage.setItem('defaultCredentials', JSON.stringify({
				email: 'john@omtanke.studio',
				password: '@ABC123'
			}));
		}
	}, []);

	const usernameCheck = (username: string) => {
		const user = getUserDataWithUsername(username);
		if (user) return true;
		
		// Also check if the input matches any user's email
		const users = Object.values(USERS) as IUserProps[];
		return users.some((user: IUserProps) => user.email === username);
	};

	const passwordCheck = (username: string, password: string) => {
		// First try to find user by username
		let user = getUserDataWithUsername(username);
		
		// If not found, try to find by email
		if (!user) {
			const users = Object.values(USERS) as IUserProps[];
			const foundUser = users.find((u: IUserProps) => u.email === username);
			return !!foundUser && foundUser.password === password;
		}
		
		return user.password === password;
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = 'Email is required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Password is required';
			}

			return errors;
		},
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			console.log('LOGIN CLICKED');
			
			// Clear previous errors
			formik.setErrors({});
			
			// Check if username exists
			if (!usernameCheck(values.loginUsername)) {
				formik.setFieldError('loginUsername', 'No such user found in the system.');
				return;
			}
			
			// Check if password matches
			if (!passwordCheck(values.loginUsername, values.loginPassword)) {
				formik.setFieldError('loginPassword', 'Email and password do not match.');
				return;
			}
			
			// If both checks pass, proceed with login
			if (setUser) {
				// Find the actual user data to get the username
				let user = getUserDataWithUsername(values.loginUsername);
				
				// If not found by username, try to find by email
				if (!user) {
					const users = Object.values(USERS) as IUserProps[];
					const foundUser = users.find((u: IUserProps) => u.email === values.loginUsername);
					if (foundUser) {
						setUser(foundUser.username);
					} else {
						setUser(values.loginUsername);
					}
				} else {
					setUser(user.username);
				}
			}
			console.log("Navigating to dashboard...");
			startTransition(() => {
				navigate('/');
			});
		},
	});

	return (
		<PageWrapper
			isProtected={false}
			title='Login'
			className={classNames({ 'bg-dark': true })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}
										aria-label='Facit'>
										<Logo width={200} />
									</Link>
								</div>
								
								<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
								<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>

								<form className='row g-4' onSubmit={formik.handleSubmit}>
									<div className='col-12'>
										<FormGroup
											id='loginUsername'
											isFloating
											label='Your email'>
											<Input
												type='email'
												autoComplete='email'
												value={formik.values.loginUsername}
												isTouched={formik.touched.loginUsername}
												invalidFeedback={formik.errors.loginUsername}
												isValid={!formik.errors.loginUsername && formik.touched.loginUsername}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup
											id='loginPassword'
											isFloating
											label='Password'>
											<Input
												type='password'
												autoComplete='current-password'
												value={formik.values.loginPassword}
												isTouched={formik.touched.loginPassword}
												invalidFeedback={formik.errors.loginPassword}
												isValid={!formik.errors.loginPassword && formik.touched.loginPassword}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormGroup>
									</div>
									<div className='col-12 text-center'>
										<Link
											// to='/forgot-password'
											to=''
											className={classNames('text-decoration-none', {
												'text-light': darkModeStatus,
												'text-dark': !darkModeStatus,
											})}>
											Forgot Password?
										</Link>
									</div>
									<div className='col-12'>
										<Button
											type='submit'
											color='warning'
											className='w-100 py-3'>
											Submit
										</Button>
									</div>
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': true,
								})}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': true,
								})}>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {};
Login.defaultProps = {};

export default Login;
