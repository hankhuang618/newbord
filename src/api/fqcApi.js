import http from './http';

// FQC / completion quantity contracts preserved from 19board.html.
export const fqcApi = {
  getReadWo(area, department) {
    return http.get(`/api/READWOID?area=${area}&department=${department}`);
  },
  getRating(area, department) {
    return http.get(`/api/READWOID/SELECT_RATING?area=${area}&department=${department}`);
  },
  completeWorkOrder(payload) {
    return http.post('/api/READWOID/update', payload);
  },
  updateRating(payload) {
    return http.put('/api/READWOID/UPDATE_RATING', payload);
  },
  updateAllRating(payload) {
    return http.put('/api/READWOID/UPDATE_RATING_ALL', payload);
  },
  updateReworkDate(payload) {
    return http.put('/api/READWOID/UPDATE_rework_date', payload);
  },
};
