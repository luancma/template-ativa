import React from 'react';
import UserCell from './UserCell';


const UserList = ({users}) => (
  <div className="pt-2">
    {users.map((user, index) => (
      <UserCell key={user.id + index} user={user} />
    ))}
  </div>
);

export default UserList;
