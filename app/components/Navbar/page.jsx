"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const pages = ["Chat", "History", "Stone", "Support"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const pathname = usePathname();
  const session = useSession();
  const { email } = session?.data?.user || {};

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={pathname === "/api/login" ? "hidden" : ""}>
      <AppBar position="static" sx={{ backgroundColor: "#fafafa" }}>
        <Container maxWidth="2xl">
          <Toolbar disableGutters>
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="logo"
              className="lg:block hidden"
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              className="lg:pl-4"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#6f23fd",
                textDecoration: "none",
              }}
            >
              Chat Fusion
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#111111"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="logo"
              className="lg:hidden block"
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              className="pl-2"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#6f23fd",
                textDecoration: "none",
              }}
            >
              Chat Fusion
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {session?.status === "authenticated" ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/profile.png" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <div
                      className="px-3 text-gray-600"
                      onClick={handleCloseUserMenu}
                    >
                      <h2>{email}</h2>
                      <button
                        onClick={() => signOut()}
                        className="text-red-400 cursor-pointer text-center w-full"
                      >
                        Logout
                      </button>
                    </div>
                  </Menu>
                </>
              ) : session?.status === "loading" ? (
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#6f23fd]"></div>
              ) : (
                <Link href="/api/login">
                  <button className="bg-[#6f23fd] px-4 py-2 rounded-sm cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
