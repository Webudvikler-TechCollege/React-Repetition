import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../App/Auth/Auth"

const AdmCommentEdit = () => {
  const { comment_id } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { loginData } = useAuth()
  const [commentData, setCommentData] = useState({})

  const [titleValue, setTitleValue] = useState("")

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://api.mediehuset.net/homelands/reviews`
      const options = {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      }

      try {
        if (loginData.access_token) {
          const result = await axios.get(`${endpoint}/${comment_id}`, options)
          //setCommentData(result.data);
          setCommentData(result.data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [comment_id, loginData.access_token])

  const submitForm = async (data, e) => {

    const endpoint = "https://api.mediehuset.net/snippets/comments"
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    }

    const formData = new FormData(e.target)
    console.log(...formData)
	/*
    const result = await axios.post(endpoint, formData, options)
    if (result.data.status) {
      navigate(`/comments/response/${data.product_id}`, { replace: true })
    }
	*/
  }

  return (
    loginData.access_token && (
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label htmlFor="title">Emne</label>
          <input
            type="text"
            defaultValue={commentData.title}
			onChange={(e) => console.log(e.target.value)}
            {...register("title", { required: true })}
          />
          {errors.title && <span>Du skal skrive en titel</span>}
        </div>
        <div>
          <label htmlFor="content">Kommentar</label>
          <textarea
            type="text"
            defaultValue={commentData.content}
			onChange={(e) => console.log(e.target.value)}
            {...register("content", { required: true })}
          />
          {errors.content && <span>Du skal skrive en kommentar</span>}
        </div>
        <div>
          <button>Send</button>
        </div>
      </form>
    )
  )
}
export default AdmCommentEdit
