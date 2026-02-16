import EditUserModal from "./EditUserModal";
import DeleteUserDialog from "./DeleteUserDialog";
import type { User } from "../users.types";
import { Button } from  "../../../components/ui/button"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export default function UsersActionsDropdown({ user }: { user: User }) {
  const currentUser = useSelector((s: RootState) => s.auth.user);

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        {/* Edit */}
        <DropdownMenuItem  asChild onSelect={(e) => e.preventDefault()}>
          <div>
            <EditUserModal user={user} />
          </div>
        </DropdownMenuItem>

        {/* Delete */}
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
          <div>
            <DeleteUserDialog
              id={user.id}
              disabled={currentUser?.id === user.id}
            />
          </div>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
