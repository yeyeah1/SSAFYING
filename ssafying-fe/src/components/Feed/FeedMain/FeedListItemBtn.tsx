import styled from "styled-components";
import likeBtn from "../../../assets/img/imgBtn/like.svg";
import likeFillRed from "../../../assets/img/imgBtn/likeFillRed.svg";
import saveBtn from "../../../assets/img/imgBtn/save.svg";
import commentBtn from "../../../assets/img/imgBtn/comment.svg";
import FeedLikeCnt from "./FeedLikeCnt";
import ImgBtn from "../utils/ImgBtn";
import CommentModal from "../Comment/CommentModal";
import React, { useState, useEffect } from "react";
import saveBtnBlack from "../../../assets/img/imgBtn/saveBtnBlack.svg";
import saveBtnWhite from "../../../assets/img/imgBtn/saveBtnWhite.svg";
import { scrapFeed } from "../../../apis/api/Feed";
import { cancelscrapFeed } from "../../../apis/api/Feed";
import { likeFeed } from "../../../apis/api/Feed";
import { cancelLikeFeed } from "../../../apis/api/Feed";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/reducers/user";

interface Props {
  likeCount: number;
  feedId: number;
}

const FeedListItemBtn: React.FC<Props> = ({ likeCount, feedId }: Props) => {
  const user = useAppSelector(selectUser);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openComment = () => {
    setModalIsOpen(true);
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedStatus = localStorage.getItem("savedStatus");
    setIsSaved(savedStatus === "true");
  }, []);

  const toggleSaved = () => {
    const newSavedStatus = !isSaved;
    setIsSaved(newSavedStatus);

    localStorage.setItem("savedStatus", String(newSavedStatus));
    if (!newSavedStatus) {
      scrapFeed(user.userId, feedId);
    } else {
      cancelscrapFeed(user.userId, feedId);
    }
  };

  const [isLiked, setIsLiked] = useState(false);
  const toggleLiked = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      likeCount++;
      likeFeed(user.userId, feedId);
    } else {
      likeCount--;
      cancelLikeFeed(user.userId, feedId);
    }
  };

  return (
    <>
      <BtnWrapper>
        <div>
          {/* Assume ImgBtn component receives and forwards the onClick prop */}
          <ImgBtn
            src={isLiked ? likeFillRed : likeBtn}
            onClick={toggleLiked}
            size="20px"
          />
          <ImgBtn src={commentBtn} onClick={openComment} size="20px" />
          <ImgBtn
            src={isSaved ? saveBtnBlack : saveBtnWhite}
            onClick={toggleSaved}
            size="20px"
          />
        </div>
        <FeedLikeCnt likeCount={likeCount} />
      </BtnWrapper>
      {modalIsOpen && <CommentModal onClose={closeModal} feedId={feedId} />}
    </>
  );
};

export default FeedListItemBtn;

const BtnWrapper = styled.div`
  padding: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;
