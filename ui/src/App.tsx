import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tree from './components/tree/tree';
import Header from './components/header/header';
import {
	Routes,
	Route,
} from "react-router-dom";

import LoginPage from './components/pages/loginPage';
import DefaultPage from './components/pages/defaultPage';
import RegistrationPage from './components/pages/registrationPage';
import GenericPage from './components/pages/genericPage';

import AuthProvider from './auth/provider';
import RequireAuth from './auth/requireAuth';

function App() {

	return (
		<AuthProvider>
			<Container className="App">
				<Stack direction="row">
					<Tree></Tree>
					<Stack>
						<Header></Header>
						<Routes>
							<Route path="/" element={<DefaultPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<RegistrationPage />} />
							<Route path="/:pageid" element=
								{
									<RequireAuth>
										<GenericPage />
									</RequireAuth>
								}
							/>
						</Routes>
					</Stack>
				</Stack>
			</Container>
		</AuthProvider>
	);
}

export default App;
