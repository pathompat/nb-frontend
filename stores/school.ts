import type { CraeteSchool, School } from '@/models/school/school'
import type { ApiResult } from '~/models/api/api'

export const useSchoolStore = defineStore('schools', () => {
    const schools = ref<School[]>([])
    const school = ref<School>({} as School)
    const controller = 'school'
    async function fetchAllSchools(): Promise<School[]> {
        const api = useBaseApi()
        try {
            const allschools =
                await api.getRequest<ApiResult<School[]>>(controller)
            schools.value = allschools.data
            return allschools.data
        } catch (error) {
            throw error
        }
    }
    async function fetchAllSchoolsWithCustomer(
        customerId: string
    ): Promise<School[]> {
        const api = useBaseApi()
        try {
            const allschools = await api.getRequest<ApiResult<School[]>>(
                `${controller}?userId=${customerId}`
            )
            schools.value = allschools.data
            return allschools.data
        } catch (error) {
            throw error
        }
    }
    async function fetchSchoolById(id: string) {
        const api = useBaseApi()
        try {
            school.value = await api.getRequest<School>(`${controller}/${id}`)
        } catch (error) {
            throw error
        }
    }
    async function createSchool(
        customerId: string,
        school: CraeteSchool
    ): Promise<School> {
        const api = useBaseApi()
        try {
            return await api.postRequest<School>(controller, {
                ...school,
                userId: customerId,
            })
        } catch (error) {
            throw error
        }
    }
    async function updateSchool(
        id: string,
        updatedSchool: CraeteSchool
    ): Promise<School> {
        const api = useBaseApi()
        try {
            return await api.postRequest<School>(controller, updatedSchool)
        } catch (error) {
            throw error
        }
    }
    async function deleteSchool(id: string): Promise<boolean> {
        const api = useBaseApi()
        try {
            return await api.deleteRequest<boolean>(`${controller}/${id}`)
        } catch (error) {
            throw error
        }
    }
    return {
        schools,
        fetchAllSchools,
        fetchSchoolById,
        createSchool,
        updateSchool,
        school,
        deleteSchool,
        fetchAllSchoolsWithCustomer,
    }
})
