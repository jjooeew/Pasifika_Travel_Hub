import React from "react";
import PostFeed from "../components/PostFeed/PostFeed";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import "./ProfilePage.css";

function Profile() {
  return (
    <div className="app">
      <div className="profile-page">
        <ProfileCard />

        <div className="experiences">
          <h1 className="experiences__title">My Experiences</h1>
          <PostFeed />
        </div>
      </div>
    </div>
  );
}

export default Profile;
