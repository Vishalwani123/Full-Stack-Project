import axios from './api';

export const checkInWithQR = async (qrCode) => {
  const res = await axios.post(`/api/qrcheckin?code=${qrCode}`);
  return res.data;
};