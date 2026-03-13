import http from './http';

export const fqcApi = {
  getRating(area, department) {
    return http.get(`/api/READWOID/SELECT_RATING?area=${area}&department=${department}`);
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
