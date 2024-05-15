import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Stores/project/auth";
import { MerchantLogin, useStoreProfile } from "../hooks/useMerchant";
import MerchantProfile from "../components/MerchantProfile";
import UserProfile from "../components/UserProfile";

export default function Profile() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const user = useSelector(selectUser);
  const isOwner = user?.email === email && user?.isMerchant;
  const isLogin = user?.email;
  const { data } = useStoreProfile(email);
  const profile = data?.data;
  const navigate = useNavigate();
  if (!isLogin) {
    navigate("/login");
  }
  return (
    <div className="container">
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        {" "}
        <Navbar logo={profile?.storeName} logoLink={`/store?email=${email}`} />
        {isOwner ? <MerchantProfile /> : <UserProfile />}
      </div>
    </div>
  );
}
