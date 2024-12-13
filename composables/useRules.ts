export function useRules() {
    const userNameRule = [
        (value: string) => value != null || 'กรุณากรอกข้อมูล',
        (value: string) => !!value?.trim() || 'กรุณากรอกบัญชีผู้ใช้งาน',
        (value: string) =>
            value?.trim().length >= 6 ||
            'บัญชีผู้ใช้งานต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
        (value: string) =>
            /^[A-Za-z]+$/.test(value?.trim() || '') ||
            'บัญชีผู้ใช้งานต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น',
        (value: string) =>
            /^[a-z]+$/.test(value?.trim() || '') ||
            'บัญชีผู้ใช้งานต้องเป็นตัวอักษรภาษาอังกฤษพิมพ์เล็กเท่านั้น',
    ]

    const morethanZeroRule = [
        (value: string) =>
            +`${value}`.trim() > 0 || 'กรุณากรอกข้อมูลที่มากกว่า 0',
        (value: string) => !!`${value}`.trim() || 'กรุณากรอกข้อมูล',
    ]

    const passwordRule = [
        (value: string) => value != null || 'กรุณากรอกข้อมูล',
        (value: string) => !!value?.trim() || 'กรุณากรอกรหัสผ่าน',
        (value: string) =>
            value?.trim().length >= 8 ||
            'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
        (value: string) =>
            /[A-Z]/.test(value?.trim() || '') ||
            'รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว',
        (value: string) =>
            /[a-z]/.test(value?.trim() || '') ||
            'รหัสผ่านต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว',
        (value: string) =>
            /[!@#$%^&*(),.?":{}|<>]/.test(value?.trim() || '') ||
            'รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว',
        (value: string) =>
            /\d/.test(value?.trim() || '') ||
            'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว',
    ]

    const emtpyRule = [
        (value: string) => value != null || 'กรุณากรอกข้อมูล',
        (value: string) => !!`${value}`.trim() || 'กรุณากรอกข้อมูล',
    ]

    const phoneNumberRule = [
        (value: string) => {
            if (value == null) {
                return 'กรุณากรอกข้อมูล'
            }
            const thaiPhoneRegex = /^(06|08|09)\d{8}$/
            if (!value.trim()) {
                return 'กรุณากรอกเบอร์มือถือ'
            } else if (!thaiPhoneRegex.test(value.trim())) {
                return 'กรุณากรอกเบอร์มือถือที่ถูกต้อง (เช่น 08xxxxxxxx)'
            }
            return true
        },
    ]

    const noEmojiOrEscapeCharacterRule = [
        (v: string) => v != null || 'กรุณากรอกข้อมูล',
        (v: string) =>
            !/[^\x00-\x7F]/.test(v?.trim() || '') || 'ไม่สามารถใช้ emoji ได้',
        (v: string) =>
            !/[\\]/.test(v?.trim() || '') ||
            'ไม่สามารถใช้ escape character \\ ได้',
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
