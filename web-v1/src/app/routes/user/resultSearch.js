import { useLocation } from "react-router-dom"
import NotFound from "../../container/pages/404"
import Product from "../../container/product/Products"

function ResultSearch() {
    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const searchQuery = params.get("search_query") || ''

    console.log(searchQuery)

    return <> { searchQuery ? <Product/> : <NotFound/>} </>
}

export default ResultSearch