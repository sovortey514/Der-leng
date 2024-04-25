import { useEffect, useState } from "react"
import UseFetcher, { get } from "../../../hooks/useFetcher"
import { Skeleton } from "antd";
import List from "../../product/overview/List";

function FavoriteProductList() {
    const apiUrl = "/packages"
    const [state, setState] = useState({
        isLoading: false,
        data: [],
        next: null,
        page: 1,
    })
    const user = JSON.parse(localStorage.getItem("user")) || {id: null, username: null};
    const useFetcher = new UseFetcher();

    useEffect(() => {
        useFetcher.get(setState , `${apiUrl}?favorites=${user.id}`)
        console.log(state)
    }, [])

    return (
        <>
        { state.isLoading ? 
        <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
            <Skeleton active paragraph={{ rows: 10 }} />
        </div>
        :
        <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] p-[25px]">
            <h1 className="text-xl">Favorites List</h1>
            <List state={{packages:state.data, isLoader:state.isLoading, isLoadMore:false}}/>
        </div>
        }
        </>
    )
}

export default FavoriteProductList