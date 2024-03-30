import { useState } from "react";
import { Typography, Button, Grid, Box } from "@mui/material"; // Import Material-UI components
import cookieService from "../services/cookieService";

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(
    !cookieService.getCookie("Name")
  );

  const handleAcceptCookie = () => {
    cookieService.setCookie("Name", "Michael");
    setShowBanner(false);
  };

  return (
    showBanner && (
      <Box
        position="fixed"
        bottom={0}
        right={0}
        width="700px"
        bgcolor="background.paper"
        p={2}
        textAlign="center"
        boxShadow={2}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Typography sx={{ textAlign: "start" }}>
              We care about your privacy. This website uses cookies to enhance
              your browsing experience and provide personalized content. By
              clicking "Accept", you consent to the use of cookies. You can
              adjust your cookie settings at any time in your browser settings.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleAcceptCookie}>
              Accept
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  );
}

export default CookieBanner;
