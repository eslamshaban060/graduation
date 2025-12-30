import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import SolarChatbot from "@/components/about/about.jsx";
const About = () => {
  return (
    <DashboardLayout>
      {/* <Card className="p-8 gradient-card border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center">
            <Info className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">About / Help</h1>
        </div>

        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            <strong className="text-foreground">المحتوى:</strong> هذه الصفحة ستعرض معلومات النظام والمساعدة
          </p>

          <ul className="list-disc list-inside space-y-2 mr-6">
            <li>معلومات النظام: الإصدار، تاريخ التحديث الأخير، رقم البناء</li>
            <li>نبذة عن المشروع والأهداف</li>
            <li>فريق العمل: أسماء المطورين والمهندسين</li>
            <li>اسم المشرف الرئيسي: د. ابتسام</li>
            <li>معلومات جامعة المنيا والكلية والقسم</li>
            <li>دليل الاستخدام (User Manual) وتعليمات التشغيل</li>
            <li>الأسئلة الشائعة (FAQ)</li>
            <li>معلومات الاتصال والدعم الفني</li>
            <li>رخصة البرنامج والحقوق الملكية</li>
          </ul>
        </div>
      </Card> */}
      <SolarChatbot />
    </DashboardLayout>
  );
};

export default About;
