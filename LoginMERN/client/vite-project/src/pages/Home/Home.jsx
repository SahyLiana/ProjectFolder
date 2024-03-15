import React from "react";
import "./home.scss";
// import PieChart from "./PieChart";
import Card from "./Card";
import { AiOutlineDollar } from "react-icons/Ai";
import { MdProductionQuantityLimits } from "react-icons/Md";
import { TbCubeSend } from "react-icons/Tb";
import Axios from "axios";
import { Link } from "react-router-dom";
// import BarChart from "./BarChart";
// import LineChart from "./LineChart";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from "react-apexcharts";

function Home() {
  const [products, setProducts] = React.useState([]);
  const [productNumber, setProductNumber] = React.useState(0);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [myEarnings, setMyEarnings] = React.useState([]);
  //const [myTotalEarnings, setMyTotalEarnings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const token = localStorage.getItem("token");
  let productCategory = [];

  const [graphData, setGraphData] = React.useState([]);

  const [orderData, setOrderData] = React.useState({});

  const [dailyTransactions, setDailyTransactions] = React.useState({});

  const homeCard = [
    {
      title: "Earnings",
      icons: <AiOutlineDollar />,
      numbers: total,
    },
    {
      title: "Products",
      icons: <MdProductionQuantityLimits />,
      numbers: productNumber,
    },
    {
      title: "Orders",
      icons: <TbCubeSend />,
      numbers: orderNumber,
    },
  ];

  React.useEffect(() => {
    const getProducts = async () => {
      const allProducts = await Axios.get("http://localhost:3000/api/products");
      console.log("All product are:");
      console.log(allProducts.data.products);
      console.log("Number of product is:");
      console.log(allProducts.data.nbHits);
      setProductNumber(allProducts.data.nbHits);
      setProducts(allProducts.data.products);
    };

    const getEarnings = async () => {
      try {
        setLoading(true);
        // const allEarnings = await Axios.get(
        //   "http://localhost:3000/api/products/earnings",
        //   {
        //     headers: { Authorization: token },
        //     params: {
        //       status: "Pending",
        //     },
        //   }
        // );

        const totalEarnings = await Axios.get(
          "http://localhost:3000/api/products/earnings",
          {
            headers: { Authorization: token },
          }
        );
        console.log("My total earnings are:");
        console.log(totalEarnings.data.myTotalEarnings);
        console.log("My earnings are:");
        console.log(totalEarnings.data.myEarnings);
        productCategory = [
          {
            category: "Phones",
            numbers: 0,
          },
          {
            category: "Computers",
            numbers: 0,
          },
          {
            category: "Others",
            numbers: 0,
          },
        ];
        console.log(productCategory);

        const transactions = [];

        const AllEarnings = totalEarnings.data.myEarnings;

        for (let i = 0; i < AllEarnings.length; i++) {
          // transactions.push(AllEarnings[i].transactions);
          // console.log(AllEarnings[i].transactions);
          if (AllEarnings[i].status !== "Cancelled") {
            for (let j = 0; j < AllEarnings[i].transactions.length; j++) {
              console.log(AllEarnings[i].transactions[j]);
              transactions.push(AllEarnings[i].transactions[j]);
            }
          }
        }

        console.log("Only transactions");
        console.log(transactions);
        console.log("All earnings areeee");
        console.log(AllEarnings);

        for (let i = 0; i < productCategory.length; i++) {
          // console.log(transactions[i].category);//Computers

          for (let j = 0; j < transactions.length; j++) {
            if (transactions[j].category === productCategory[i].category) {
              productCategory[i].numbers += transactions[j].nb;
              console.log("Inside the if");
              console.log(transactions[j].category);
              console.log(productCategory[i].numbers);
            }
            console.log(productCategory[i].category);
            console.log("Outside the if");
            console.log(productCategory[i].numbers);
          }
          // console.log(productCategory);
        }

        // for (let i = 0; i < productCategory.length; i++) {
        //   // console.log(transactions[i].category);//Computers
        //   for (let j = 0; j < transactions.length; j++) {
        //     if (transactions[j].category === productCategory[i].category) {
        //       productCategory[i].numbers += transactions[j].nb;
        //       console.log("Inside the if");
        //       console.log(transactions[j].category);
        //       console.log(productCategory[i].numbers);
        //     }
        //     console.log(productCategory[i].category);
        //     console.log("Outside the if");
        //     console.log(productCategory[i].numbers);
        //   }
        //   // console.log(productCategory);
        // }

        const earningsData = totalEarnings.data.myEarnings;
        const checkEarningData = totalEarnings.data.myEarnings;
        const earningsArray = [];
        console.log("My earnings Data");
        console.log(earningsData);

        for (let i = 0; i < earningsData.length; i++) {
          //if (earningsArray.length === 0) {
          if (earningsData[i].status !== "Cancelled") {
            earningsArray.push({
              date: earningsData[i].date.slice(
                0,
                earningsData[i].date.indexOf("a")
              ),
              // date: earningsData[i].date,
            });
          }

          //}

          //     for (let j = 0; j < checkEarningData.length; j++) {
          //       if (checkEarningData[j].date === earningsData[i].date) {

          //       }
          //     }
        }

        const elementCounts = {};

        earningsArray.forEach((element) => {
          // if (element.status !== "Canceled") {
          elementCounts[element.date] = (elementCounts[element.date] || 0) + 1;
          // }
        });

        console.log("My earning array is");
        console.log(earningsArray);
        console.log("My earnings array object is");
        console.log(elementCounts);

        const entries = Object.entries(elementCounts);
        console.log(entries.reverse());
        //const object = {};
        const arrayObject = [];
        const value = [];

        // entries.map((elementEntry) => {
        //   elementEntry.map((data) => {
        //     if (typeof data === "string") {
        //       object.date = data;
        //       arrayObject.push(object);
        //     } else {
        //       value.push(data);
        //     }
        //   });
        // });

        for (let i = 0; i < entries.length; i++) {
          for (let j = 0; j < entries[i].length; j++) {
            if (typeof entries[i][j] === "string") {
              console.log(entries[i][j]);
              //object.date = entries[i][j];
              //console.log(object);
              arrayObject.push(entries[i][j]);
              console.log(arrayObject);
            } else {
              value.push(entries[i][j]);
            }
          }
        }

        console.log("My array obj");
        console.log(arrayObject);
        console.log("Value is");
        console.log(value);
        console.log("Product category");
        console.log(productCategory);

        // console.log(productCategory);
        setGraphData((prev) => [productCategory]);

        setMyEarnings([
          ...totalEarnings.data.myEarnings.filter(
            (earning) => earning.status === "Pending"
          ),
        ]);
        // setMyTotalEarnings([...allEarnings.data.myTotalEarnings]);

        setOrderData({
          series: productCategory.map((data) => data.numbers),
          options: {
            chart: {
              width: 380,
              type: "pie",
            },
            title: {
              text: "Orders",
              floating: true,
              offsetY: 0,
              offsetX: -60,
              align: "center",
              style: {
                color: "#444",
              },
            },
            labels: productCategory.map((data) => data.category),
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        });

        // setDailyTransactions({
        //   labels: arrayObject.slice(0, 5).map((data) => data),
        //   datasets: [
        //     {
        //       label: "Last five days transactions",
        //       data: value.slice(0, 5).map((data) => data),
        //       backgroundColor: [
        //         "rgba(75,192,192,1)",
        //         "#ecf0f1",
        //         "#50AF95",
        //         "#f3ba2f",
        //         "#2a71d0",
        //       ],
        //       borderColor: "black",
        //       borderWidth: 2,
        //     },
        //   ],
        // });

        setDailyTransactions({
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: "center",
                },
                colors: {
                  ranges: [
                    {
                      from: 0,
                      to: 0,
                      color: undefined,
                    },
                  ],
                  // backgroundBarColors: ["#111111,#000000"],
                  backgroundBarOpacity: 1,
                  backgroundBarRadius: 0,
                },
              },
            },
            chart: {
              height: 100,
            },
            xaxis: {
              categories: arrayObject.slice(0, 5).map((data) => data),
              // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            },
            title: {
              text: "Last five days transactions",
              floating: true,
              offsetY: 0,
              align: "center",
              style: {
                color: "#444",
              },
            },
          },
          series: [
            {
              name: "Orders",
              // data: [30, 40, 45, 50, 49, 60, 70, 91],
              data: value.slice(0, 5).map((data) => data),
            },
          ],
        });

        const arrayEarnings = [...totalEarnings.data.myTotalEarnings];
        console.log("The number of orders are:");

        console.log(totalEarnings.data.nbHits);
        console.log("Product pending and delived");
        const arrayOrder = arrayEarnings.filter(
          (earning) => earning.status !== "Cancelled"
        );
        console.log(arrayOrder.length);
        console.log(arrayEarnings);
        // const earnings = allEarnings.data.myEarnings;

        let myTotal = 0;
        arrayEarnings.map((earning) => {
          if (earning.status !== "Cancelled") {
            myTotal += earning.total;
          }
        });

        setTotal(myTotal);

        setOrderNumber(totalEarnings.data.nbHits);
        setOrderNumber(arrayOrder.length);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    AOS.init({ duration: 600 });
    getEarnings();
    getProducts();
  }, []);

  console.log(`My total money is ${total}`);

  // console.log(products);
  console.log(myEarnings);

  console.log("My graph data");
  console.log(graphData);

  const displayedCard = homeCard.map((card) => {
    return <Card loading={loading} card={card} key={card.title} />;
  });
  // return cards;
  return (
    <div className="home-container">
      <div className="card-header" data-aos="fade-in">
        {displayedCard}
      </div>

      {!loading && (
        <div className="graph">
          <div className="graph-container">
            <div className="pie-chart">
              {/* <PieChart chartData={orderData} /> */}
              <Chart
                type="pie"
                options={orderData.options}
                series={orderData.series}
                height={400}
              />
              {/* <p style={{ textAlign: "center" }}>Ordered product's graph</p> */}
            </div>
            <div className="bar-chart">
              {/* <BarChart chartData={dailyTransactions} /> */}
              <Chart
                height={400}
                options={dailyTransactions.options}
                series={dailyTransactions.series}
                type="bar"
              />
              {/* <LineChart chartData={dailyTransactions} /> */}
            </div>
          </div>
        </div>
      )}

      <div className="order-container">
        <h2>
          <Link to="orders">Latest orders</Link>
        </h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: "400px" }}>TransactionID</th>
              {/* <th>Name</th> */}
              <th style={{ width: "200px" }}>Type of products</th>
              <th style={{ width: "100px" }}>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr style={{ border: "none" }}>
                <td>
                  <span style={{ fontWeight: "bold", fontSize: "40px" }}>
                    Loading...
                  </span>
                </td>
              </tr>
            ) : myEarnings.length === 0 ? (
              <tr style={{ border: "none" }}>
                <td>
                  <span style={{ fontWeight: "bold", fontSize: "40px" }}>
                    No recent orders
                  </span>
                </td>
              </tr>
            ) : (
              myEarnings.map((earning) => {
                return (
                  <tr key={earning._id}>
                    <td style={{ maxWidth: "100px", color: "gray" }}>
                      {earning.transactionID}
                    </td>
                    {/* <td>{earning.tran}</td> */}
                    <td>{earning.transactions.length}</td>
                    <td>${earning.total}</td>
                    <td>
                      <span className={`${earning.status}`}>
                        {earning.status}
                      </span>
                    </td>
                    <td style={{ color: "gray" }}>{earning.date}</td>
                    <td className="actionCol">
                      <Link to={`order/${earning._id}`} className="action">
                        ...
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
