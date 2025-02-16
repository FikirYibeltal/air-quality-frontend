/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Select from 'react-select';
import { DateRangePicker } from 'rsuite';
import { getAirQualityData } from '@/utls/apis';
import { colorLookup, labelLookup } from '@/utls/helpers';
import LoadingSpinner from '@/components/LoadingSpinner';
import 'rsuite/DateRangePicker/styles/index.css';
import { ErrorAlert } from '@/components/ErrorAlert';

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState(['co_gt']);
  const [dateRange, setDateRange] = useState({
    startDate: new Date('2004-03-11'),
    endDate: new Date('2004-03-12'),
  });
  const [airQualityData, setAirQualityData]: any = useState([]);
  const [error, setError]: any = useState('');
  useEffect(() => {
    setMounted(true);
  }, []);

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
      setError(e.message);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const handleSelectChange = (selectedOptions: any) => {
    if(selectedOptions.length>0) setSelectedParameters(selectedOptions.map((option: any) => option.value));
  };

  const handleDateChange = ([startDate, endDate]: any) => {
    setDateRange({ startDate, endDate });
  };
  const onRefresh = async () => {
    setError('');
    await fetchData();
  };
  const allParameters: any =
    airQualityData.length > 0
      ? Object.keys(airQualityData[0]).filter((key) => key !== 'id' && key !== 'date' && key !== 'time')
      : [];

  const options = allParameters?.map((param: any) => ({
    label: labelLookup[param],
    value: param,
  }));

  if (!mounted || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-screen">
      <header className="text-center p-5 text-2xl font-bold">Air Quality Visualization</header>

      <div className="w-[90%] md:w-[80%] h-[70%] md:h-[80%] mx-auto">
        {error ? (
          <ErrorAlert errorMessage={error} onRefresh={onRefresh} />
        ) : airQualityData.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-semibold text-gray-500">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={airQualityData}>
              <XAxis dataKey="dateTime" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedParameters.map((param) => (
                <Line key={param} type="monotone" dataKey={param} stroke={colorLookup[param] || '#000000'} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
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
