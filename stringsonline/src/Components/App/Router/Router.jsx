import { Routes, Route } from 'react-router-dom'
import { Home } from '../../Pages/Home/Home'
import { Login } from '../../Pages/Login/Login'
import { Products } from '../../Pages/Products/Products'

// Function Component til router
export const AppRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />}></Route>
			<Route path="/products">
				<Route index element={<Products />}></Route>
				<Route path=":group_id" element={<Products />}></Route>
			</Route>
			<Route path="/login" element={<Login />}></Route>
		</Routes>
	)
}