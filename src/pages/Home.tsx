import React from 'react';
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { UpraisedLogo } from '../icons';

const Home: React.FC = () => {

  return (
    <Box
      width="47%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="0 auto"
    >
      <Box
        width="100%"
        height="100%"
        borderRadius={5}
        sx={{
          background:
            "linear-gradient(180deg, rgba(175, 156, 243, 0.00) 5.73%, #AF9CF3 100%)",
          backgroundBlendMode: "multiply",
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="100%"
          height="80%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
        >
          <Box display="flex" alignItems="center">
            <UpraisedLogo size={30} />
            <Typography ml={1} fontWeight={700} fontSize={18}>
              upraised
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="120px"
            height="110px"
            bgcolor="white"
            borderRadius="50%"
            boxShadow={3}
          >
            <Typography
              fontWeight={900}
              fontSize={20}
              sx={{ color: "var(--primary-orange)" }}
            >
              Quiz
            </Typography>
          </Box>

          <Link to="/quiz">
            <button className="primaryBtn">Start</button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Home