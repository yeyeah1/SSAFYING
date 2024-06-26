import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BoardCardListItem from "./BoardCardListItem";
import { selectAllBoard } from "../../../../apis/api/Board";
import GetBoardItem from "./GetBoardItem";

interface BoardCardListProps {
  selectedCategory?: string | null;
  searchWord?: string;
}

const BoardCardList: React.FC<BoardCardListProps> = ({
  selectedCategory,
  searchWord,
}) => {
  const [cards, setCards] = useState<
    {
      title: string;
      writer: string;
      content: string;
      category: string;
      isAnonymous: boolean;
      boardId: number;
      scrap: boolean;
    }[]
  >([]);

  const [filteredCards, setFilteredCards] = useState<
    {
      title: string;
      writer: string;
      content: string;
      category: string;
      isAnonymous: boolean;
      boardId: number;
      scrap: boolean;
    }[]
  >([]);
  const [lastIdx, setLastIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardData = await selectAllBoard(selectedCategory ?? undefined);
        console.log(boardData);
        if (boardData && boardData.resultData) {
          setLastIdx(lastIdx + 1);
          const newCards = boardData.resultData.map((res: any) => ({
            title: res.title,
            writer: res.nickname,
            content: res.content,
            category: res.category,
            isAnonymous: res.anonymous,
            boardId: res.boardId,
            scrap: res.scrap,
          }));
          setCards(newCards);

          if (typeof searchWord === "string" && searchWord.trim() !== "") {
            const filtered = newCards.filter((card: any) => {
              return card.title
                .replace(" ", "")
                .toLocaleLowerCase()
                .includes(
                  searchWord.trim().toLocaleLowerCase().replace(" ", "")
                );
            });
            console.log(filtered);
            setFilteredCards(filtered);
            console.log("필터링", filteredCards);
          } else {
            setFilteredCards(newCards);
          }
        }
      } catch (error) {
        console.error(error);
        setCards([]);
        setFilteredCards([]);
      }
    };
    fetchData();
  }, [selectedCategory, searchWord]);

  return (
    <>
      {filteredCards.length > 0 ? (
        <Container>
          {filteredCards.map((card, index) => (
            <GetBoardItem key={index} boardId={card.boardId} />
          ))}
        </Container>
      ) : (
        <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
      )}
    </>
  );
};

export default BoardCardList;

const NoResultsMessage = styled.div`
  padding-top: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // padding: 0 30px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
