import type { User } from "../users.types";
 
 
import UsersActionsDropdown from "./UsersActionDropDown";

interface Props {
  users: User[];
}

export default function UsersTable({ users }: Props) {
   

  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left hidden lg:table-cell">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3 hidden lg:table-cell">{user.email}</td>
              <td className="p-3">{user.role}</td>

              <td className="p-3">
  <UsersActionsDropdown user={user} />
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
