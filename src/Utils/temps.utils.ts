export const sendCodeTemp = (code: string, name: string) => {
  return `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333;">مرحبًا ${name} 👋</h2>
          <p style="color: #555; font-size: 16px;">لقد طلبت رمز التحقق الخاص بك. استخدم الرمز التالي لتأكيد هويتك:</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #ffecec; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; color: #d8000c;">
            ${code}
          </div>
          <p style="color: #555; font-size: 14px;">إذا لم تطلب رمز التحقق، يمكنك تجاهل هذا البريد بأمان.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">© 2025 جميع الحقوق محفوظة لبهاء وافى</p>
        </div>
        `
}
  