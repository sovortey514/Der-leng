// ==============================> React Framework <==============================
import { useState, useEffect } from "react";

// ==============================> Local <==============================
import { DataService } from "../../config/dataService/dataService";
import { useParams } from "react-router-dom";

// const usePackageFetcher = () => {
//     const [state, setState] = useState({
//         packages: [],
//         current: 1,
//         pageSize: 1,
//         isLoader: true,
//         isLoadMore: false
//     });

//     const { category } = useParams();

//     useEffect(() => {
//         setState({
//             packages: [],
//             current: 1,
//             pageSize: 1,
//             isLoader: true,
//             isLoadMore: false
//         });

//         fetchData(1);

//         console.log("Set Data to init..");
//     }, [category]);

//     const fetchData = async (page) => {
//         try {
//             const response = await DataService.get(`/packages/?page=${page}&category_name=${category || ''}`);
//             if (response.status === 200) {
//                 setState(prevState => ({
//                     ...prevState,
//                     packages: [...prevState.packages, ...response.data.results],
//                     isLoader: false,
//                     isLoadMore: false,
//                     pageSize: Math.ceil(response.data.count / 10)
//                 }));
//             }
//         } catch (error) {
//             console.log("Error fetching packages:", error);
//         }
//     };

//     const handleScroll = () => {
//         if (!state.isLoadMore && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 300) {
//             setState(prevState => ({ ...prevState, current: prevState.current + 1, isLoadMore: true }));
//             fetchData(state.current)
//         }
//     };

//     useEffect(() => {
//         console.log(`Start Scroll ${state.current < state.pageSize}`);
//         if (state.current < state.pageSize) {
//             console.log("Start Scroll");
//             window.addEventListener('scroll', handleScroll);
//         }

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [state.pageSize, state.current]);

//     return state;
// };

// export default usePackageFetcher;


const usePackageFetcher = () => {
    const [state, setState] = useState({
        packages: [],
        current: 1,
        pageSize: 1,
        isLoader: true,
        isLoadMore: false
    });

    const {category} = useParams()

    console.log(state)

    useEffect(() => {
        setState({
            packages: [],
            current: 1,
            pageSize: 1,
            isLoader: true,
            isLoadMore: false
        });

        console.log("Set Data to init..")

        fetchPackage(1)

    }, [category])

    const fetchPackage = async (page) => {
        try {
            const response = await DataService.get(`/packages/?page=${page}&category_name=${category || ''}`);
            if (response.status === 200) {
                console.log("Add data..")
                setState(prevState => ({
                    ...prevState,
                    packages: [...prevState.packages, ...response.data.results],
                    isLoader: false,
                    isLoadMore: false,
                    pageSize: Math.ceil(response.data.count / 10)
                }));
            }

        } catch (error) {
            if (error.response.state === 404) {
                console.log("No more package")
            }
        }
    }

    const handleScroll = () => {
        if (!state.isLoadMore && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 300) {
            setState(prevState => ({ ...prevState, current: prevState.current + 1, isLoadMore: true }))
            fetchPackage(state.current + 1)
        }
    };

    useEffect(() => {

        console.log(`Start Scroll ${state.current < state.pageSize}`)
        if (state.current < state.pageSize) {
            console.log("Start Scroll")
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [state.current, state.pageSize]);

    return state
}


export default usePackageFetcher