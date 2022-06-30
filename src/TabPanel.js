import { Box } from '@mui/material'

export default function TabPanel({ color, ...props }) {

    return (
        <Box {...props}>
            {props.tabs[props.tab].component}
        </Box>
    )
}