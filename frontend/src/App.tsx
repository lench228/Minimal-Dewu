import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav/nav';
import Layout from './components/layout/layout';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}/>
      <Route path="cart" element={<div>Cart</div>}/>
		</Routes>
	</BrowserRouter>
);

export default App;