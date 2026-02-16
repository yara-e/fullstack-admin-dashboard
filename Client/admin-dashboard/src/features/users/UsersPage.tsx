import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import UsersTable from "./components/UsersTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import UsersSkeleton from "./components/UsersSkeleton";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>();
  const [after, setAfter] = useState<string>();
  const [before, setBefore] = useState<string>();

  const { data, isLoading } = useUsers({
    limit: 5,
    search,
    role,
    after,
    before,
  });

  const resetCursor = () => {
    setAfter(undefined);
    setBefore(undefined);
  };

  return (
    <div className="space-y-6  ">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Users Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 ">

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetCursor();
              }}
              className="md:w-72"
            />

 <Select
 
        value={role}
        onValueChange={(value) => {
          setRole(value === "ALL" ? undefined : value);
          resetCursor();
        }}
        
      >
              <SelectTrigger className="md:w-72">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {isLoading ? (
            <UsersSkeleton />
          ) : (
            <>
            
              <UsersTable users={data?.data ?? []} />
              

              {/* Pagination */}
              <div className="flex justify-between ">
                <Button
                   
                  disabled={!data?.meta.prevCursor}
                  onClick={() => {
                    setBefore(data?.meta.prevCursor ?? undefined);
                    setAfter(undefined);
                  }}
                >
                  Previous
                </Button>

                

                <Button
                  
                  disabled={!data?.meta.nextCursor}
                  onClick={() => {
                    setAfter(data?.meta.nextCursor ?? undefined);
                    setBefore(undefined);
                  }}
                > 
                  Next
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
