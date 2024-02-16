import axios from 'axios'
import { useState, useEffect, createContext } from 'react'

const NoticiasContex = createContext()

const NoticiasProvider = ({children}) => {
    
    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    const [pagina, setPagina] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)

    useEffect(() => {
        const consutarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=US&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
            setPagina(1)
        } 
        consutarAPI()
    }, [categoria])

    useEffect(() => {
        const consutarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=US&page=${pagina}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)

        } 
        consutarAPI()
    }, [pagina])


    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const hendleChangePagina = (e, valor) => {
        setPagina(valor)
    }
    
    
    return(
        <NoticiasContex.Provider
            value={{
                categoria, 
                handleChangeCategoria,
                noticias,
                totalNoticias,
                hendleChangePagina,
                pagina
            }}
        >
            {children}
        </NoticiasContex.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContex