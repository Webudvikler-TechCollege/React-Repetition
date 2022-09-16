import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../../App/Auth/Auth"
import { Login } from "../Login/Login"

const AdmCommentList = () => {
  const { loginData } = useAuth()
  const { product_id } = useParams()
  const [commentData, setCommentData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://api.mediehuset.net/homelands/reviews`
      const result = await axios.get(endpoint)
      setCommentData(result.data.items.reverse())
    }
    getData()
  }, [product_id])

  return loginData.access_token ? (
    <table border="1">
		<thead>
		<tr>
			<th>Handling</th>
			<th>Emne</th>
			<th>Bruger</th>
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
						<Link to={''}>&#128465;</Link>
					</span>
				</td>
		  		<td>{item.title}</td>
		  		<td>{item.user.username}</td>
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
