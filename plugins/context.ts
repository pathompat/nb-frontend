import type { User } from "@/composables/api/useUserApi";
import useAuth from "@/composables/useAuth";
import type { InjectionKey, Plugin } from "vue";

export type PluginInstance = ReturnType<typeof context>;
export const contextPluginSymbol: InjectionKey<PluginInstance> =
  Symbol("$context");

export function context() {
  const auth = useAuth();
  const router = useRouter();
  const userProfile = ref<User | null>(null);
  function getToken() {
    return localStorage.getItem("token");
  }
  async function getProfile() {
    const token = getToken();
    if (!token) {
      userProfile.value = null;
      console.log("redirect to login");
      router.push("/login");
      return null;
    }
    try {
      userProfile.value = await auth.getProfile(token);
    } catch (error) {
      console.error(error);
      userProfile.value = null;
      console.log("redirect to login");
      router.push("/login");
    }
  }
  async function refresh() {
    await getProfile();
  }
  return {
    getToken,
    getProfile,
    refresh,
    userProfile,
  };
}

const plugin: Plugin = {
  install: async (app, options) => {
    const sample = context();
    app.provide(contextPluginSymbol, sample);
  },
};

export default plugin;
