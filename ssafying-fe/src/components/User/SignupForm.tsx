import styled from "styled-components";
import backarrow from "../../assets/img/backarrow.svg";

function SignUpForm() {
  return (
    <div>
      <Header>
        <img src={backarrow} />
        <h1>회원가입</h1>
      </Header>
      <Form>
        <div>
          <div>이름을 입력하세요</div>
          <input type="text" />
        </div>
        <div>
          <div>닉네임을 입력하세요</div>
          <input type="text" />
        </div>
        <div>
          <div>이메일을 입력하세요</div>
          <input type="email"></input>
        </div>
        <div>
          <div>비밀번호를 입력하세요</div>
          <input type="password" />
        </div>
        <div>
          <div>비밀번호를 다시 입력하세요</div>
          <input type="password" />
        </div>
        <div>
          <div>전화번호를 입력하세요</div>
          <input type="text" />
        </div>
        <div>
          <span>생일</span>
          <select id="birth-year">
            <option disabled selected>
              출생 연도
            </option>
          </select>
          <select id="birth-month">
            <option disabled selected>
              월
            </option>
          </select>
          <select id="birth-day">
            <option disabled selected>
              일
            </option>
          </select>
        </div>
        <span>캠퍼스</span>
        <select>
          <option>서울</option>
          <option>대전</option>
          <option>구미</option>
          <option>광주</option>
          <option>부울경</option>
        </select>
        <span>기수</span>
        <input type="number" />
        <br />
        <input type="radio" name="isMajor" />
        전공자
        <input type="radio" name="isMajor" />
        비전공자
      </Form>
      <button>관심태그 선택하러 가기</button>
    </div>
  );
}
export default SignUpForm;

const Header = styled.header`
  display: flex;
  align-items: center;

  img {
    height: 30px;
    margin-right: 10px;
    margin-top: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
