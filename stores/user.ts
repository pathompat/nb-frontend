export const useUserStore = defineStore('user', () => {

  // store
  const users = ref<UserInfo[]>([])

  // actions
  const fetchUsers = async () => {
    const { data }: any = await useFetch('/api/user/');
    if (data.value) {
      users.value = data.value
    }
  }

  return {
    users,
    fetchUsers,
  };
})

interface UserInfo {
  id: number
  username: string
  store: string
  createdAt: string
  updatedAt: string
}