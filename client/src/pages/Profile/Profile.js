import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImgs from '../../assets/avatarr.png';
import Card from '../../components/card/Card';
import { getUser } from '../../redux/features/auth/authSlice'; // Import your action creator
import './Profile.css';
import PageMenu from '../../components/pageMenu/PageMenu';
import { toast } from "react-toastify";

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

function Profile() {
  const dispatch = useDispatch();

  // Fetch user data from Redux state
  const { isLoading, isLoggedIn, isSuccess, user } = useSelector(
    (state) => state.auth);

  // Initialize profile state
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    dispatch(getUser());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  
  };

  return (
    <>
      <section>
        <PageMenu />
        <div className="container">
          <h2>Profile</h2>
          <div className="profile">
            <Card cardClass={'card'}>
              <>
                <div className="profile-photo">
                  <div>
                    <img src={imagePreview === null ? user?.photo : imagePreview} alt="Profile Image" />
                    <h3>Role : {user?.role } </h3>
                  </div>
                </div>
                <form>
                  <p>
                    <label>Change Photo :</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </p>
                  <p>
                    <label>Name:</label>
                    <input type="text" name="name" value={profile?.name} onChange={handleInputChange} />
                  </p>

                  <p>
                    <label>Email:</label>
                    <input type="text" name="email" value={profile?.email} onChange={handleInputChange} disabled />
                  </p>

                  <p>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={profile?.phone} onChange={handleInputChange} />
                  </p>

                  <p>
                    <label>Bio:</label>
                    <textarea name="bio" cols={30} rows={10} value={profile?.bio} onChange={handleInputChange} />
                  </p>
                  <button className="form-btn " style={{ display: 'block', marginLeft: '40px', width: '340px' }}>Update</button>
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
