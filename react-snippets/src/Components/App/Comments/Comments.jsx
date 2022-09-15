import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../Auth/Auth"

const CommentsForm = ({ product_id }) => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const { loginData } = useAuth()

  const submitForm = async (data, e) => {
    const endpoint = "https://api.mediehuset.net/snippets/comments"
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    }

    const formData = new FormData(e.target)
    console.log(...formData)
    const result = await axios.post(endpoint, formData, options)
    if (result.data.status) {
      navigate(`/comments/response/${data.product_id}`, { replace: true })
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input type="hidden" value={product_id} {...register("product_id")} />
      <div>
        <label htmlFor="title">Emne</label>
        <input type="text" {...register("title", { required: true })} />
      </div>
      <div>
        <label htmlFor="comment">Kommentar</label>
        <textarea {...register("comment", { required: true })} />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

const CommentsList = () => {
  const { product_id } = useParams()
  const [commentData, setCommentData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://api.mediehuset.net/snippets/comments/${product_id}`
      const result = await axios.get(endpoint)
      setCommentData(result.data.items.reverse())
    }
    getData()
  }, [product_id])

  return (
  	<div>
	{commentData && commentData.map(item => {
		return (
			<li key={item.id}>{item.title}</li>
		)
	})}
  	</div>
  )
}

const CommentsResponse = () => {
  return (
    <>
      <h1>Tak for din kommentar</h1>
      <CommentsList />
    </>
  )
}

export { CommentsForm, CommentsList, CommentsResponse }
