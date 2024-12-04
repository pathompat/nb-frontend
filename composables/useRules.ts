export function useRules() {
    const userNameRule = [
        (value: string) => !!value || 'กรุณากรอกบัญชีผู้ใช้งาน',
        (value: string) =>
            value.length >= 6 ||
            'บัญชีผู้ใช้งานต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
        (value: string) =>
            /^[A-Za-z]+$/.test(value) ||
            'บัญชีผู้ใช้งานต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น',
    ]

    const passwordRule = [
        (value: string) => !!value || 'กรุณากรอกรหัสผ่าน',
        (value: string) =>
            value.length >= 8 || 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
        (value: string) =>
            /[A-Z]/.test(value) || 'รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว',
        (value: string) =>
            /[a-z]/.test(value) || 'รหัสผ่านต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว',
        (value: string) =>
            /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
            'รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว',
        (value: string) =>
            /\d/.test(value) || 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว',
    ]
    const emtpyRule = [(value: string) => !!value || 'กรุณากรอกข้อมูล']
    return { userNameRule, passwordRule, emtpyRule }
}
