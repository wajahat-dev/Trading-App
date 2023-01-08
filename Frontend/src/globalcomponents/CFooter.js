import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Box } from '@material-ui/core';
import { Paper } from '@mui/material';


const CFooter = () => {
    return (
        
        <Paper sx={{
            marginTop: 'calc(30% + 60px)',
            bottom: 0,
            width: '100%'
        }} component="footer" square variant="outlined">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        my: 1
                    }}
                >
                    <div>
                        <img priority src="/Logo.svg" width={75} height={30} alt="Logo" />
                    </div>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 2,
                    }}
                >
                    <Typography variant="caption" color="initial">
                        Copyright ©2023. [] Limited
                    </Typography>
                </Box>
        </Paper>
    );
}

export default CFooter;