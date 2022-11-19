import React, { useEffect, useState } from "react";
import { Container, Title, Content } from "./CodeExam.style";
import http from "../../api/http";
import CodeTest from "./CodeTest";
import { useLocation } from "react-router-dom";

const CodeExam = () => {
  const { state } = useLocation();
  const [name, setName] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    http.connect_axios
      .get(`/grading/muid?uid=${state}`)
      .then((res) => {
        // console.log(res);
        setName(res.data.name);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err);
        alert("문제가 존재하지 않습니다.");
      });
  });

  return (
    <Container>
      <Title>
        <p>문제: {name}</p>
      </Title>
      <Content>
        <p>문제내용 : {content}</p>
        {/* <p>조건 : Python print문 이용하기</p> */}
      </Content>
      <CodeTest uid={state} />
    </Container>
  );
};

export default CodeExam;
