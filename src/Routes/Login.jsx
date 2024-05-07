import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as MuiLink } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { CiLock } from "react-icons/ci";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/Navbar/Navbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useLoginUser from "../hooks/useUser";
import { useDispatch } from "react-redux";
import { saveUserData } from "../Stores/project/auth";
import { useLoginMerchant } from "../hooks/useMerchant";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const redirect = searchParams.get("redirect");
  console.log(redirect);
  const { login, data, error, isLoading } = useLoginUser();
  const {
    login: loginMerchant,
    data: dataMerchant,
    error: errorMerchant,
    isLoading: isLoadingMerchant,
  } = useLoginMerchant();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.isMerchant.checked) {
      await loginMerchant({
        email: event.target.email.value,
        password: event.target.password.value,
      });
      return;
    }
    await login({
      email: event.target.email.value,
      password: event.target.password.value,
    });
  };

  if (data) {
    localStorage.setItem("token", data.data.token);
    dispatch(saveUserData({ ...data.data, isMerchant: false }));

    // navigate(redirect ? redirect : "/");
  }
  if (dataMerchant) {
    localStorage.setItem("token", dataMerchant.data.token);
    dispatch(saveUserData({ ...dataMerchant.data, isMerchant: true }));
    navigate(`/store?email=${dataMerchant.data.email}`);
  }
  return (
    <div className="container">
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <Navbar
          hideCart={true}
          links={[{ to: "/stores", title: "Stores" }]}
          logo={"MATJARKOM"}
          logoLink={"/"}
          hideSignIn={true}
        />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CiLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Login As Marchant"
              name="isMerchant"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login">
                  <MuiLink
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </MuiLink>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  <MuiLink
                    href=""
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </MuiLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}
