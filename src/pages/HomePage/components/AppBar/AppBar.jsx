import styles from "./AppBar.module.scss";
import { ReactComponent as BellIcon } from "../../../../assets/icons/bell_icon.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/search_icon.svg";
import UserImage from "../../../../assets/icons/user_image.png";

function AppBar() {
  const profilePic = localStorage.getItem("listed-profilePic");

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>

      <div className={styles.rightItems}>
        <form>
          <input type="search" placeholder="Search..." />
          <button type="submit">
            <SearchIcon />
          </button>
        </form>
        <BellIcon />
        <img src={profilePic ?? UserImage} alt="user" className={styles.profilePic} />
      </div>
    </div>
  );
}

export default AppBar;
