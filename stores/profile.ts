import type { User } from '~/models/user/user'

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null as User | null,
    }),

    getters: {
        getProfile(state): User | null {
            return state.profile
        },
    },

    actions: {
        setProfile(profile: User) {
            this.profile = profile
        },
        clearProfile() {
            this.profile = null
        },
    },
})
