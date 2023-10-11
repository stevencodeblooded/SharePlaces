import React from "react";

import { Link } from "react-router-dom";
import profileImage1 from '../assets/profile1.jpg'
import profileImage2 from '../assets/profile2.jpg'
import profileImage3 from '../assets/profile3.png'
import "./UserCard.css";

const UserCard = () => {

    //Dummy Users
  const USERS = [
    {
        uid: 1,
        name: "Steven Ochieng",
        profileImage: profileImage1,
        placesVisited: 3,
    },
    {
        uid: 2,
        name: "Clinton Odhiambo",
        profileImage: profileImage2,
        placesVisited: 1,
    },
    {
        uid: 3,
        name: "Erine Auma",
        profileImage: profileImage3,
        placesVisited: 4,
    },
  ];

  if (USERS.length  === 0 ) {
    return <h1>No User Was Found</h1>
  }

  return (
    <div className="users-list">

        {USERS.map((user) => {
          return (
            <Link to={`${user.uid}/Places`} className="userlink" key={user.uid}>
                <div className="one-user">
                    <img src={user.profileImage} alt="Profile" className="picture-for-profile" />
                    <div className="name-places">
                        <h3>{user.name}</h3>
                        <p>{user.placesVisited} {user.placesVisited === 1 ? 'place visited' : 'places visited' }</p>
                    </div>
                </div>
            </Link>
          );
        })}

    </div>
  );
};

export default UserCard;
