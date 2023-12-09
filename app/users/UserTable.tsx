import React from "react";
import Link from "next/link";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props{
  sortOrder : string
}

const UserTable = async ({sortOrder}:Props) => {
  //nextjs otomatik olarak datayı catchler options ile bunu kontrol edebiliriz.
  /*
cache:'no-store' datayı tutmaz 
revalidate: 10 nextjs datayı 10saniyede bir yeniler arka planda
bu durum sadece fetch için geçerli örneğin axiosta yok
statik olan datalar tekrar renderlanmazlar
*/
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();
  
  const sortedUsers = sort(users).asc(sortOrder === 'email' ? user => user.email : user => user.name);

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th><Link href="/users?sortOrder=name">Name</Link></th>
            <th><Link href="/users?sortOrder=email">Email</Link></th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
