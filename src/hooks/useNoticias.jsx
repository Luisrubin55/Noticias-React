import {useContext} from 'react'
import NoticiasContex from '../context/NoticiasProvider'

const useNoticias = () => {
    return useContext(NoticiasContex)
}

export default useNoticias