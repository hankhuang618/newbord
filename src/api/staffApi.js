import http from './http';

// Staff management contracts preserved from 19board.html.
export const staffApi = {
  // POST /api/Attendance
  getStaffList(payload) {
    return http.post('/api/Attendance', payload);
  },
  // GET /api/Attendance/ATT_RAWDATA
  getAttendance(mfgDay, jobNumber) {
    return http.get(`/api/Attendance/ATT_RAWDATA?MFG_DAY=${mfgDay}&JOB_NUMBER=${jobNumber}`);
  },
  // POST /api/Attendance/UPDATESTATUS
  updateStatus(payload) {
    return http.post('/api/Attendance/UPDATESTATUS', payload);
  },
  // POST /api/Attendance/creat
  createAttendance(payload) {
    return http.post('/api/Attendance/creat', payload);
  },
  // PUT /api/Attendance/UPDATE_SHOW
  updateShow(payload) {
    return http.put('/api/Attendance/UPDATE_SHOW', payload);
  },
  // PUT /api/Attendance/UPDATE_USER
  updateUser(payload) {
    return http.put('/api/Attendance/UPDATE_USER', payload);
  },
  // DELETE /api/Attendance/Delete
  deleteAttendance(payload) {
    return http.delete('/api/Attendance/Delete', { data: payload });
  },
  // DELETE /api/Attendance/Delete_hr
  deleteHr(payload) {
    return http.delete('/api/Attendance/Delete_hr', { data: payload });
  },
};
