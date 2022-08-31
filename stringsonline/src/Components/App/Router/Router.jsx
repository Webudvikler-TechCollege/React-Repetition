import { Routes, Route } from 'react-router-dom'
import { Home } from '../../Pages/Home/Home'
import { Login } from '../../Pages/Login/Login'
import { Extranet } from '../../Pages/Extranet/Extranet'
import { Search } from '../../Pages/Search/Search'
import { ProductList } from '../../Pages/Products/ProductList'
import { ProductDetails } from '../../Pages/Products/ProductDetails'

// Function Component til router
export const AppRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />}></Route>
			<Route path="/products">
				<Route index element={<ProductList />}></Route>
				<Route path=":group_id">
					<Route index element={<ProductList />}></Route>
					<Route path=":product_id" element={<ProductDetails />}></Route>
				</Route>
			</Route>
			<Route path="/search" element={<Search />}></Route>
			<Route path="/extranet" element={<Extranet />}></Route>
			<Route path="/login" element={<Login />}></Route>
		</Routes>
	)
}