import type { Pagination } from "./api/useBaseApi";

export default function useStateTable<T>() {
  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });
  const tableState = ref<T>();
  return {
    pagination,
    tableState,
  };
}
