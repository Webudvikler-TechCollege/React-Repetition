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

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://api.mediehuset.net/snippets/comments/admin`
      const options = {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`
        }
      }

      try {
        if (loginData.access_token) {
          const result = await axios.get(`${endpoint}/${comment_id}`, options)
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

    const urlParams = new URLSearchParams()
    urlParams.append('id', data.id)
    urlParams.append('title', data.title)
    urlParams.append('comment', data.comment)
    const result = await axios.put(endpoint, urlParams, options)
    console.log(result);
    if (result.status) {
      navigate(`/admin`, { replace: true })
    }
  }

  return (
    loginData.access_token && (
      <form onSubmit={handleSubmit(submitForm)}>
        <input type="hidden" value={comment_id} {...register("id")} />
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
            defaultValue={commentData.comment}
            onChange={(e) => console.log(e.target.value)}
            {...register("comment", { required: true })}
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
