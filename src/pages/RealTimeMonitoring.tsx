import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

const RealTimeMonitoring = () => {
  return (
    <DashboardLayout>
      <Card className="p-8 gradient-card border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Real-Time Monitoring</h1>
        </div>
        
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            <strong className="text-foreground">المحتوى:</strong> هذه الصفحة ستعرض بيانات المراقبة الحية للمحطة الشمسية
          </p>
          
          <ul className="list-disc list-inside space-y-2 mr-6">
            <li>رسوم بيانية حية (Live Charts) لتوليد الطاقة</li>
            <li>حالة الأجهزة الآنية (Inverters, Panels, Controllers)</li>
            <li>بيانات حساسات الطقس الحية (Temperature, Irradiance, Wind Speed)</li>
            <li>مؤشرات الأداء في الوقت الفعلي (Real-time KPIs)</li>
            <li>تحديث تلقائي للبيانات كل بضع ثوانٍ</li>
          </ul>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default RealTimeMonitoring;
