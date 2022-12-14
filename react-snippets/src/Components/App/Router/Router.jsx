import { Routes, Route } from 'react-router-dom'
import { Home } from '../../Pages/Home/Home'
import { Login } from '../../Pages/Login/Login'
import { Extranet } from '../../Pages/Extranet/Extranet'
import { CommentsResponse } from '../Comments/Comments'
import { ProductDetails } from '../../Pages/Products/ProductDetails'
import { Products } from '../../Pages/Products/Products'
import AdmCommentList from '../../Pages/Adminpanel/AdmCommentList'
import AdmCommentEdit from '../../Pages/Adminpanel/AdmCommentEdit'

// Function Component til router
export const AppRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />}></Route>
			<Route path="/products">
				<Route index element={<Products />}></Route>
				<Route path=":product_id" element={<ProductDetails />}></Route>
			</Route>
			<Route path="/comments/response/:product_id" element={<CommentsResponse />}></Route>
			<Route path="/extranet" element={<Extranet />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/admin" element={<AdmCommentList />}></Route>
			<Route path="/admin/:comment_id" element={<AdmCommentEdit />}></Route>
		</Routes>
	)
}