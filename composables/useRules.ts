export function useRules() {
    const userNameRule = [
        (value: string) => !!value || 'กรุณากรอกบัญชีผู้ใช้งาน',
        (value: string) =>
            value.length >= 6 ||
            'บัญชีผู้ใช้งานต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
        (value: string) =>
            /^[A-Za-z]+$/.test(value) ||
            'บัญชีผู้ใช้งานต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น',
        (value: string) =>
            /^[a-z]+$/.test(value) ||
            'บัญชีผู้ใช้งานต้องเป็นตัวอักษรภาษาอังกฤษพิมพ์เล็กเท่านั้น',
    ]
    const morethanZeroRule = [
        (value: string) => !!value || 'กรุณากรอกข้อมูล',
        (value: string) => +value > 0 || 'กรุณากรอกข้อมูลที่มากกว่า 0',
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
    const phoneNumberRule = [
        (value: string) => {
            const thaiPhoneRegex = /^(06|08|09)\d{8}$/
            if (!value) {
                return 'กรุณากรอกเบอร์มือถือ'
            } else if (!thaiPhoneRegex.test(value)) {
                return 'กรุณากรอกเบอร์มือถือที่ถูกต้อง (เช่น 08xxxxxxxx)'
            }
            return true
        },
    ]
    const noEmojiOrEscapeCharacterRule = [
        (v: string) => !/[^\x00-\x7F]/.test(v) || 'ไม่สามารถใช้ emoji ได้',
        (v: string) =>
            !/[\\]/.test(v) || 'ไม่สามารถใช้ escape character \\ ได้',
        (v: string) => true,
    ]
    return {
        userNameRule,
        passwordRule,
        emtpyRule,
        phoneNumberRule,
        morethanZeroRule,
        noEmojiOrEscapeCharacterRule,
    }
}
