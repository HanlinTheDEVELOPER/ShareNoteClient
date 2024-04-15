import { Stack } from "@chakra-ui/react";
import ProfileSection from "../../components/user/Profile";
import { useSearchParams } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../lib/Api/userApi";
import { useAuthStore } from "../../store/authStore";

const Profile = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const userSlug = searchParams.get("user");
  const user = useUserStore((state) => state.user);
  const auth = useAuthStore((state) => state.auth);
  const isMyProfile = userSlug === user?.slug;

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(auth?.id, userSlug),
    enabled: !isMyProfile,
  });

  //TODO To place skeleton upon status value

  const userData = isMyProfile ? user : profile;
  return (
    <Stack>
      <ProfileSection user={userData} isMyProfile={isMyProfile} />
    </Stack>
  );
};

export default Profile;
