import { Context, useContext } from 'react'

export type Unsubscribe = () => void

export function useNotNullContext<T>(contextType: Context<T>): T {
    const context = useContext(contextType)
    if (context === undefined) {
        throw new Error(`Context must be within Provider`)
    }
    return context
}
