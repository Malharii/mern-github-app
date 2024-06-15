import User from "../models/user.model.js";

export const getUserProfileAndRepose = async (req, res) => {
  const { username } = req.params;
  try {
    // 60 requests per hour, 5000 requests per hour for authenticated requests
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const userProfile = await userRes.json();

    const repoRes = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await repoRes.json();

    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString());
    console.log(user, "user auth");
    const userTolike = await User.findOne({ username });
    if (!userTolike) {
      return res.status(404).json({ error: "User not a member" });
    }

    if (!user.likes.includes(userTolike.username)) {
      return res.status(400).json({ error: "User already liked" });
    }
    userTolike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });
    user.likesProfiles.push(userTolike.username);
    await Promise.all([userTolike.save(), user.save()]);
    res.status(200).json({ message: "User liked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
