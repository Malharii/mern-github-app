import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";

const HomePage = () => {
  return (
    <div className="m-4">
      <Search />
      <SortRepos />
      <div className="flex flex-col gap-4 lg:flex-row justify-center items-start">
        <ProfileInfo />
        <Repos />
      </div>
    </div>
  );
};

export default HomePage;
