/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Select from 'react-select';
import { DateRangePicker } from 'rsuite';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { getAirQualityData } from '@/utls/apis';
import { colorLookup } from '@/utls/helpers';
import LoadingSpinner from '@/components/LoadingSpinner';
import 'rsuite/DateRangePicker/styles/index.css';

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState(['co_gt']);
  const [dateRange, setDateRange] = useState({
    startDate: new Date('2004-03-11'),
    endDate: new Date('2004-03-12'),
  });
  const [airQualityData, setAirQualityData]: any = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let airQuality = await getAirQualityData(
          new Intl.DateTimeFormat('en-GB').format(dateRange.startDate).replace(/\//g, '-'),
          new Intl.DateTimeFormat('en-GB').format(dateRange.endDate).replace(/\//g, '-'),
        );
        airQuality = airQuality.map((item: any) => ({
          ...item,
          dateTime: `${item.date}-${item.time}`,
        }));
        setAirQualityData(airQuality);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        console.error(e);
      }
    };
    fetchData();
  }, [dateRange]);

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedParameters(selectedOptions.map((option: any) => option.value));
  };

  const handleDateChange = ([startDate, endDate]: any) => {
    setDateRange({ startDate, endDate });
  };

  const allParameters: any =
    airQualityData.length > 0
      ? Object.keys(airQualityData[0]).filter((key) => key !== 'id' && key !== 'date' && key !== 'time')
      : [];

  const filteredData = airQualityData.filter((d: any) => {
    const date = new Date(d.date);
    return date >= dateRange.startDate && date <= dateRange.endDate;
  });

  const options = allParameters?.map((param: any) => ({
    label: param,
    value: param,
  }));

  if (!mounted || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-screen">
      <header className="text-center p-5 text-2xl font-bold">Air Quality Visualization</header>

      <div className="w-[90%] md:w-[80%] h-[70%] md:h-[80%] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <XAxis dataKey="dateTime" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedParameters.map((param) => (
              <Line key={param} type="monotone" dataKey={param} stroke={colorLookup[param] || '#000000'} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-2 gap-8 flex-col md:flex-row items-center mt-4">
        <div>
          <DateRangePicker
            onChange={handleDateChange}
            value={[dateRange.startDate, dateRange.endDate]}
            placeholder="Select Date Range"
            placement="topStart"
          />
        </div>
        <Select
          instanceId="air-quality-instance"
          isMulti
          options={options}
          value={options.filter((opt: any) => selectedParameters.includes(opt.value))}
          onChange={handleSelectChange}
          menuPlacement="top"
          styles={{
            container: (provided) => ({
              ...provided,
              width: '40%',
              '@media (max-width: 768px)': {
                width: '80%',
              },
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Home;
