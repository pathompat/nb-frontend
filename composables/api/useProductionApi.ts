import useBaseApi, { type Pagination } from "@/composables/api/useBaseApi";
export interface Production {
  id: number;
  name: string;
  date: string;
  school: string;
  shop: string;
  phone: string;
  address: string;
  dueDate: string;
  estimateDate: string;
  status: PRINTSTATUS;
  items: Item[];
  remark?: string;
}
interface Item {
  hasPlan: boolean;
  amount: number;
  status: PRINTSTATUS;
  plate: PLATE;
  gram: number;
  color: number;
  line: LINE;
  page: number;
}
export enum LINE {
  SINGLE = 1,
  HALF = 2,
}
export enum PLATE {
  BIG = 1,
  SMALL = 2,
  EXTRA = 3,
}
export enum PRINTSTATUS {
  OUTBOUND = 1,
  PRINT = 2,
  SEWING = 3,
  PACK = 4,
  READY = 5,
}
export const statuses = ref([
  { title: "ออกเเบบ", value: PRINTSTATUS.OUTBOUND },
  { title: "พิมพ์", value: PRINTSTATUS.PRINT },
  { title: "เย็บเข้าเล่ม", value: PRINTSTATUS.SEWING },
  { title: "แพ็ค", value: PRINTSTATUS.PACK },
  { title: "พร้อมจัดส่ง", value: PRINTSTATUS.READY },
]);
export const statusColors = [
  { id: PRINTSTATUS.PRINT, color: "#FF9800" },
  { id: PRINTSTATUS.OUTBOUND, color: "#B0BEC5" },
  { id: PRINTSTATUS.SEWING, color: "#2196F3" },
  { id: PRINTSTATUS.PACK, color: "#9C27B0" },
  { id: PRINTSTATUS.READY, color: "#4CAF50" },
];
export const lines = [
  { title: "เดี่ยว", value: LINE.SINGLE },
  { title: "ครึ่ง", value: LINE.HALF },
];
export const plates = [
  { title: "ใหญ่", value: PLATE.BIG },
  { title: "เล็ก", value: PLATE.SMALL },
  { title: "พิเศษ", value: PLATE.EXTRA },
];
const mockProductions: Production[] = [
  {
    id: 1,
    name: "สั่งผลิตที่ 1",
    date: new Date("10/10/2024").toLocaleDateString("th-TH"),
    school: "โรงเรียนบ้านท่าช้าง",
    shop: "คุณจรัญ",
    phone: "0812345678",
    address: "ถ.สุขุมวิท ต.ท่าช้าง อ.เมือง จ.สมุทรปราการ",
    dueDate: new Date("10/10/2024").toLocaleDateString("th-TH"),
    estimateDate: new Date("10/10/2024").toLocaleDateString("th-TH"),
    status: PRINTSTATUS.PRINT,
    items: [
      {
        hasPlan: true,
        amount: 6000,
        status: PRINTSTATUS.PRINT,
        plate: PLATE.SMALL,
        gram: 60,
        color: 1,
        line: LINE.HALF,
        page: 40,
      },
      {
        hasPlan: true,
        amount: 12000,
        status: PRINTSTATUS.SEWING,
        plate: PLATE.SMALL,
        gram: 60,
        color: 1,
        line: LINE.HALF,
        page: 40,
      },
      {
        hasPlan: false,
        amount: 3300,
        status: PRINTSTATUS.OUTBOUND,
        plate: PLATE.BIG,
        gram: 60,
        color: 1,
        line: LINE.HALF,
        page: 40,
      },
    ],
    remark: "สั่งผลิตที่ 1",
  },
  {
    id: 2,
    name: "สั่งผลิตที่ 2",
    date: new Date("10/10/2024").toLocaleDateString("th-TH"),
    school: "โรงเรียนบ้านท่าช้าง",
    shop: "คุณจรัญ",
    phone: "0812345678",
    address: "ถ.สุขุมวิท ต.ท่าช้าง อ.เมือง จ.สมุทรปราการ",
    dueDate: new Date("10/10/2024").toLocaleDateString("th-TH"),
    estimateDate: new Date("10/10/2024").toLocaleDateString("th-TH"),
    status: PRINTSTATUS.PRINT,
    items: [
      {
        hasPlan: false,
        amount: 3300,
        status: PRINTSTATUS.OUTBOUND,
        plate: PLATE.BIG,
        gram: 60,
        color: 1,
        line: LINE.HALF,
        page: 40,
      },
    ],
  },
  {
    id: 3,
    name: "สั่งผลิตที่ 3",
    date: new Date("10/10/2024").toLocaleDateString("th-TH"),
    school: "โรงเรียนบ้านท่าช้าง",
    phone: "0812345678",
    address: "ถ.สุขุมวิท ต.ท่าช้าง อ.เมือง จ.สมุทรปราการ",
    dueDate: new Date("10/10/2024").toLocaleDateString("th-TH"),
    estimateDate: new Date("10/10/2024").toLocaleDateString("th-TH"),
    shop: "คุณจรัญ",
    status: PRINTSTATUS.PRINT,
    items: [
      {
        hasPlan: true,
        amount: 6000,
        status: PRINTSTATUS.PRINT,
        plate: PLATE.SMALL,
        gram: 60,
        color: 1,
        line: LINE.HALF,
        page: 40,
      },
    ],
  },
];
export const getStatusTitle = (value: number) =>
  statuses.value.find((status) => status.value === value)?.title ||
  "ไม่ทราบสถานะ";
export default function useProductionApi() {
  const controller = "production";
  const { getRequest, postRequest } = useBaseApi();
  return {
    async getAll(): Promise<Pagination<Production[]>> {
      try {
        const response = await getRequest<Pagination<Production[]>>(controller);
        return response;
      } catch (error) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              items: JSON.parse(JSON.stringify(mockProductions)),
              total: mockProductions.length,
              page: 1,
              totalItems: mockProductions.length,
              itemsPerPage: 10,
            } as Pagination<Production[]>);
          }, 1000);
        });
      }
    },
    async create(production: Production) {
      try {
        const response = await postRequest<Production>(controller, production);
        return response;
      } catch (error) {
        return new Promise((resolve) => {
          mockProductions.push(production);
          setTimeout(() => {
            resolve(production);
          }, 1000);
        });
      }
    },
    async getOne(id: number): Promise<Production> {
      try {
        const response = await getRequest<Production>(`${controller}/${id}`);
        return response;
      } catch (error) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockProductions.find((p) => p.id === id)!);
          }, 1000);
        });
      }
    },
  };
}
