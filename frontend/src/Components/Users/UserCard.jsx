import React from "react";

import { Link } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ users }) => {

  const USERS = users.users

  if (USERS.length  === 0 ) {
    return <h1>No User Was Found</h1>
  }

  return (
    <div className="users-list">

        {USERS.map((user) => {
          let noPlaces = user.places.length 
          return (
            <Link to={`${user.id}/Places`} className="userlink" key={user.id}>
                <div className="one-user">
                    <img src={user.image} alt="Profile" className="picture-for-profile" />
                    <div className="name-places">
                        <h3>{user.name}</h3>
                        <p>{noPlaces} {noPlaces === 0 ? '- no place visited' : noPlaces === 1 ? 'place visited' : 'places visited'}</p>
                    </div>
                </div>
            </Link>
          );
        })}

    </div>
  );
};

export default UserCard;
