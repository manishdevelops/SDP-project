import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Audio } from 'react-loader-spinner';
import { ThreeCircles } from 'react-loader-spinner';

import { TbCoinRupee } from "react-icons/tb";
import { MdTour } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { MdContacts } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardHome = () => {

    const [statistics, setStatistics] = useState(null);
    const [statisticsLoading, setStatisticsLoading] = useState(true);
    const icons = [MdTour, FaUsers, TbBrandBooking, MdContacts, MdOutlineRateReview];

    console.log(statistics);
    // const [data, setData] = useState({
    //     totalTours: '',
    //     totalBookings: '',
    //     totalUsers: '',
    //     totalReviews: '',
    //     totalContacts: ''
    // });

    // const [loading, setLoading] = useState(true);

    // console.log(data);

    // const allData = async () => {
    //     try {

    //         const [toursRes, bookingsRes, usersRes, reviewsRes, contactsRes] = await Promise.all([
    //             fetch('/api/admin/all-tours'),
    //             fetch('/api/admin/all-bookings'),
    //             fetch('/api/admin/all-users'),
    //             fetch('/api/admin/all-reviews'),
    //             fetch('/api/admin/all-contacts')
    //         ]);

    //         if (!toursRes.ok || !bookingsRes.ok || !usersRes.ok || !reviewsRes.ok || !contactsRes.ok) {
    //             const errors = await Promise.all([toursRes, bookingsRes, usersRes, reviewsRes, contactsRes].map(res => res.json()));
    //             return toast.error((errors.map(err => err.message).join(', ') || 'Something went wrong'));
    //         }

    //         const [toursData, bookingsData, usersData, reviewsData, contactsData] = await Promise.all([
    //             toursRes.json(),
    //             bookingsRes.json(),
    //             usersRes.json(),
    //             reviewsRes.json(),
    //             contactsRes.json()
    //         ]);

    //         setData({
    //             totalTours: toursData,
    //             totalBookings: bookingsData,
    //             totalUsers: usersData,
    //             totalReviews: reviewsData,
    //             totalContacts: contactsData
    //         });


    //     } catch (error) {
    //         toast.error(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const getStatistics = async () => {
        try {
            const res = await fetch('/api/admin/all-statistics');

            if (!res.ok) {
                const errorData = await res.json();
                return toast.error(errorData.message);
            }

            const data = await res.json();

            setStatistics(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setStatisticsLoading(false);
        }
    }



    useEffect(() => {
        // allData();
        getStatistics();
    }, [])

    return (
        <div className="flex-1 p-2 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {!statisticsLoading && statistics &&
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-purple-900 font-semibold flex items-center"><TbCoinRupee className='text-xl text-purple-950 inline mr-2' />Total Earnings</h2>
                        <div className="text-2xl font-bold">{statistics[2]?.stats?.totalEarnings.toLocaleString('en-IN')}</div>
                        <div className="text-green-500">₹{statistics[2]?.stats?.currentMonthEarnings.toLocaleString('en-IN')
                        } this month</div>
                    </div>
                }
                {!statisticsLoading && statistics &&
                    statistics.map((statistics, i) => {
                        const Icon = icons[i];
                        return <div key={i} className="p-4 bg-white rounded-lg shadow-md">
                            <h2 className="text-purple-900 font-semibold "> <Icon className='text-xl text-purple-950 inline mr-2' />Total {statistics.model}</h2>
                            <div className="text-2xl font-bold">{statistics?.stats?.count}</div>
                            <div className="text-green-500">{statistics?.stats?.percentageOfNewDocuments}% this month</div>
                        </div>
                    })
                }

                {
                    !statistics && statisticsLoading && (
                        Array.from({ length: 6 }).map((_, i) => <Audio
                            key={i}
                            height="80"
                            width="80"
                            radius="9"
                            color="green"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        />)
                    )
                }
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                <div className='bg-red-500 h-32'></div>
                <div className=' h-[45vh] p-4 bg-white rounded-lg shadow-md grid place-content-center'>
                    {!statistics && statisticsLoading && <ThreeCircles
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />}
                    {
                        !statisticsLoading && statistics && <Pie data={{
                            labels: statistics.map((statistic) => statistic.model),
                            datasets: [
                                {
                                    data: statistics.map((statistic) => statistic.stats.count),
                                    backgroundColor: ['#00C6FF', '#FF6F61', '#B8E986', '#8A2BE2', '#FFD700']
                                }
                            ]
                        }} options={{}} />
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardHome;