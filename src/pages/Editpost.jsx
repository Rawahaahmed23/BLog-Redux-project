import { useEffect,useState } from "react";
import Container from "../components/Container/Container";
import PostForm from '../components/PostForm'
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";


function Editpost() {
  const [post,setpost]=useState(null)
  const {slug}= useParams()
  const navigate = useNavigate()
  useEffect(()=>{
     if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
  },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null

}

export default Editpost
