<script setup lang="ts">
import { McTable } from '@/components'
import { tableColumns, tableData } from '@/mocks/tableData'
import { useRouter } from 'vue-router'

const router = useRouter()

const asd = (row) => {
  router.push({ name: 'qwe', params: { id: row.id } })
  console.log(row)
}
</script>

<template>
  <mc-table
    :columns="tableColumns"
    :data="tableData"
    @row-click="asd"
    :height="600"
    :to-table-card-props="{ bebe: 111 }"
    @table-card-opened="console.log('table-card-opened', $event)"
  >
    <template #channel="{ row }">
      {{ row.id }}
    </template>
  </mc-table>
</template>

<style></style>
