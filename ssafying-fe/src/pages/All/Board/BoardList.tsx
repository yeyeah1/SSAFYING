import styled from "styled-components";

import BoardSortTab from "../../../components/All/Board/BoardList/BoardSortTab";
import BoardCardList from "../../../components/All/Board/BoardList/BoardCardList";
import SearchBarOnly from "../../../components/All/Board/BoardList/SearchBarOnly";
import BackBtnHeader from "../../../components/Common/BackBtnHeader";
import PlusBtn from "../../../components/Common/PlusBtn";

function BoardList() {
  return (
    <Wrapper>
      <BackBtnHeader
        backLink="/all"
        htext={<h2>게시판</h2>}
        isCenter={true}
        extraBtn={<PlusBtn link="/board/create" />}
      />
      <BoardSortTab></BoardSortTab>
      <SearchBarOnly></SearchBarOnly>
      <BoardCardList></BoardCardList>
    </Wrapper>
  );
}

export default BoardList;
const Wrapper = styled.div``;
