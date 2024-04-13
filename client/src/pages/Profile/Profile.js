import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImgs from '../../assets/avatarr.png';
import Card from '../../components/card/Card';
import {
  getUser,
  selectUser,
  updateUser,
} from "../../redux/features/auth/authSlice";

import './Profile.css';
import PageMenu from '../../components/pageMenu/PageMenu';
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import Notification from '../../components/notification/Notification';
import { Link } from 'react-router-dom';


const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_CLOUD_PRESET;


export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

function Profile() {


  const dispatch = useDispatch();
  //useRedirectLoggedOutUser("/login");

  
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

  //save data MongoDB
  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    
    try {
      if (profileImage !== null && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png")) {
        const formData = new FormData();
        
        formData.append("file", profileImage);
        formData.append("upload_preset", upload_preset); // Using the preset from .env
        formData.append("cloud_name", cloud_name); // Using the cloud name from .env
    
        // Upload image to Cloudinary
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
          method: "POST",
          body: formData
        });
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }
    
      // Save profile to MongoDB with image URL
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };
    
      dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
    }
  };
  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  return (
    <>
    {!profile.isVerified && <Notification />}
    
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
                    <h3>Role : {user?.role} </h3>
                  </div>
                </div>
                <form onSubmit={saveProfile}>
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
                  <div className='btnflexs'>
                  <button className="form-btn " style={{ display: 'block', marginLeft: '40px', width: '170px' }}>Update</button>
                  <Link to="/">
                  <button className="form-btn" style={{ display: 'block', marginLeft: '40px', width: '170px', backgroundColor: 'black' }}>Card Info</button>
                  </Link>
                  </div>
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);

  const username = user?.name || "...";

  return <p className="--color-black"> Hi, {shortenText(username, 9)} |</p>;
};


export default Profile;
