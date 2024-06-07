import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPublicUrlQuery } from '../../redux/api/urlApi'
const Visit = () => {
    const { id } = useParams()
    // useNavigate()
    const { data, isSuccess, isError } = useGetPublicUrlQuery(id)
    useEffect(() => {
        if (isSuccess) [
          window.location.href = data
      ]
    }, [isSuccess,data])
    
    return <>
        {id}
    </>
}

export default Visit