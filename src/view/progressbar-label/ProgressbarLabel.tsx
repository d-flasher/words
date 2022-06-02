import Box from '@mui/material/Box'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface IProgressbarLabelProps extends LinearProgressProps {
    value: number
    max: number
}

const ProgressbarLabel: FC<IProgressbarLabelProps> = ({ value, max }) => {
    let maxP = max <= 0 ? 1 : max
    let valueP = Math.min(value, maxP)
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={valueP / maxP * 100}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {`${value}/${max}`}
                </Typography>
            </Box>
        </Box>
    )
}
export default ProgressbarLabel
