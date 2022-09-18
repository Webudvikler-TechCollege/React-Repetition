import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../App/Auth/Auth"
import { Login } from "../Login/Login"

const AdmCommentList = () => {
  const { loginData } = useAuth()
  const { product_id } = useParams()
  const navigate = useNavigate()
  const [commentData, setCommentData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`
        }
      }
      try {
        const endpoint = `https://api.mediehuset.net/snippets/comments/admin`
        const result = await axios.get(endpoint, options)
        if(result.data.items) {
          setCommentData(result.data.items.reverse())
        }
  
      } catch(err) {
        console.error(`Fejl i fetch af admin data: ${err}`);
      }
    }
    if(loginData.access_token) {
      getData()
    }
  }, [loginData.access_token, product_id])

  const deleteComment = async (comment_id) => {
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`
      }
    }    

    if(window.confirm('Vil du slette denne post?')) {
      const endpoint = `https://api.mediehuset.net/snippets/comments/${comment_id}`
      const result = await axios.delete(endpoint, options)
      if(result.status) (
        navigate(`/admin`, { replace: true })
      )

    }
  }

  return loginData.access_token ? (
    <table border="1">
		<thead>
		<tr>
			<th>Handling</th>
			<th>Emne</th>
		</tr>
		</thead>
		<tbody>
      {commentData &&
        commentData.map(item => {			
          return (
			<tr key={item.id}>
		  		<td>
					<span title="Rediger">
						<Link to={`/admin/${item.id}`}>&#9998;</Link>
					</span>
					<span title="Slet">
						<Link to="#" onClick={() => deleteComment(item.id)}>&#128465;</Link>
					</span>
				</td>
		  		<td>{item.title}</td>
			</tr>
		  )
        })}
		</tbody>
    </table>
  ) : (
    <>
      <p>Du skal være logget for at se admin</p>
      <Login />
    </>
  )
}

export default AdmCommentList
