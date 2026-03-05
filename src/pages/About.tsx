import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import SolarChatbot from "@/components/about/about.jsx";
const About = () => {
  return (
    <DashboardLayout>
      <SolarChatbot />
    </DashboardLayout>
  );
};

export default About;
