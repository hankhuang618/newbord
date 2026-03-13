import http from './http';

// Legacy endpoint contracts preserved from 19board.html.
export const boardApi = {
  getReadWo(area, department) {
    return http.get(`/api/READWOID?area=${area}&department=${department}`);
  },
  getQuery2(area, department) {
    return http.get(`/api/Query2?area=${area}&department=${department}`);
  },
  getOnline(area, department) {
    return http.get(`/api/ONLINE?area=${area}&department=${department}`);
  },
  getPd(area, department, mfgDay) {
    return http.get(`/api/C_PDREPORT/SELECPD?area=${area}&department=${department}&&mfg_day=${mfgDay}`);
  },
};
