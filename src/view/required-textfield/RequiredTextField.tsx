import TextField, { TextFieldProps } from '@mui/material/TextField'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

type RequiredTextFieldProps = TextFieldProps & {
    onErrorChange?: (isError: boolean) => void
}

const RequiredTextField: FC<RequiredTextFieldProps> = ({ onErrorChange, ...props }) => {
    const [error, setError] = useState<boolean>(false)
    const isChanges = useRef<boolean>(false)
    useEffect(() => {
        const isError = () => {
            if (!isChanges.current) return false
            if (props.value === undefined) return true
            return String(props.value).length === 0
        }
        setError(isError())
    }, [props.value])

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        isChanges.current = true
        const isError = event.target.value.length === 0
        if (error !== isError) {
            setError(isError)
            if (onErrorChange) onErrorChange(isError)
        }
        if (props.onChange) props.onChange(event)
    }

    return <TextField
        {...props}
        error={error}
        onChange={onChange}
    />
}
export default RequiredTextField
