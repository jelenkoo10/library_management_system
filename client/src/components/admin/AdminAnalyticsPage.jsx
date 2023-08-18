import React from "react";
import { useState, useEffect } from "react";
import Select from "../UIElements/Select";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const AdminAnalyticsPage = () => {
  const [period, setPeriod] = useState("Poslednjih 6 meseci");
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [titles, setTitles] = useState([]);
  const uid = JSON.parse(localStorage.getItem("userData")).userId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const today = new Date();

  let startDate;
  startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 6);
  startDate = startDate.toISOString().split("T")[0];
  startDate = startDate.split("-").reverse();
  startDate = [startDate[1], startDate[0], startDate[2]].join("/");

  let endDate = today.toISOString().split("T")[0];
  endDate = endDate.split("-").reverse();
  endDate = [endDate[1], endDate[0], endDate[2]].join("/");

  useEffect(() => {
    async function getAllReservations() {
      if (period === "Poslednjih 6 meseci") {
        startDate = new Date(today);
        startDate.setMonth(startDate.getMonth() - 6);
        startDate = startDate.toISOString().split("T")[0];
        startDate = startDate.split("-").reverse();
        startDate = [startDate[1], startDate[0], startDate[2]].join("/");
      } else if (period === "Poslednja godina") {
        startDate = new Date(today);
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate = startDate.toISOString().split("T")[0];
        startDate = startDate.split("-").reverse();
        startDate = [startDate[1], startDate[0], startDate[2]].join("/");
      }
      const resData = await sendRequest(
        `http://localhost:5000/api/users/id/${uid}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      if (resData.user) {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/analytics/${resData.user.branches[0]}/data?startdate=${startDate}&enddate=${endDate}`,
          "GET",
          null,
          { "Content-Type": "application/json" }
        );
        setGenres(
          responseData.bookGenres
            .map((genresString) => genresString.split(", "))
            .flat()
        );
        setAuthors(responseData.bookAuthors);
        setTitles(responseData.bookTitles);
      }
    }

    getAllReservations();
  }, [period]);

  useEffect(() => {
    async function getAllReservations() {
      const resData = await sendRequest(
        `http://localhost:5000/api/users/id/${uid}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      if (resData.user) {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/analytics/${resData.user.branches[0]}/data?startdate=${startDate}&enddate=${endDate}`,
          "GET",
          null,
          { "Content-Type": "application/json" }
        );
        setGenres(
          responseData.bookGenres
            .map((genresString) => genresString.split(", "))
            .flat()
        );
        setAuthors(responseData.bookAuthors);
        setTitles(responseData.bookTitles);
      }
    }

    getAllReservations();
  }, []);

  const changePeriod = (e) => {
    setPeriod(e.target.value);
  };

  Chart.register(...registerables);

  const genreCounts = {};
  genres.forEach((genre) => {
    if (genreCounts[genre]) {
      genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  });

  const authorCounts = {};
  authors.forEach((author) => {
    if (authorCounts[author]) {
      authorCounts[author]++;
    } else {
      authorCounts[author] = 1;
    }
  });

  const titleCounts = {};
  titles.forEach((title) => {
    if (titleCounts[title]) {
      titleCounts[title]++;
    } else {
      titleCounts[title] = 1;
    }
  });

  const genreChartData = {
    labels: Object.keys(genreCounts), // Korišćenje ključeva iz objekta koji sadrži brojanje žanrova
    datasets: [
      {
        label: "Broj rezervacija po žanru",
        data: Object.values(genreCounts), // Korišćenje vrednosti iz objekta koji sadrži brojanje žanrova
        backgroundColor: "rgba(199, 93, 44, 0.8)",
        borderColor: "rgba(230, 123, 74, 1)",
        borderWidth: 1,
      },
    ],
  };

  const authorChartData = {
    labels: Object.keys(authorCounts), // Korišćenje ključeva iz objekta koji sadrži brojanje autora
    datasets: [
      {
        label: "Broj rezervacija po autoru",
        data: Object.values(authorCounts), // Korišćenje vrednosti iz objekta koji sadrži brojanje autora
        backgroundColor: "rgba(199, 93, 44, 0.8)",
        borderColor: "rgba(230, 123, 74, 1)",
        borderWidth: 1,
      },
    ],
  };

  const titleChartData = {
    labels: Object.keys(titleCounts), // Korišćenje ključeva iz objekta koji sadrži brojanje autora
    datasets: [
      {
        label: "Broj rezervacija po knjizi",
        data: Object.values(titleCounts), // Korišćenje vrednosti iz objekta koji sadrži brojanje autora
        backgroundColor: "rgba(199, 93, 44, 0.8)",
        borderColor: "rgba(230, 123, 74, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-[#DDD] bg-opacity-90 border-[#C75D2C] border p-12 sm:w-full lg:w-[900px] xl:w-[1056px]">
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="w-1/3">
        <Select
          labelName="Izaberite period"
          labelStyle="font-bold text-[#C75D2C]"
          selectStyle="p-1 text-[#C75D2C]"
          selectName="period"
          selectId="period"
          onChange={changePeriod}
          options={[
            {
              id: "Poslednjih 6 meseci",
              name: "Poslednjih 6 meseci",
            },
            {
              id: "Poslednja godina",
              name: "Poslednja godina",
            },
          ]}
        />
      </div>
      <div className="flex justify-between mt-8 sm:flex-col lg:flex-row">
        {genres[0] && (
          <div className="w-[30%]">
            <h2 className="text-center text-[#C75D2C] font-semibold sm:my-10 lg:my-6 text-lg">
              Najčitaniji žanrovi
            </h2>
            <Bar data={genreChartData} options={chartOptions} />
          </div>
        )}
        {authors[0] && (
          <div className="w-[30%]">
            <h2 className="text-center text-[#C75D2C] font-semibold sm:my-10 lg:my-6 text-lg">
              Najčitaniji autori
            </h2>
            <Bar data={authorChartData} options={chartOptions} />
          </div>
        )}
        {titles[0] && (
          <div className="w-[30%]">
            <h2 className="text-center text-[#C75D2C] font-semibold sm:my-10 lg:my-6 text-lg">
              Najčitaniji naslovi
            </h2>
            <Bar data={titleChartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
