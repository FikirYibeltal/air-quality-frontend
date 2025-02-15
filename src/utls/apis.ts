import axios from 'axios';
const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const getAirQualityData = async (startDate: string, endDate: string, parameter?: string) => {
  const data = await axios.post(`${backendApiUrl}/searchData`, {
    startDate,
    endDate,
    parameter,
  });
  return data.data;
};
