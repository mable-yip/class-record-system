import { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import * as api from '../../api'

const useFetchHook = (apiCall: Promise<AxiosResponse<any>>) => {
    const [result, setResult] = useState({})
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getData(){
            setIsLoading(true)
            try{
                const { data } = await apiCall
                //convert array to object 
                const dataObj = data.reduce((obj: any, item: { [x: string]: any }) => {
                    return {
                        ...obj, [item['email']]: item,
                    }
                }, {})
                setResult(dataObj)

            } catch(error){
                setError(error.message)
            }
            setIsLoading(false)
        }

        getData()
    }, [])

    return {
        result, error, isLoading
    }

}

export default useFetchHook