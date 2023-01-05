import { LogoIcon } from "./assets/icons"
import CrudUser from "./components/CrudUser"
import "./styles/App.css"
import 'bootstrap/dist/css/bootstrap.css';
function App() {
	return (
		<>
			<header>
				<div className='header__content'>
					<div className='logo'>
						<LogoIcon />
						<strong>JSON SERVER API With React-redux-toolkit</strong>
					</div>
				</div>
			</header>
			<main>
				<CrudUser />
			</main>
		</>
	)
}

export default App
