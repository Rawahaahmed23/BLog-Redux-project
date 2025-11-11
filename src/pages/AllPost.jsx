import { useState,useEffect } from "react";
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard'
import service from "../appwrite/config";




function AllPost() {
    const [post ,setpost] = useState([])
    useEffect(()=>{
        service.getAllPost([]).then((post)=>{
            if(post){
                setpost(post.documents)
            } else{
                console.log('error from poist');
                
            }
        })
    },[])
  return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">

            {post.map((post)=>(
                <div key={post.$id} className="p-2 w-1/4">
                    <PostCard  {...post}/>
                </div>
            ))}
            </div>
        </Container>
      
    </div>
  )
}

export default AllPost

