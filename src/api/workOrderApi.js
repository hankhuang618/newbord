import http from './http';

export const workOrderApi = {
  updateWorkOrder(payload) {
    return http.post('/api/NEWWOID/update', payload);
  },
  createWorkOrder(payload) {
    return http.post('/api/NEWWOID', payload);
  },
  getDistinctNfcCode(name, area) {
    return http.get(`/api/DISTINCTNFCCODE?name=${name}LN%25&area=${area}`);
  },
  pauseLot(area, department, nfcCode, woId, remark, reworkDate) {
    return http.get(`/api/lotend/PAUSE?area=${area}&department=${department}&NFC_code=${nfcCode}&woId=${woId}&REMARK=${remark}&REWORK=${reworkDate}`);
  },
};
