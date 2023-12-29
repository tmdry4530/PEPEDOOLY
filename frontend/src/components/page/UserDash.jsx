import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../hooks/useUserState";
import axios from "axios";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.greenMode ? "#3CB371" : "#FFD700")};
    color: ${(props) => (props.greenMode ? "#fff" : "#333")};
    transition: background-color 0.3s, color 0.3s;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const Sidebar = styled.div`
  box-sizing: border-box;
  /* position: fixed; */
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: ${(props) => (props.greenMode ? "#228B22" : "#FFA500")};
  color: ${(props) => (props.greenMode ? "#fff" : "#333")};
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`;

const MainContent = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const SidebarButton = styled.button`
  display: block;
  margin-bottom: 10px;
  padding: 12px 24px;
  border: none;
  background-color: ${(props) => (props.greenMode ? "#32CD32" : "#FF8C00")};
  color: ${(props) => (props.greenMode ? "#fff" : "#333")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 18px;

  &:hover {
    background-color: ${(props) => (props.greenMode ? "#3CB371" : "#FFA500")};
    color: ${(props) => (props.greenMode ? "#fff" : "#333")};
  }
`;

const UserInfoBox = styled.div`
  flex: 1;
  background-color: ${(props) => (props.greenMode ? "#32CD32" : "#FF8C00")};
  color: ${(props) => (props.greenMode ? "#fff" : "#333")};
  padding: 20px;
  margin-top: 20px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomeButton = styled.button`
  display: block;
  padding: 12px 24px;
  border: none;
  background-color: ${(props) => (props.greenMode ? "#32CD32" : "#FF8C00")};
  color: ${(props) => (props.greenMode ? "#fff" : "#333")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 18px;
  margin-top: auto; /* 하단 정렬을 위해 margin-top: auto; 추가 */
`;

const Contents = styled.div`
  display: flex;
`;

const DashBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const Imgbox = styled.div`
  flex: 1;
`;

const InputBox = styled.div`
  display: flex;
`;

const InfoBox = styled.input`
  background-color: green;
`;

const UserDash = () => {
  const { user, logout, setLoggedInUser } = useUserState();
  //   console.log("대시보드 유저:", user);
  const [greenMode, setGreenMode] = useState(true);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const navigate = useNavigate(); // React Router의 useNavigate 훅을 사용하여 페이지 이동 기능을 가져옴
  const [userModify, setUserModify] = useState(false);
  const updateUserFrom = useRef();

  useEffect(() => {
    console.log("대시보드유저:", user);
  }, [user]);

  const toggleColorMode = () => {
    setGreenMode(!greenMode);
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const goToHome = () => {
    navigate("/"); // "/" 경로로 이동
  };

  const updateUser = () => {
    const confirmUpdate = window.confirm(
      "정말로 회원 수정을 진행하시겠습니까?"
    );

    if (confirmUpdate) {
      axios
        .put(`http://localhost:4000/users/profile/${user.userData.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("회원 수정 응답:", response.data);
          logout();
        })
        .catch((error) => {
          console.error("회원 탈퇴 오류:", error);
        });
    }
  };

  const handleUpdate = (e) => {
    console.log(updateUserFrom.current.Users_email);
    const {
      Users_email: { value: Users_emailValue },
      Users_name: { value: Users_nameValue },
      Users_nickname: { value: Users_nicknameValue },
    } = updateUserFrom.current;
    const { Users_id } = user.userData;
    console.log("유데이터", Users_id);
    setLoggedInUser({
      Users_email: Users_emailValue,
      Users_name: Users_nameValue,
      Users_nickname: Users_nicknameValue,
      Users_id: Users_id,
    });
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "정말로 회원 탈퇴를 진행하시겠습니까?"
    );

    console.log("대시보드 유저 아이디", user);
    if (confirmDelete) {
      axios
        .delete(`http://localhost:4000/users/${user.userData.Users_id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("회원 탈퇴 응답:", response.data);
          logout();
          goToHome(); // 회원 탈퇴 후 메인 페이지로 이동
        })
        .catch((error) => {
          console.error("회원 탈퇴 오류:", error);
        });
    }
  };

  return (
    <>
      <GlobalStyle greenMode={greenMode} />
      <Contents>
        <Sidebar greenMode={greenMode}>
          <div>
            <h2>Sidebar</h2>
            <button onClick={toggleColorMode}>
              {greenMode ? "옐로우 모드로 전환" : "그린 모드로 전환"}
            </button>
            <SidebarButton greenMode={greenMode} onClick={toggleUserInfo}>
              유저 정보
            </SidebarButton>
            <SidebarButton greenMode={greenMode}>내가 쓴 글</SidebarButton>
            <SidebarButton greenMode={greenMode}>내가 쓴 댓글</SidebarButton>
            <SidebarButton greenMode={greenMode} onClick={handleDeleteAccount}>
              회원 탈퇴
            </SidebarButton>{" "}
            <div>
              <HomeButton greenMode={greenMode} onClick={goToHome}>
                홈으로 돌아가기
              </HomeButton>
            </div>
          </div>
        </Sidebar>

        <MainContent>
          <Header />
          <DashBox>
            <Imgbox>
              <h1>Pepedooly</h1>
              <p>
                <img
                  src={process.env.PUBLIC_URL + "/assets/epepdooly.png"}
                  alt="PepeDoooly"
                  style={{ width: "500px", height: "500px" }}
                />
              </p>
            </Imgbox>
            <UserInfoBox greenMode={greenMode} show={showUserInfo}>
              <form onSubmit={updateUser} ref={updateUserFrom}>
                {userModify ? (
                  <>
                    <p>이름:</p>
                    <input
                      defaultValue={user?.userData?.Users_name}
                      name="Users_name"
                      onChange={(e) => handleUpdate(e, "Users_name")}
                    />
                  </>
                ) : (
                  <>
                    <p>이름:</p>
                    <div> {user?.userData?.Users_name} </div>
                  </>
                )}
                {userModify ? (
                  <>
                    <p>이메일:</p>

                    <input
                      defaultValue={user?.userData?.Users_email}
                      name="Users_email"
                      onChange={(e) => handleUpdate(e, "Users_email")}
                    />
                  </>
                ) : (
                  <>
                    <p>이메일:</p>
                    <div> {user?.userData?.Users_email} </div>
                  </>
                )}
                {userModify ? (
                  <>
                    <p>닉네임:</p>

                    <input
                      defaultValue={user?.userData?.Users_nickname}
                      name="Users_nickname"
                      onChange={(e) => handleUpdate(e, "Users_nickname")}
                    />
                  </>
                ) : (
                  <>
                    <p>닉네임:</p>
                    <div> {user?.userData?.Users_nickname} </div>
                  </>
                )}
                <InputBox></InputBox>
                {userModify ? (
                  <>
                    <button>저장하기</button>
                  </>
                ) : (
                  <></>
                )}
              </form>
              {userModify ? (
                <></>
              ) : (
                <>
                  <button onClick={() => setUserModify(true)}>수정하기</button>
                </>
              )}
            </UserInfoBox>
          </DashBox>
          <Footer />
        </MainContent>
      </Contents>
    </>
  );
};
export default UserDash;
