import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

const InvertersControllers = () => {
  return (
    <DashboardLayout>
      <Card className="p-8 gradient-card border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Inverters & Controllers</h1>
        </div>
        
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            <strong className="text-foreground">المحتوى:</strong> هذه الصفحة ستعرض تفاصيل الإنفرترات والمتحكمات
          </p>
          
          <ul className="list-disc list-inside space-y-2 mr-6">
            <li>قائمة بجميع الإنفرترات مع حالة كل واحد (Online/Offline/Warning)</li>
            <li>تفاصيل كل إنفرتر: الجهد، التيار، الطاقة المولدة، درجة الحرارة، الكفاءة</li>
            <li>أزرار التحكم: Start / Stop / Reset / Maintenance Mode</li>
            <li>سجل تاريخي لأداء كل إنفرتر</li>
            <li>إنذارات خاصة بكل جهاز (Overheating, Low Efficiency, Faults)</li>
          </ul>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default InvertersControllers;
