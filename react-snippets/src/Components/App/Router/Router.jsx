import { Routes, Route } from 'react-router-dom'
import { Home } from '../../Pages/Home/Home'
import { Login } from '../../Pages/Login/Login'
import { Extranet } from '../../Pages/Extranet/Extranet'
import { CommentsResponse } from '../Comments/Comments'
import { ProductDetails } from '../../Pages/Products/ProductDetails'
import { Products } from '../../Pages/Products/Products'

// Function Component til router
export const AppRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />}></Route>
			<Route path="/products">
				<Route index element={<Products />}></Route>
				<Route path=":product_id" element={<ProductDetails />}></Route>
			</Route>
			<Route path="/comments/response" element={<CommentsResponse />}></Route>
			<Route path="/extranet" element={<Extranet />}></Route>
			<Route path="/login" element={<Login />}></Route>
		</Routes>
	)
}