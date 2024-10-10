import React, { useEffect, useState } from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { accessUseListLoading, accessUseListSucess, accessUserListFailed } from '../../../../redux/admin/adminSlice'
import { RootState } from '../../../../app/user/store'
import { currentUserType } from '../../../../type/type'

const Home = () => {
  const [editUserData, setEditUserData] = useState<currentUserType | undefined>()
  const [isModalOpen , setIsModalOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    getUserList()
  },[])
  const getUserList = async ()=>{
    dispatch(accessUseListLoading())
   try{
    const res = await fetch('http://localhost:8000/api/admin/get-user-list',{
      method: 'GET',
      credentials:'include'
    })
    const data = await res.json()
    if(!res.ok)
    dispatch(accessUserListFailed(res.statusText))
    else 
    {
      console.log(data.data)
      dispatch(accessUseListSucess(data.data))
    }

   }catch(err){
    console.log(err);
    dispatch(accessUserListFailed(err))
   }
  }

  const handleEditUser = (data:currentUserType)=>{
    console.log("inside",data)
    setEditUserData(data);
    console.log("user ================== > ", editUserData)
    setIsModalOpen(true)
  }
const handleUserUpdate = ()=>{

}

  const { userDetails}  = useSelector((state:RootState)=>state.admin)
  console.log(userDetails,"userDetails")
  return (
    <div className='home-container h-[100vh]'>
      <nav className=' p-3 pr-12 '>
        <h1 className='text-end text-3xl font-bold'>STD.</h1>
      </nav>
      <div className="userList w-[90%] mx-auto mt-5 p-8 bg-white rounded">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div>
              <button id="dropdownActionButton" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                Add User
              </button>
              
            </div>
            <label className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {
                userDetails.map((data:currentUserType)=>{
                  return(
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={data._id}>
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img className="w-10 h-10 rounded-full" src={data.profilePic} alt="Jese image" />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{data.userName}</div>
                  </div>  
                </th>
                <td className="px-6 py-4">
                {data.userEmail}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=> handleEditUser(data)}>Edit user</button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><i className="fa-solid fa-trash text-red-700"></i></button>
                </td>
              </tr>
                  )
                })
              }
              
              
            </tbody>
          </table>
        </div>


        {isModalOpen && editUserData && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal Content */}
              <div className="p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Edit User: {editUserData.userName}
                </h3>

                {/* Edit User Form */}
                <form onSubmit={handleUserUpdate}>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username:</label>
                    <input
                      type="text"
                      className="block w-full mt-1 rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={editUserData.userName}
                      onChange={(e) => setEditUserData({ ...editUserData, userName: e.target.value })}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
                    <input
                      type="email"
                      className="block w-full mt-1 rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={editUserData.userEmail}
                      onChange={(e) => setEditUserData({ ...editUserData, userEmail: e.target.value })}
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                      onClick={() => setIsModalOpen(false)} // Close modal on cancel
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
   
      </div>
    </div>
  )
}

export default Home;
