<template>
  <table>
    <thead>
      <tr>
        <th>ID</th><th>出勤</th><th>部門</th><th>工作拉</th><th>工號</th><th>姓名</th><th>備註</th>
        <th v-if="!showActions">Status</th><th v-if="!showActions">工作部門</th><th v-if="!showActions">事由</th>
        <th v-if="showActions">功能</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in rows" :key="item.id">
        <td :style="onlineStyle(item)">{{ index + 1 }}</td>
        <td><input type="checkbox" :checked="item.show === 'T'" @change="$emit('toggle-status', item.id, item.show)" /></td>
        <td><template v-if="item.editable"><input v-model="item.department" /></template><template v-else>{{ item.department }}</template></td>
        <td><template v-if="item.editable"><input v-model="item.work_department" /></template><template v-else>{{ item.work_department }}</template></td>
        <td><template v-if="item.editable"><input v-model="item.jobnumber" /></template><template v-else>{{ item.jobnumber }}</template></td>
        <td><template v-if="item.editable"><input v-model="item.username" /></template><template v-else>{{ item.username }}</template></td>
        <td><template v-if="item.editable"><input v-model="item.remark" /></template><template v-else>{{ item.remark }}</template></td>
        <td v-if="!showActions">
          <span v-if="statusLocked(item)">{{ item.status }}，(應報考勤:{{ item.hr_time }}/hr) <button @click="$emit('delete-hr', item.id)">取消</button></span>
          <span v-else>
            <button v-for="s in statuses" :key="s" @click="$emit('status', item.jobnumber, s)">{{ s }}</button>
          </span>
        </td>
        <td v-if="!showActions && item.department?.substring(0, 6) !== item.out_department">{{ item.out_department }}</td>
        <td v-else-if="!showActions"></td>
        <td v-if="!showActions">{{ item.note }}</td>
        <td v-if="showActions"><button v-if="item.editable" @click="$emit('update-user', item)">完成</button><button v-else @click="$emit('delete-user', item.id)">Delete</button></td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
defineProps({ rows: { type: Array, default: () => [] }, showActions: Boolean });
defineEmits(['toggle-status', 'status', 'delete-hr', 'update-user', 'delete-user']);
const statuses = ['年休', '請假', '哺乳假', '工傷', '工傷陪護', '借出', '夜班', '備註'];
const statusLocked = (item) => ['年休', '請假', '哺乳假', '工傷', '工傷陪護', '借出', '新進員工', '夜班', '備註'].includes(item.status);
const onlineStyle = (item) => (item.online === '01' ? (item.out_department?.length > 9 ? { backgroundColor: 'red' } : { backgroundColor: '#19f032' }) : {});
</script>
