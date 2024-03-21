import { useState } from "react";

interface UserInfo {
  avatar: string;
  name: string;
  screenName: string;
}

export const useChiptestModel = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserInfo[]>([]);

  const handleEnterUser = async (screenName: string) => {
    const user = users.find((user) => user.screenName === screenName);
    if (user) {
      setUserInfo(user);
      return;
    }

    setLoading(true);
    try {
      const user = await mockFetch(screenName);
      setUserInfo(user);
      setUsers((users) => users.concat(user));
    } finally {
      setLoading(false);
    }
  };

  const clearUser = () => setUserInfo(null);

  return { users, userInfo, loading, handleEnterUser, clearUser };
};

const fetchUsers: UserInfo[] = [
  {
    screenName: "kiroti",
    name: "Kirill",
    avatar:
      "https://sun9-35.userapi.com/impg/K-lCvB9fz_N1Xl2B4sk9u-S3SVEIcb19xhplyw/5jDwMlnwn0A.jpg?size=1216x2160&quality=95&sign=f25c97fd609f4b71d4dda81917b471c0&type=album",
  },
  {
    screenName: "nlo",
    name: "Mauser",
    avatar:
      "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/12/the-x-files-samantha-mulder.jpg",
  },
  {
    screenName: "cat",
    name: "Murka",
    avatar:
      "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
  },
];

const usersMap = new Map<UserInfo["screenName"], UserInfo>(
  fetchUsers.map((userInfo) => [userInfo.screenName, userInfo])
);

const mockFetch = (screenName: string) =>
  new Promise<UserInfo>((res, rej) =>
    setTimeout(() => {
      const user = usersMap.get(screenName);
      if (!user) {
        return rej("not found");
      }
      res(user);
    }, 2_000)
  );
