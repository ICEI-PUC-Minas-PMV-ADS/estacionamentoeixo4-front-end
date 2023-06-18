import { Backdrop, CircularProgress } from "@mui/material"
import { useState } from 'react'
const BackdropComponent = (props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.enabled || false}
        >
            <CircularProgress color="inherit" />
        </Backdrop >
    )
}


export default BackdropComponent