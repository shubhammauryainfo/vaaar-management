import React, { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { IoNotifications , IoPeople } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { Button, SparkLine, StackedChart } from "../components";
import {
  SparklineAreaData,
  ecomPieChartData,
  stackedCustomSeries,
  stackedPrimaryXAxis,
  stackedPrimaryYAxis
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

// console.log("Base URL:", API_BASE_URL); // Debug
// console.log("API Key:", API_KEY);       // Debug

// console.log(process.env);


const Home = () => {
  const { currentColor } = useStateContext();
  const [stats, setStats] = useState({
    notices: 0,
    events: 0,
    members: 0,
    feedbacks: 0,
    funds: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = {
        "api-key": API_KEY,
        };

        const endpoints = [
          `${API_BASE_URL}/api/notices`,
          `${API_BASE_URL}/api/events`,
          // `${API_BASE_URL}/api/members`,
          `${API_BASE_URL}/api/forms`,
          // `${API_BASE_URL}/api/funds`,
        ];

        const responses = await Promise.all(
          endpoints.map((url) => fetch(url, { headers }))
        );

        const [notices,
           events,
            forms,
            // members,
            // funds
          ] = await Promise.all(
          responses.map((res) => res.json())
        );

        setStats({
          notices: notices.length || 0, 
          events: events.length || 0,  
          feedbacks: forms.length || 0,
          // members: members.length || 0,
          // funds: funds.total || 0, 
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const VaaarDetails = [
    {
      icon: <IoNotifications />,
      amount: stats.notices,
      title: "Notices",
      label: "Notices",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
    {
      icon: <MdEvent />,
      amount: stats.events,
      title: "Events",
      label: "Events",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
    },
    {
      icon: <IoPeople />,
      amount: 50,
      title: "Members",
      label: "Members",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",
    },
    {
      icon: <FaWpforms />,
      amount: stats.feedbacks,
      title: "Feedbacks",
      label: "Feedbacks",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
    },
  ];


  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center dark:bg-blend-overlay border border-gray-100 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-4xl dark:text-gray-400 text-white">Funds</p>
              <p className="text-2xl mt-2b">$45,567.56
              {/* ${stats.funds} */}
              </p>
            </div>
          </div>
          {/* <div className="mt-6">
            <Button
              color="white"
              bgColor="blue"
              text="Download"
              borderRadius="10px"
              size="md"
            />
          </div> */}
        </div>

        {/* 📝these are divs for the small stats cards
        <div className=" flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-40 p-4 pt-9 rounded-2xl"
            >
              <button type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                  {item.amount}
                </span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
            </div>
          ))}
        </div> */}
        <div className=" flex m-3 flex-wrap justify-center gap-1 items-center">
          {VaaarDetails.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-40 p-4 pt-4 rounded-2xl text-center border border-gray-100 dark:border-gray-600"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-xl font-semibold">{item.amount}</span>
                {/* <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span> */}
              </p>
            
              <p className="text-md font-semibold mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 border border-gray-100 dark:border-gray-600">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span><GoPrimitiveDot /></span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span><GoPrimitiveDot /></span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">
                    $93,435
                  </span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budgets</p>
              </div>
              <div className="mt-8">
                <p>
                  <span className="text-3xl font-semibold">
                    $48,435
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkline"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
                <StackedChart
                  width="320px" 
                  height="360px"
                  data={stackedCustomSeries}
                  xAxisData={stackedPrimaryXAxis}
                  yAxisData={stackedPrimaryYAxis}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
