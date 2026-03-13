import http from './http';

// Work order management API contracts preserved from 19board.html.
export const workOrderApi = {
  // POST /api/NEWWOID/update
  updateWorkOrder(payload) {
    return http.post('/api/NEWWOID/update', payload);
  },
  // POST /api/NEWWOID
  createWorkOrder(payload) {
    return http.post('/api/NEWWOID', payload);
  },
  // GET /api/READWOID?area=&department=
  getReadWo(area, department) {
    return http.get(`/api/READWOID?area=${area}&department=${department}`);
  },
  // GET /api/DISTINCTNFCCODE?name=${department}LN%25&area=${area}
  getDistinctNfcCode(area, department) {
    return http.get(`/api/DISTINCTNFCCODE?name=${department}LN%25&area=${area}`);
  },
  // GET /api/SFWOREAD/SN_LIST?WO_ID=&TYPE=
  getSnList(woId, type) {
    return http.get(`/api/SFWOREAD/SN_LIST?WO_ID=${woId}&TYPE=${encodeURIComponent(type)}`);
  },
  // POST /api/ERPREAD/WOID
  getErpWoid(payload) {
    return http.post('/api/ERPREAD/WOID', payload);
  },
  // GET /api/lotend
  completeLot(area, department, nfcCode, woId) {
    return http.get(`/api/lotend?area=${area}&department=${department}&NFC_code=${nfcCode}&woId=${woId}`);
  },
  // GET /api/lotend/PAUSE
  pauseLot(area, department, nfcCode, woId, remark, reworkDate) {
    return http.get(`/api/lotend/PAUSE?area=${area}&department=${department}&NFC_code=${nfcCode}&woId=${woId}&REMARK=${remark}&REWORK=${reworkDate}`);
  },
  // PUT /api/READWOID/UPDATE_rework_date
  updateReworkDate(payload) {
    return http.put('/api/READWOID/UPDATE_rework_date', payload);
  },
};
