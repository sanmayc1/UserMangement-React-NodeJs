import { useEffect, useState } from "react";
import Table from "./table";
import Header from "./header";
import TableHeader from "./tableHeader";
import { DataBase } from "../../../api/axios";
import CreateUserModal from "./modals/createUserModal.jsx";
import EditUserModal from "./modals/editUserModal.jsx";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users,setUsers] = useState([])
  const [filteredUser ,setFilteredUser]=useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen,setEditOpen] = useState(false);
  const [userDetails,setUserDetails]=useState({})
  
  ///fetching users 
  useEffect(()=>{
    const fecthUsers =async()=>{
     const response = await DataBase.get('admin/usersdata')
     setUsers(response.data.users)
     setFilteredUser(response.data.users)
    }
    fecthUsers()
    const interval = setInterval(fecthUsers,30000)
    return ()=> clearInterval(interval)
  },[])


  ///Search option

  const filterBySearch=()=>{
    if(searchTerm.trim()){
      const filtered = users.filter((user)=>{
        return user.username.toLowerCase().startsWith(searchTerm.toLowerCase()) || user.email.toLowerCase().startsWith(searchTerm.toLowerCase())
      })
      setFilteredUser(filtered)
    }else{
      setFilteredUser(users)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <main className="p-6">
        <div className="bg-gray-800 rounded-xl shadow-xl">
          <TableHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterBySearch={filterBySearch} setIsOpen={setIsOpen} />
          <Table users={filteredUser} setUsers={setUsers} setUserDetails={setUserDetails} setEditOpen={setEditOpen}  />
        </div>
      </main>
      <CreateUserModal isOpen={isOpen} setIsOpen={()=>setIsOpen(false)} />
      <EditUserModal isOpen={editOpen} setIsOpen={setEditOpen} userDetails={userDetails}/>
    </div>
  );
};

export default AdminDashboard;
