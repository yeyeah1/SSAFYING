import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SubmitBtn from "../../Common/SubmitBtn";

interface InputItem {
  id: number;
  title: string;
}

interface UserData {
  nickname: string;
  phoneNumber: string;
  intro: string | null;
}

interface UserUpdateFormProps {
  userData: UserData;
}

function UserUpdateForm({ userData }: UserUpdateFormProps) {
  const nextID = useRef<number>(1);
  const [InputItems, setInputItems] = useState<InputItem[]>([
    { id: 0, title: userData.nickname ?? "" },
  ]);

  useEffect(() => {
    setInputItems([
      { id: 0, title: userData.nickname ?? "" }, // 예시로 닉네임을 기본값으로 설정했습니다.
    ]);
  }, [userData]);

  function addInput() {
    const input = {
      id: nextID.current,
      title: "",
    };

    setInputItems([...InputItems, input]);
    nextID.current += 1;
  }

  function deleteInput(index: number) {
    setInputItems(InputItems.filter((item) => item.id !== index));
  }

  function handleTitleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    if (index >= InputItems.length) return;

    const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(InputItems));
    inputItemsCopy[index].title = e.target.value;
    setInputItems(inputItemsCopy);
  }
  return (
    <div>
      <Form>
        <SignUpInput className="input-area">
          <input
            type="text"
            id="nickname"
            placeholder=" "
            value={userData.nickname}
          />
          <label htmlFor="nickname">닉네임을 입력해주세요</label>
        </SignUpInput>
        <SignUpInput className="input-area">
          <input
            type="tel"
            id="tel"
            placeholder=" "
            defaultValue={userData.phoneNumber}
          />
          <label htmlFor="tel">전화번호를 입력해주세요</label>
        </SignUpInput>
        <SignUpInput className="input-area">
          <input type="password" id="password" placeholder=" " />
          <label htmlFor="password">비밀번호을 입력해주세요</label>
        </SignUpInput>
        <SignUpInput className="input-area">
          <input type="password" id="password2" placeholder=" " />
          <label htmlFor="password2">비밀번호를 다시 입력해주세요</label>
        </SignUpInput>
        <SignUpInput className="input-area">
          <input
            type="text"
            id="lineIntro"
            placeholder=" "
            // value={userData.intro}
          />
          <label htmlFor="lineIntro">한줄 소개를 입력해주세요</label>
        </SignUpInput>
      </Form>
      <BioLinkInput>
        <label htmlFor="biolink">바이오 링크를 입력해주세요 (최대 5개)</label>
        {InputItems.map((item, index) => (
          <DIV_Label key={index}>
            <div>바이오 링크{index + 1}</div>
            <select>
              <option>github</option>
              <option>notion</option>
              <option>tistory</option>
              <option>blog</option>
              <option>etc</option>
            </select>
            <input
              type="url"
              onChange={(e) => handleTitleChange(e, index)}
              value={item.title}
            />
            {index === InputItems.length - 1 && index < 4 && (
              <button onClick={addInput}> + </button>
            )}
            {index > 0 && (
              <button onClick={() => deleteInput(item.id)}> - </button>
            )}
          </DIV_Label>
        ))}
      </BioLinkInput>
      <ButtonContainer>
        <SubmitBtn link="/user/detail" text="회원정보 수정완료" />
      </ButtonContainer>
    </div>
  );
}

export default UserUpdateForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-right: 45px;
  padding-left: 55px;

  .isMajor {
    margin-top: 45px;
    margin-bottom: 75px;
  }
`;
const SignUpInput = styled.div`
  position: relative;
  margin-top: 25px;
  margin-bottom: 15px;

  .input-area {
    width: 70%;
    position: relative;
    font-size: 18px;
    margin-top: 20px;
  }

  input {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 2px solid gray;
    border-radius: 0;
    outline: none;
    min-width: 60vmin;
    font-size: 15px;
    padding-bottom: 5px;
    background-color: transparent;
    padding-left: 10px;
    padding-top: 10px;
    font-family: "Noto Sans KR", "Noto Sans";
  }
  label {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    transition: transform 0.3s ease-out;
    padding-left: 10px;
    font-family: "Noto Sans KR", "Noto Sans";
  }
  input:focus + label,
  input:not(:placeholder-shown) + label {
    transform: translateY(-150%);
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const DIV_Label = styled.div`
  display: block;
  margin-top: 25px;
  left: 0;
  select {
    border: 1px solid #ddd;
    border-radius: 20px;
    margin: 10px;
    height: 30px;
    padding: 5px;
  }
`;

const BioLinkInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-right: 45px;
  padding-left: 55px;

  label {
    display: block;
    margin-top: 25px;
    font-size: 100%;
    width: calc(70% - 30px);
    align-self: flex-start;
  }

  ${DIV_Label} {
    margin-top: 10px;

    div {
      margin-top: 10px;
      font-size: 80%;
    }

    input {
      width: 350px;
      height: 30px;
      margin-top: 5px;
      padding: 5px;
      border: 1px solid #ddd;
      border-radius: 15px;
      box-sizing: border-box;
    }

    button {
      margin-top: 10px;
      background-color: #d9d9d9;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
`;
