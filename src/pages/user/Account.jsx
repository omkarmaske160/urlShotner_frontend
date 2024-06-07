import React, { useEffect, useState } from 'react'
import { useAddUrlMutation, useDeleteUrlMutation, useGetUrlQuery } from '../../redux/api/userApi'
import { toast } from 'react-toastify'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaRegClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";

import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const Account = () => {
   
    return <>
        <UrlForm />
        <UrlTable /> 
    </>
}
const UrlForm = () => {
    const [addUrl,{isSuccess , isError , error , err}] = useAddUrlMutation()
    const [urldata, setUrlData] = useState({})
    const handleChange = e => {
        const { name, value } = e.target
        setUrlData({...urldata,[name]:value})
    }
    
    useEffect(() => {
        if (isSuccess) {
            toast.success("Data Added Success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
    }, [isError])
    const FrontendURL = String(`${import.meta.env.VITE_FRONTEND_URL}`)
    
    
    // const { data } = useGetUrlQuery()
    return <>
        <div className="container mx-auto mb-5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="card">
                    <div className="card-body">
                        <div className="col-span-2">
                            <label htmlFor='longUrl' className="form-label">Paste a Long URL </label>
                            <input type="text" className="form-control" onChange={handleChange} name="longUrl" id="longUrl" placeholder="Example: https://www.google.com" />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor='' className="form-label">Add a Label </label>
                            <input type="text" className="form-control" onChange={handleChange} name="label" id="label" placeholder="Example: instagram" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor='domain' className="form-label">Domain </label>
                            <input disabled type="text" className="form-control" id="domain" value={FrontendURL} placeholder="Example: https://www.google.com" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor='longUrl' className="form-label">Enter a Back half </label>
                            <input onChange={handleChange} name='shortUrl' type="text" className="form-control" id="longUrl" placeholder="Example: favourite Link" />
                        </div>
                        <div className="col-span-2">
                            <div className='alert alert-info my-3'>
                                <span className='bi bi-magic'></span>
                                End your Link with the words that will make it unique
                            </div>
                        </div>
                        <button type="button" onClick={() => addUrl(urldata)} className="btn btn-sm btn-info btn-md">Generate Short URL</button>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <Stat />
                    </div>
                </div>
            </div>
        </div>
    </>
}


const UrlTable = () => {
    const [deleteUrl] = useDeleteUrlMutation();
    const { data } = useGetUrlQuery();
    const FrontendURL = String(`${import.meta.env.VITE_FRONTEND_URL}`);
    const [copySuccess, setCopySuccess] = useState({}); // Use an object to track copy success for each item

    const copyToClipboard = (url, itemId) => { // Pass itemId to track copy success for each item
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopySuccess(prevState => ({
                    ...prevState,
                    [itemId]: true, // Set copy success for this item
                }));
                setTimeout(() => setCopySuccess(prevState => ({
                    ...prevState,
                    [itemId]: false, // Reset copy success after 2 seconds
                })), 2000);
            })
            .catch((err) => console.error('Error copying to clipboard:', err));
    };

    return data && (
        <div className="overflow-x-auto">
            <table className="table border border-collapse border-gray-500">
                {/* head */}
                <thead>
                    <tr>
                        <th className="border border-gray-500">Visit</th>
                        <th className="border border-gray-500">short url</th>
                        <th className="border border-gray-500">long url</th>
                        <th className="border border-gray-500">Actual Link</th>
                        <th className="border border-gray-500">count</th>
                        <th className="border border-gray-500">Label</th>
                        <th className="border border-gray-500">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item._id}>
                            <td className="border border-gray-500">
                                <a
                                    href={`${FrontendURL}/visit/${item.shortUrl}`}
                                    className="btn btn-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit
                                </a>
                            </td>
                            <td className="border border-gray-500">{item.shortUrl}</td>
                            <td className="border border-gray-500">{item.longUrl}</td>
                            <td className="border border-gray-500 flex justify-between items-center">
                                <a href={`${FrontendURL}/visit/${item.shortUrl}`} target='_blank' className='block'>
                                    {`${FrontendURL}/visit/${item.shortUrl}`}
                                </a>
                                {copySuccess[item._id] ? <FaClipboardCheck /> : <FaRegClipboard
                                    className='block cursor-pointer ml-2'
                                    onClick={() => copyToClipboard(`${FrontendURL}/visit/${item.shortUrl}`, item._id)} // Pass item ID
                                />}
                            </td>
                            <td className="border border-gray-500">{item.count}</td>
                            <td className="border border-gray-500">{item.label}</td>
                            <td className="border border-gray-500">
                                {/* <button
                                    type="button"
                                    className="mx-2 btn btn-warning"
                                >
                                    Edit
                                </button> */}
                                <button
                                    type="button"
                                    className="mx-2 btn btn-danger"
                                    onClick={() => deleteUrl(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Stat = () => {
    const { data : urlData } = useGetUrlQuery()
const data = {
  labels: urlData && urlData.map(item => item.label ),
  datasets: [
    {
      label: '# of Votes',
      data: urlData && urlData.map(item => item.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
  return <Doughnut data={data} />;

}
export default Account