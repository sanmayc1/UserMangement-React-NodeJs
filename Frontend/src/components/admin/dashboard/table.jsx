import { Edit, Trash, User } from "lucide-react";
import { DataBase } from "../../../api/axios";

const Table = ({ users, setUsers, setEditOpen, setUserDetails }) => {
  //delete user
  const deleteUser = async (id, path) => {
    try {
      const response = await DataBase.post("admin/deleteuser", { id, path });
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {}
  };

  //user edit
  const openEdit = (user) => {
    setEditOpen(true);
    setUserDetails(user);
  };
  return (
    <table className="w-full overflow-auto">
      <thead>
        <tr className="border-b border-gray-700">
          <th></th>
          <th className="text-left py-4 pr-6 text-gray-400 font-medium">
            Name
          </th>
          <th className="text-left py-4 px-6 text-gray-400 font-medium">
            Email
          </th>
          <th className="text-left py-4 px-6 text-gray-400 font-medium">
            Phone
          </th>
          <th className="text-left py-4 px-6 text-gray-400 font-medium">
            Last Login
          </th>
        </tr>
      </thead>

      <tbody className="text-white">
        {users &&
          users.map((user) => {
            return (
              <tr key={user._id}>
                <td className="py-4 pl-6 ">
                  {user.profilePic ? (
                    <img
                      className="max-w-9 rounded-full "
                      src={`http://localhost:8080/${user.profilePic}`}
                      alt=""
                    />
                  ) : (
                    <User className="box-content p-2 rounded-full bg-gray-950" />
                  )}
                </td>
                <td className="py-4 pr-6 ">{user.username}</td>
                <td className="py-4 px-6 ">{user.email}</td>
                <td className="py-4 px-6">{user.phone}</td>
                <td className="py-4 px-6">{user.lastlogin}</td>
                <td>
                  <Edit
                    onClick={() => openEdit(user)}
                    width={17}
                    className="hover:text-blue-500"
                  />
                </td>
                <td onClick={() => deleteUser(user._id, user.profilePic)}>
                  <Trash width={17} className="hover:text-red-500" />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default Table;
