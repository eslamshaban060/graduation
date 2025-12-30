import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";
import UserSetting from "@/components/setting/setting.jsx";
const Settings = () => {
  return (
    <DashboardLayout>
      <UserSetting />
    </DashboardLayout>
  );
};

export default Settings;
