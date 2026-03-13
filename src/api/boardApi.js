import http from './http';

// Realtime board endpoints are preserved from legacy 19board.html.
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
  getDistinctNfcCode(area, department) {
    return http.get(`/api/DISTINCTNFCCODE?name=${department}LN%25&area=${area}`);
  },
  getEffOver(area, department, mfgMonth) {
    return http.get(`/api/C_PDREPORT/SELECEFFOVER?area=${area}&department=${department}&mfg_month=${mfgMonth}`);
  },
  getPd(area, department, mfgDay) {
    return http.get(`/api/C_PDREPORT/SELECPD?area=${area}&department=${department}&&mfg_day=${mfgDay}`);
  },
};
