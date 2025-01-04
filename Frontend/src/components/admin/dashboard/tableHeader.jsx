import {Users, Search, UserPlusIcon} from 'lucide-react'

const TableHeader = ({setSearchTerm,searchTerm,filterBySearch,setIsOpen})=>{

    const handleChange =(e)=>{
        setSearchTerm(e.target.value)
        

    }
    return(
        <div className="p-6 border-b border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </h2>
              </div>
              
              {/* Search */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyUp={filterBySearch}
                    className="bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className='flex justify-center items-center mr-3'>
                    <UserPlusIcon className='text-white hover:text-green-500 ' onClick={()=>setIsOpen(true)} />
                </div>
              </div>
              
            </div>
          </div>
    )
}

export default TableHeader