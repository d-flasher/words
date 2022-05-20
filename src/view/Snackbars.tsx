import { useSnackbar, VariantType } from 'notistack'
import { useState } from 'react'
import { FC, useContext, useEffect } from 'react'

import { ServiceMessageType } from '../controllers/service-messages'
import { ControllerContext } from './WordsApp'

const Snackbars: FC = () => {
    const { serviceMessages } = useContext(ControllerContext)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    useEffect(() => {
        function toVariant(type: ServiceMessageType): VariantType {
            switch (type) {
                case 'error':
                    return 'error'
                case 'info':
                    return 'info'
                default:
                    return 'default'
            }
        }

        return serviceMessages.subscribe(msgData => {
            enqueueSnackbar(msgData.msg, { variant: toVariant(msgData.type), autoHideDuration: 1500 })
        })
    }, [])

    return <></>
}
export default Snackbars
