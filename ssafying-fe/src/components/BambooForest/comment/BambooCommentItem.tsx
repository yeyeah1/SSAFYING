import styled from "styled-components";
import deleteBtn from "../../../assets/img/imgBtn/deleteBtn.svg";
import ImgBtn from "../../Feed/utils/ImgBtn";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/reducers/user";
import { deleteBambooComment } from "../../../apis/api/Forest";

interface CommentProps {
  commentId: number;
  content: string;
  userId: number;
  onDelete: (id: number) => void;
}

function BambooCommentItem({
  commentId,
  content,
  userId,
  onDelete,
}: CommentProps) {
  const user = useAppSelector(selectUser);

  async function clickDeleteBtn() {
    await onDelete(commentId);
  }

  return (
    <>
      <UserWrapper>
        <CommentContent>
          <Content>{content}</Content>
        </CommentContent>
        <ButtonsWrapper>
          {userId === user.userId && (
            <ImgBtn src={deleteBtn} onClick={clickDeleteBtn} size="15px" />
          )}
        </ButtonsWrapper>
      </UserWrapper>
    </>
  );
}

export default BambooCommentItem;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  padding: 8px;
  border-bottom: 1px solid lightgray;
`;

const CommentContent = styled.div``;

const Content = styled.div`
  font-size: 14px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
