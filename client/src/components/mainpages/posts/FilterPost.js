import React,{useContext,useEffect} from 'react';
import {GlobalState} from '../../../GlobalState'
import { Link } from 'react-router-dom';

function FilterPost() {
    const state = useContext(GlobalState)
    const [topics] = state.topicsAPI.topics
    const [filter, setFilter] = state.myPostsAPI.filter
    const [all, setALL] = state.myPostsAPI.all
    const [numPostByTopic, setNumPostByTopic] = state.myPostsAPI.numPostByTopic
    const [location, setLocation] = state.userAPI.location

    



    const handleFilter = async (text) => {
        if(location !== '/news')
        {
            localStorage.setItem('text', text)
            window.location.href = "/news";
        }
        else if(location === '/news'){
            localStorage.removeItem('text')
            setFilter(text)
            console.log({filter})
            console.log({text})
        }

    }

/*     const handleFilterAll = async (text) => {
        if(location === '/news')
        {
            localStorage.removeItem('text')
            setFilter(text)
            console.log({filter})
            console.log({text})
        }
    } */
    return (
        <>
        <h1 className='mt-20 text-4xl'>Chuyên mục</h1>
        <ul className="px-4 py-6 bg-white rounded-lg shadow-md">
        <Link onClick={() => handleFilter("")}>
            <li className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                <Link className="flex items-center text-gray-600 cursor-pointer">
                    <span className="inline-block h-4 w-4 bg-pink-400 mr-3" />
                    Tất cả bài viết
                    <span className="text-gray-500 ml-auto">{all} bài viết</span>
                    <i className="text-gray-500 bx bx-right-arrow-alt ml-1" />
                </Link>
           </li>
        </Link>
                            
        {
            topics.map(topic => (
                <Link onClick={() => handleFilter("?topic="+topic._id)}  value={"topic=" + topic._id} key={topic._id}>
                    <li className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                        <Link className="flex items-center text-gray-600 cursor-pointer">
                             <span className="inline-block h-4 w-4 bg-pink-400 mr-3" />
                                {topic.name}
                             <span className="text-gray-500 ml-auto" value={topic._id}>{numPostByTopic.find(_=>_._id === topic._id) && numPostByTopic.find(_=>_._id === topic._id).count || 0} bài viết</span>
                             <i className="text-gray-500 bx bx-right-arrow-alt ml-1" />
                        </Link>
                    </li>
                </Link>
            ))
         }
        </ul>
        </>
    );
}

export default FilterPost;