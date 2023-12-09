import React, { Suspense } from "react";
import UserTable from "./UserTable";

interface Props{
  searchParams : {sortOrder:string}
}

//suspense sayesinde herhangi bir şey load olurken animasyon koyabiliyoruz

const UsersPage = async ({searchParams:{sortOrder}}: Props) => {
  return (
   <>
   <Suspense fallback = {<p>loading...</p>}>
    <UserTable sortOrder = {sortOrder}></UserTable>
    </Suspense>
   </>
  );
};

export default UsersPage;
