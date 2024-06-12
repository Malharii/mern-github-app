import { useState, useEffect, useCallback } from "react";

import toast from "react-hot-toast";

import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndReos = useCallback(async (username = "malharii") => {
    setLoading(true);
    setRepos([]);
    try {
      //60 req per hour , 5000 req per hour for athentication request

      //  https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
      const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
        },
      });
      const userProfile = await res.json();
      setUserProfile(userProfile);
      const repoRes = await fetch(userProfile.repos_url);
      const repos = await repoRes.json();
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
      setRepos(repos);
      console.log("userProfile", userProfile);
      console.log("repos", repos);
      return { userProfile, repos };
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getUserProfileAndReos();
  }, [getUserProfileAndReos]);

  const onSearch = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const { userProfile, repos } = await getUserProfileAndReos(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count); // descending ,most stars first
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count); // descending ,most forks first
    }

    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />

      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}

      <div className="flex flex-col gap-4 lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {repos.length > 0 && !loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
