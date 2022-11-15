import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../api/JWT";
import isAuthenticated from "../../api/isAuthenticated";

let loginPages = [
  { 질문하기: "/questionlist" },
  { 전체로드맵: "/main" },
  { 마이페이지: "/myprofile" },
];

const Navbar = () => {
  function logout() {
    deleteToken();
    navigate("/");
  }

  function login() {
    navigate("/login");
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const navigate = useNavigate();

  const logoutHandle = () => {
    logout();
  };

  const questionHandle = () => {
    navigate("/questionlist");
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      style={{ background: "black" }}
      position="absolute"
      top="0"
      height="10%"
    >
      <Container maxWidth="0">
        <Toolbar disableGutters>
          {/* <LogoImgDesk src={"/assets/cap.png"}></LogoImgDesk> */}
          <Typography
            variant="h1"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontSize: "30px",
              fontWeight: 1000,
              color: "white",
              textDecoration: "none",
            }}
          >
            D-Station
          </Typography>

          {/* 데스크탑 일 때 보이는 메뉴 */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
            }}
          >
            {/* ------------------------------------- */}
            <>
              {isAuthenticated()
                ? loginPages.map((page, idx) => (
                    <Button
                      component="a"
                      key={idx}
                      href={String(Object.values(page))}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        fontFamily: "MICEGothic Bold",
                      }}
                    >
                      {Object.keys(page)}
                    </Button>
                  ))
                : null}
            </>
            {/* ------------------------------------- */}
          </Box>
          <>
            {isAuthenticated() ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="questionlist">
                  <IconButton onClick={questionHandle} sx={{ color: "white" }}>
                    질문하기
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton onClick={logoutHandle} sx={{ color: "white" }}>
                    로그아웃
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Login">
                  <IconButton onClick={login} sx={{ color: "white" }}>
                    로그인
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
