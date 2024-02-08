import styled from "styled-components";
import { useAppSelector } from "../../../store/hooks";
import BackBtnHeader from "../../Common/BackBtnHeader";
import { selectUser } from "../../../store/reducers/user";

function ProfileHeader() {
  const user = useAppSelector(selectUser);

  console.log(user);

  return (
    <StyledProfileHeader>
      <BackBtnHeader
        backLink="/feedhome"
        isCenter={true}
        text={user.nickname}
      />
    </StyledProfileHeader>
  );
}

export default ProfileHeader;

const StyledProfileHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #9a9a9a;
`;
