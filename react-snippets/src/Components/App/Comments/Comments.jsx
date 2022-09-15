import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Auth/Auth'

const Comments = () => {
  return <div></div>
}

const CommentsForm = ({product_id}) => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm()
	const { loginData } = useAuth()

	const submitForm = async (data, e) => {
		const endpoint = 'https://api.mediehuset.net/snippets/comments';
		const options = {
			headers: {
				Authorization: `Bearer ${loginData.access_token}`
			}
		}

		const formData = new FormData(e.target)
		const result = await axios.post(endpoint, formData, options)
		if(result.data.status) {
			console.log(result);
			navigate("/comments/response", { replace: true });
		}
	}

	return (
		<form onSubmit={handleSubmit(submitForm)}>
			<input type="hidden" value={product_id} {...register('item_id')} />
			<div>
				<label htmlFor="title">Emne</label>
				<input type="text" {...register('title', { required: true })} />
			</div>
			<div>
				<label htmlFor="comment">Kommentar</label>
				<textarea {...register('comment', { required: true })} />
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	)
}

const CommentsList = () => {
  return <div>Comments</div>
}

const CommentsResponse = () => {
	return (
		<h1>Tak for din kommentar</h1>
	)
}

export { Comments, CommentsForm, CommentsList, CommentsResponse }
