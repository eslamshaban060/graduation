import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Send,
  Bot,
  User,
  Sun,
  Info,
  Wind,
  Droplets,
  ThermometerSun,
  Download,
  RefreshCw,
  CloudSun,
} from "lucide-react";

// ============================================
// KNOWLEDGE BASE & TRAINING DATA
// ============================================

const KNOWLEDGE_BASE = {
  // Project Information
  projectInfo: {
    name: "Smart Solar MonitorManagement & Monitoring System",
    year: "2026",
    college: "Faculty of Engineering",
    department: "Electrical Engineering Department",
    specialization: "Communications & Electronics",
    supervisor: "Dr. Mona Abdelkarim",
    team: [
      "Islam Shaban Gomaa",
      "Abdelrahman Ahmed",
      "Mohamed Hesham El-Gayoshi",
      "Mohamed Hesham Mostafa",
      "Omar Khaled",
      "Ismail Mohamed",
    ],
    components: [
      "Networks & Cybersecurity",
      "Web Development & Cloud",
      "Embedded Systems & Hardware",
      "Artificial Intelligence & Analytics",
    ],
    location: "Minya Solar Farm, Egypt",
  },

  // Temperature Ranges
  temperatureRanges: {
    excellent: { min: 10, max: 25, efficiency: 100, status: "Excellent" },
    good: { min: 25, max: 35, efficiencyLoss: 0.5, status: "Good" },
    warning: { min: 35, max: 45, efficiencyLoss: 0.5, status: "Warning" },
    critical: { min: 45, max: 60, efficiencyLoss: 0.5, status: "Critical" },
  },

  // Wind Speed Ranges
  windRanges: {
    calm: { min: 0, max: 5, status: "Calm", risk: "Low" },
    moderate: { min: 5, max: 10, status: "Moderate", risk: "Low" },
    active: { min: 10, max: 15, status: "Active", risk: "Medium" },
    strong: { min: 15, max: 25, status: "Strong", risk: "High" },
    dangerous: { min: 25, max: 100, status: "Dangerous", risk: "Critical" },
  },

  // Humidity Ranges
  humidityRanges: {
    low: { min: 0, max: 40, status: "Low", maintenance: "Normal" },
    normal: { min: 40, max: 70, status: "Normal", maintenance: "Monitor" },
    high: { min: 70, max: 85, status: "High", maintenance: "Within 48h" },
    veryHigh: {
      min: 85,
      max: 100,
      status: "Very High",
      maintenance: "Immediate",
    },
  },

  // Cloud Cover Ranges
  cloudRanges: {
    clear: { min: 0, max: 20, irradiance: "900-1000", efficiency: "95-100%" },
    partlyCloudy: {
      min: 20,
      max: 50,
      irradiance: "600-800",
      efficiency: "70-85%",
    },
    cloudy: { min: 50, max: 80, irradiance: "300-500", efficiency: "40-60%" },
    overcast: { min: 80, max: 100, irradiance: "0-200", efficiency: "10-30%" },
  },

  // Solar Panel Information
  solarPanels: {
    types: [
      { name: "Monocrystalline", efficiency: "18-22%", cost: "High" },
      { name: "Polycrystalline", efficiency: "15-17%", cost: "Medium" },
      { name: "Thin Film", efficiency: "10-12%", cost: "Low" },
      { name: "Advanced Panels", efficiency: "Up to 24%", cost: "Very High" },
    ],
    lifespan: "25-30 years",
    optimalAngle: "Depends on latitude",
    degradation: "0.5-1% annually",
  },

  // Hardware & Sensors
  hardware: {
    sensors: [
      {
        name: "Temperature Sensor",
        function: "Measures panel temperature",
        accuracy: "±0.5°C",
      },
      {
        name: "Irradiance Sensor",
        function: "Measures solar radiation",
        unit: "W/m²",
      },
      {
        name: "Wind Sensor",
        function: "Measures speed & direction",
        unit: "m/s",
      },
      {
        name: "Humidity Sensor",
        function: "Measures relative humidity",
        unit: "%",
      },
      {
        name: "Current & Voltage Sensor",
        function: "Measures power output",
        unit: "V, A, W",
      },
    ],
    controllers: ["Arduino", "ESP32", "Raspberry Pi", "Industrial PLCs"],
    communication: ["WiFi", "4G/5G", "LoRaWAN", "MQTT Protocol"],
    cloud: ["Data Storage", "Real-time Analytics", "Alerts & Notifications"],
  },

  // Maintenance Schedule
  maintenance: {
    daily: [
      "Visual inspection of panels",
      "Monitor production output",
      "Check system alerts",
    ],
    weekly: [
      "Inspect cables & connections",
      "Read meters",
      "Light cleaning if needed",
    ],
    monthly: [
      "Deep cleaning of panels",
      "Check electrical connections",
      "Test safety systems",
    ],
    yearly: [
      "Comprehensive system inspection",
      "Full performance testing",
      "Software updates",
      "Structural support check",
    ],
  },

  // Cybersecurity
  cybersecurity: {
    threats: [
      "Control system breaches",
      "DDoS attacks",
      "Malware infections",
      "Data leakage",
    ],
    protections: [
      {
        name: "Encryption",
        details: "SSL/TLS for communications, encrypted data storage",
      },
      {
        name: "Authentication",
        details: "Two-factor auth, strong passwords, limited access",
      },
      {
        name: "Firewall",
        details: "Network protection, packet filtering, access control",
      },
      {
        name: "Monitoring",
        details: "Activity logs, intrusion detection, real-time alerts",
      },
      {
        name: "Updates",
        details: "Regular security patches, vulnerability scanning",
      },
    ],
  },
};

// ============================================
// TRAINING DATA - Q&A PAIRS
// ============================================

const TRAINING_DATA = {
  temperature: [
    {
      question: "What is the optimal temperature for solar panels?",
      answer:
        "The optimal temperature range for solar panels is 10-25°C (50-77°F). At these temperatures, panels operate at peak efficiency (95-100%).",
    },
    {
      question: "How does high temperature affect panels?",
      answer:
        "Every degree above 25°C reduces panel efficiency by 0.5%. At 35°C, efficiency drops by 5%, and at 45°C it drops by 10%.",
    },
    {
      question: "Is cold weather bad for solar panels?",
      answer:
        "Cold weather is actually better than hot weather for panels. However, temperatures below 10°C may slightly reduce efficiency due to decreased electron movement.",
    },
  ],

  wind: [
    {
      question: "What is a safe wind speed?",
      answer:
        "Wind speeds up to 10 m/s are completely safe. 10-15 m/s requires monitoring. Above 15 m/s poses risk to equipment.",
    },
    {
      question: "Are winds beneficial for panels?",
      answer:
        "Yes! Light winds (5-10 m/s) help cool the panels and improve efficiency, especially on hot days.",
    },
  ],

  maintenance: [
    {
      question: "How often should panels be cleaned?",
      answer:
        "In desert areas like Minya, cleaning every 2-4 weeks is recommended. In less dusty areas, monthly cleaning is sufficient.",
    },
    {
      question: "What happens if panels aren't cleaned?",
      answer:
        "Dust accumulation reduces efficiency by 10-30%. In severe cases, losses can reach 50%.",
    },
    {
      question: "Does rain clean the panels?",
      answer:
        "Yes, heavy rain naturally cleans panels. However, in arid regions, you can't rely on it alone.",
    },
  ],

  efficiency: [
    {
      question: "What is typical solar panel efficiency?",
      answer:
        "Monocrystalline: 18-22%, Polycrystalline: 15-17%, Advanced panels: up to 24%.",
    },
    {
      question: "Why does efficiency decrease over time?",
      answer:
        "Panels degrade at 0.5-1% annually due to weather exposure. After 25 years, they retain about 80% of original efficiency.",
    },
  ],

  project: [
    {
      question: "What is the project goal?",
      answer:
        "Build an integrated system for managing and monitoring a solar Monitorusing IoT, AI, and cybersecurity.",
    },
    {
      question: "What technologies are used?",
      answer:
        "Networks & Cybersecurity, Web & Cloud Development, Embedded Systems (Arduino/ESP32), AI for analytics.",
    },
  ],

  security: [
    {
      question: "How do we protect the system from hacking?",
      answer:
        "We use SSL/TLS encryption, two-factor authentication, firewalls, continuous monitoring, and regular security updates.",
    },
    {
      question: "What are the biggest security threats?",
      answer:
        "Control system breaches, DDoS attacks on servers, malware, and production data leakage.",
    },
  ],

  technical: [
    {
      question: "What sensors are used?",
      answer:
        "Temperature, solar irradiance, wind, humidity, current/voltage sensors, and sun tracking devices.",
    },
    {
      question: "How is data transmitted?",
      answer:
        "Via WiFi or 4G to the cloud using MQTT protocol, with real-time analysis and alerts.",
    },
  ],
};

// ============================================
// RESPONSE TEMPLATES
// ============================================

const RESPONSE_TEMPLATES = {
  temperature: {
    excellent: (temp, efficiency) =>
      `✅ **Excellent Temperature: ${temp}°C**\n\n🎯 **Analysis:**\n• Temperature in optimal range!\n• Panel efficiency at peak level\n• Perfect conditions for production\n\n💡 **Expected Efficiency: ${efficiency}%**\n\n📈 Best time to run the Monitorat full capacity!`,

    good: (temp, efficiency, loss) =>
      `⚠️ **High Temperature: ${temp}°C**\n\n📊 **Analysis:**\n• Beginning of efficiency decline\n• Each degree above 25°C reduces efficiency by 0.5%\n• Expected loss: ${loss.toFixed(
        1
      )}%\n\n✅ **Recommendations:**\n• Monitor panel temperature\n• Ensure good ventilation\n• Expected efficiency: ${efficiency}%`,

    critical: (temp, efficiency, loss) =>
      `🔥 **Warning: Very High Temperature ${temp}°C**\n\n⛔ **Analysis:**\n• Significant efficiency drop\n• Potential long-term panel damage\n• Production loss: ${loss.toFixed(
        1
      )}%\n\n🚨 **Urgent Actions:**\n• Check cooling system\n• Monitor panel condition hourly\n• Consider additional cooling\n• Expected efficiency: ${efficiency}%`,
  },

  wind: {
    calm: (speed) =>
      `✅ **Low Wind Speed: ${speed} m/s**\n\n📊 **Analysis:**\n• Calm winds - ideal for operation\n• No impact on equipment\n• Completely safe\n\n💡 **Status: Excellent** ✨`,

    moderate: (speed) =>
      `✅ **Moderate Wind Speed: ${speed} m/s**\n\n📊 **Analysis:**\n• Normal winds\n• May help cool panels\n• No concerns\n\n💡 **Status: Very Good** 👍`,

    strong: (speed) =>
      `⚠️ **Alert: Active Winds ${speed} m/s**\n\n📊 **Analysis:**\n• Relatively strong winds\n• Possible panel movement\n• Dust may accumulate\n\n✅ **Recommendations:**\n• Monitor panel stability\n• Check mounting system\n• Schedule cleaning after winds calm`,

    dangerous: (speed) =>
      `🚨 **Warning: Very Strong Winds ${speed} m/s**\n\n⛔ **Analysis:**\n• Dangerous winds for equipment\n• Risk of panel damage\n• Threat to Monitorstructure\n\n🚨 **Emergency Actions:**\n• Shutdown if possible\n• Comprehensive equipment check\n• Secure all moving parts\n• Call emergency team`,
  },

  humidity: {
    low: (humidity) =>
      `✅ **Low Humidity: ${humidity}%**\n\n📊 **Analysis:**\n• Ideal humidity for solar panels\n• Reduced dust accumulation\n• No dew formation on panels\n\n💡 **Status: Excellent for Production** 🌞`,

    normal: (humidity) =>
      `✅ **Moderate Humidity: ${humidity}%**\n\n📊 **Analysis:**\n• Humidity in normal range\n• Light morning dew possible\n• No significant impact on production\n\n💡 **Status: Good** 👌`,

    high: (humidity) =>
      `⚠️ **High Humidity: ${humidity}%**\n\n📊 **Analysis:**\n• Possible dew formation on panels\n• Dust may accumulate faster\n• Slight impact on efficiency\n\n✅ **Recommendations:**\n• Schedule cleaning within 48 hours\n• Monitor panel condition in morning\n• Check cables and connections`,

    veryHigh: (humidity) =>
      `🚨 **Very High Humidity: ${humidity}%**\n\n⚠️ **Analysis:**\n• Very high humidity levels\n• Heavy dew formation likely\n• Risk of electronic component damage\n\n🚨 **Required Actions:**\n• Clean panels immediately\n• Check electrical insulation\n• Close production monitoring\n• Verify proper grounding`,
  },

  clouds: {
    clear: (clouds, irradiance, efficiency) =>
      `☀️ **Clear Sky: ${clouds}% clouds**\n\n📊 **Analysis:**\n• Excellent solar irradiance\n• Production at peak level\n• Perfect conditions\n\n💡 **Expected Irradiance: ${irradiance} W/m²**\n🎯 **Efficiency: ${efficiency}**`,

    partlyCloudy: (clouds, irradiance, efficiency) =>
      `⛅ **Partly Cloudy: ${clouds}% clouds**\n\n📊 **Analysis:**\n• Good production with fluctuations\n• Slight decrease in irradiance\n• Normal condition\n\n💡 **Expected Irradiance: ${irradiance} W/m²**\n📊 **Efficiency: ${efficiency}**`,

    cloudy: (clouds, irradiance, efficiency) =>
      `☁️ **Cloudy Sky: ${clouds}% clouds**\n\n📊 **Analysis:**\n• Noticeable production decrease\n• Limited irradiance\n• Fluctuations in power output\n\n⚠️ **Expected Irradiance: ${irradiance} W/m²**\n📉 **Efficiency: ${efficiency}**`,

    overcast: (clouds, irradiance, efficiency) =>
      `🌧️ **Overcast Sky: ${clouds}% clouds**\n\n📊 **Analysis:**\n• Very low production\n• Relying on diffuse light only\n• Possible precipitation\n\n⚠️ **Expected Irradiance: ${irradiance} W/m²**\n📉 **Efficiency: ${efficiency}**\n\n💡 Good time for preventive maintenance!`,
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

const SolarChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `👋 Hello! I'm your AI assistant for the ${KNOWLEDGE_BASE.projectInfo.location}.\n\nI can help you with:\n• Analyzing weather impact on solar panels\n• Evaluating Monitorefficiency\n• Providing maintenance recommendations\n• Answering questions about the project\n\nTry asking me about temperature, wind, or any weather data! 🌞\n\nOr ask: "What's the weather like today?"`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = "bdeb06fa12b44fa44b843321dc99e5b2";
  const MINYA_LAT = 28.0871;
  const MINYA_LON = 30.7618;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch weather data
  const fetchWeatherData = async () => {
    try {
      setLoadingWeather(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${MINYA_LAT}&lon=${MINYA_LON}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      setWeather(data);
      return data;
    } catch (err) {
      console.error("Weather fetch error:", err);
      return null;
    } finally {
      setLoadingWeather(false);
    }
  };

  // Calculate solar irradiance
  const calculateSolarIrradiance = (weatherData) => {
    if (!weatherData) return 0;
    const maxIrradiance = 1000;
    const cloudFactor = (100 - weatherData.clouds.all) / 100;
    const hour = new Date().getHours();
    let sunAngleFactor = 0;
    if (hour >= 6 && hour <= 18) {
      sunAngleFactor = Math.sin(((hour - 6) / 12) * Math.PI);
    }
    return (maxIrradiance * cloudFactor * sunAngleFactor).toFixed(0);
  };

  // Main analysis function
  const analyzeMessage = async (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Weather queries
    if (
      msg.includes("weather") ||
      msg.includes("today") ||
      msg.includes("current") ||
      msg.includes("now")
    ) {
      const weatherData = await fetchWeatherData();
      if (!weatherData) {
        return "❌ Sorry, I couldn't fetch the weather data. Please try again.";
      }
      return analyzeCurrentWeather(weatherData);
    }

    // Solar impact query
    if (
      msg.includes("solar") &&
      (msg.includes("good") ||
        msg.includes("production") ||
        msg.includes("impact"))
    ) {
      const weatherData = weather || (await fetchWeatherData());
      if (!weatherData) {
        return "❌ Sorry, I couldn't fetch the weather data. Please try again.";
      }
      return analyzeSolarImpact(weatherData);
    }

    // Temperature analysis
    if (
      msg.includes("temperature") ||
      msg.includes("temp") ||
      /\d+.*degree/.test(msg) ||
      /\d+.*°/.test(msg)
    ) {
      const tempMatch = msg.match(/\d+/);
      if (tempMatch) {
        const temp = parseInt(tempMatch[0]);
        return analyzeTemperature(temp);
      }
      return '📊 Please tell me the current temperature (example: "temperature 32")';
    }

    // Wind analysis
    if (msg.includes("wind")) {
      const windMatch = msg.match(/\d+/);
      if (windMatch) {
        const wind = parseInt(windMatch[0]);
        return analyzeWind(wind);
      }
      return '💨 Please tell me the wind speed in m/s (example: "wind 8")';
    }

    // Humidity analysis
    if (msg.includes("humidity")) {
      const humMatch = msg.match(/\d+/);
      if (humMatch) {
        const humidity = parseInt(humMatch[0]);
        return analyzeHumidity(humidity);
      }
      return '💧 Please tell me the humidity percentage (example: "humidity 65")';
    }

    // Cloud cover
    if (msg.includes("cloud")) {
      const cloudMatch = msg.match(/\d+/);
      if (cloudMatch) {
        const clouds = parseInt(cloudMatch[0]);
        return analyzeCloudCover(clouds);
      }
      return '☁️ Please tell me the cloud cover percentage (example: "clouds 40%")';
    }

    // Project info
    if (
      msg.includes("project") ||
      msg.includes("team") ||
      msg.includes("about")
    ) {
      return getProjectInfo();
    }

    // Solar panels
    if (msg.includes("panel") || msg.includes("solar panel")) {
      return getSolarPanelInfo();
    }

    // Efficiency
    if (msg.includes("efficiency") || msg.includes("production")) {
      return getEfficiencyInfo();
    }

    // Maintenance
    if (
      msg.includes("maintenance") ||
      msg.includes("cleaning") ||
      msg.includes("clean")
    ) {
      return getMaintenanceInfo();
    }

    // Weather impact
    if (msg.includes("impact") || msg.includes("affect")) {
      return getWeatherImpactInfo();
    }

    // Cybersecurity
    if (
      msg.includes("security") ||
      msg.includes("cyber") ||
      msg.includes("protect")
    ) {
      return getCybersecurityInfo();
    }

    // Hardware
    if (msg.includes("hardware") || msg.includes("sensor")) {
      return getHardwareInfo();
    }

    // Search training data
    const answer = searchTrainingData(msg);
    if (answer) return answer;

    return getDefaultResponse();
  };

  // Analyze current weather
  const analyzeCurrentWeather = (weatherData) => {
    const temp = weatherData.main.temp;
    const wind = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const clouds = weatherData.clouds.all;
    const irradiance = calculateSolarIrradiance(weatherData);

    const tempStatus =
      temp >= 10 && temp <= 25
        ? "✅ Excellent"
        : temp > 25 && temp <= 35
        ? "⚠️ High"
        : "🔥 Very High";
    const windStatus =
      wind < 10 ? "✅ Safe" : wind < 15 ? "⚠️ Monitor" : "🚨 Caution";
    const cloudStatus =
      clouds < 20 ? "☀️ Clear" : clouds < 50 ? "⛅ Partly Cloudy" : "☁️ Cloudy";

    return `🌤️ **Current Weather at Minya Solar Farm**\n\n🌡️ **Temperature:** ${temp.toFixed(
      1
    )}°C ${tempStatus}\n💨 **Wind Speed:** ${wind.toFixed(
      1
    )} m/s ${windStatus}\n💧 **Humidity:** ${humidity}%\n${cloudStatus} **Cloud Cover:** ${clouds}%\n☀️ **Solar Irradiance:** ~${irradiance} W/m²\n\n📊 **Overall Assessment:**\n${getOverallAssessment(
      temp,
      wind,
      humidity,
      clouds,
      irradiance
    )}`;
  };

  // Analyze solar impact
  const analyzeSolarImpact = (weatherData) => {
    const temp = weatherData.main.temp;
    const clouds = weatherData.clouds.all;
    const irradiance = calculateSolarIrradiance(weatherData);

    const tempEfficiency =
      temp >= 10 && temp <= 25 ? 100 : Math.max(50, 100 - (temp - 25) * 0.5);
    const cloudEfficiency =
      clouds < 20 ? 100 : clouds < 50 ? 75 : clouds < 80 ? 50 : 25;
    const overallEfficiency = Math.min(tempEfficiency, cloudEfficiency);

    return `⚡ **Solar Production Analysis**\n\n☀️ **Current Irradiance:** ${irradiance} W/m²\n🌡️ **Temperature Impact:** ${tempEfficiency.toFixed(
      0
    )}% efficiency\n☁️ **Cloud Impact:** ${cloudEfficiency.toFixed(
      0
    )}% efficiency\n\n📈 **Overall Efficiency:** ${overallEfficiency.toFixed(
      0
    )}%\n\n${
      overallEfficiency > 80
        ? "✅ Excellent conditions for solar production!"
        : overallEfficiency > 60
        ? "📊 Good production expected"
        : "⚠️ Reduced production due to weather conditions"
    }`;
  };

  const getOverallAssessment = (temp, wind, humidity, clouds, irradiance) => {
    const issues = [];

    if (temp > 35) issues.push("High temperature reducing efficiency");
    if (wind > 15) issues.push("Strong winds - monitor equipment");
    if (humidity > 80) issues.push("High humidity - schedule cleaning");
    if (clouds > 70) issues.push("Heavy cloud cover - reduced output");

    if (issues.length === 0) {
      return "✅ Excellent conditions for solar production!";
    } else {
      return (
        "⚠️ **Attention needed:**\n" +
        issues.map((issue) => `• ${issue}`).join("\n")
      );
    }
  };

  // Analysis functions
  const analyzeTemperature = (temp) => {
    const ranges = KNOWLEDGE_BASE.temperatureRanges;

    if (temp < ranges.excellent.min) {
      return `🥶 **Low Temperature: ${temp}°C**\n\n⚠️ **Analysis:**\n• Panel efficiency may drop 10-15%\n• Below optimal range\n\n✅ **Recommendations:**\n• Monitor production regularly\n• Check for frost on panels\n• Expected efficiency: ~85%`;
    } else if (temp >= ranges.excellent.min && temp <= ranges.excellent.max) {
      return RESPONSE_TEMPLATES.temperature.excellent(
        temp,
        ranges.excellent.efficiency
      );
    } else if (temp > ranges.excellent.max && temp <= ranges.good.max) {
      const loss = (temp - ranges.excellent.max) * ranges.good.efficiencyLoss;
      const efficiency = Math.max(50, 100 - loss);
      return RESPONSE_TEMPLATES.temperature.good(
        temp,
        efficiency.toFixed(0),
        loss
      );
    } else {
      const loss =
        (temp - ranges.excellent.max) * ranges.warning.efficiencyLoss;
      const efficiency = Math.max(50, 100 - loss);
      return RESPONSE_TEMPLATES.temperature.critical(
        temp,
        efficiency.toFixed(0),
        loss
      );
    }
  };

  const analyzeWind = (wind) => {
    const ranges = KNOWLEDGE_BASE.windRanges;

    if (wind < ranges.moderate.min) {
      return RESPONSE_TEMPLATES.wind.calm(wind);
    } else if (wind >= ranges.moderate.min && wind <= ranges.moderate.max) {
      return RESPONSE_TEMPLATES.wind.moderate(wind);
    } else if (wind > ranges.moderate.max && wind <= ranges.active.max) {
      return RESPONSE_TEMPLATES.wind.strong(wind);
    } else {
      return RESPONSE_TEMPLATES.wind.dangerous(wind);
    }
  };

  const analyzeHumidity = (humidity) => {
    const ranges = KNOWLEDGE_BASE.humidityRanges;

    if (humidity < ranges.normal.min) {
      return RESPONSE_TEMPLATES.humidity.low(humidity);
    } else if (humidity >= ranges.normal.min && humidity <= ranges.normal.max) {
      return RESPONSE_TEMPLATES.humidity.normal(humidity);
    } else if (humidity > ranges.normal.max && humidity <= ranges.high.max) {
      return RESPONSE_TEMPLATES.humidity.high(humidity);
    } else {
      return RESPONSE_TEMPLATES.humidity.veryHigh(humidity);
    }
  };

  const analyzeCloudCover = (clouds) => {
    const ranges = KNOWLEDGE_BASE.cloudRanges;

    if (clouds < ranges.partlyCloudy.min) {
      return RESPONSE_TEMPLATES.clouds.clear(
        clouds,
        ranges.clear.irradiance,
        ranges.clear.efficiency
      );
    } else if (
      clouds >= ranges.partlyCloudy.min &&
      clouds <= ranges.partlyCloudy.max
    ) {
      return RESPONSE_TEMPLATES.clouds.partlyCloudy(
        clouds,
        ranges.partlyCloudy.irradiance,
        ranges.partlyCloudy.efficiency
      );
    } else if (
      clouds > ranges.partlyCloudy.max &&
      clouds <= ranges.cloudy.max
    ) {
      return RESPONSE_TEMPLATES.clouds.cloudy(
        clouds,
        ranges.cloudy.irradiance,
        ranges.cloudy.efficiency
      );
    } else {
      return RESPONSE_TEMPLATES.clouds.overcast(
        clouds,
        ranges.overcast.irradiance,
        ranges.overcast.efficiency
      );
    }
  };

  const searchTrainingData = (query) => {
    for (const category in TRAINING_DATA) {
      const questions = TRAINING_DATA[category];
      for (const qa of questions) {
        const keywords = qa.question.toLowerCase().split(" ").slice(0, 4);
        if (keywords.some((keyword) => query.includes(keyword))) {
          return `💡 **${qa.question}**\n\n${qa.answer}`;
        }
      }
    }
    return null;
  };

  const getProjectInfo = () => {
    const project = KNOWLEDGE_BASE.projectInfo;
    return `🎓 **${project.name}**\n\n👥 **Team Members:**\n${project.team
      .map((member) => `• ${member}`)
      .join("\n")}\n\n👩‍🏫 **Supervisor:** ${
      project.supervisor
    }\n\n🏛️ **Institution:**\n${project.college} - ${
      project.department
    }\nSpecialization: ${project.specialization}\n📅 Year: ${
      project.year
    }\n\n🎯 **Project Components:**\n${project.components
      .map((comp, idx) => `${idx + 1}. ${comp}`)
      .join("\n")}\n\n💡 Integrated system for managing ${project.location}!`;
  };

  const getSolarPanelInfo = () => {
    const panels = KNOWLEDGE_BASE.solarPanels;
    return `☀️ **Solar Panel Information**\n\n📊 **Panel Types:**\n${panels.types
      .map(
        (type) =>
          `• ${type.name}: ${type.efficiency} efficiency (${type.cost} cost)`
      )
      .join("\n")}\n\n⚡ **Additional Info:**\n• Lifespan: ${
      panels.lifespan
    }\n• Annual degradation: ${panels.degradation}\n• Optimal angle: ${
      panels.optimalAngle
    }\n\n💡 Monocrystalline panels are the most efficient!`;
  };

  const getEfficiencyInfo = () => {
    return `⚡ **Solar MonitorEfficiency**\n\n📊 **Key Factors:**\n\n🌡️ **1. Temperature:**\n• Optimal: 10-25°C\n• Each degree above 25°C = -0.5% efficiency\n\n☀️ **2. Solar Irradiance:**\n• Optimal: 800-1000 W/m²\n• Affected by clouds and dust\n\n💨 **3. Wind:**\n• Helps with cooling\n• May cause vibrations\n\n💧 **4. Cleanliness:**\n• Dust reduces efficiency 10-30%\n• Regular cleaning essential\n\n📈 **Tips to Increase Production:**\n✓ Regular cleaning\n✓ Monitor shading\n✓ Routine maintenance\n✓ Performance monitoring`;
  };

  const getMaintenanceInfo = () => {
    const maint = KNOWLEDGE_BASE.maintenance;
    return `🔧 **Maintenance & Cleaning**\n\n📅 **Maintenance Schedule:**\n\n**Daily:**\n${maint.daily
      .map((task) => `✓ ${task}`)
      .join("\n")}\n\n**Weekly:**\n${maint.weekly
      .map((task) => `✓ ${task}`)
      .join("\n")}\n\n**Monthly:**\n${maint.monthly
      .map((task) => `✓ ${task}`)
      .join("\n")}\n\n**Yearly:**\n${maint.yearly
      .map((task) => `✓ ${task}`)
      .join(
        "\n"
      )}\n\n⚠️ **When to Clean:**\n• Humidity > 80%\n• Strong winds (dust)\n• Noticeable production drop\n• Every 2-4 weeks in desert areas`;
  };

  const getWeatherImpactInfo = () => {
    return `🌦️ **Weather Impact on Farm**\n\n☀️ **Direct Sunlight:**\n✅ Best conditions\n📈 90-100% production\n\n⛅ **Light Clouds:**\n⚠️ Moderate decrease\n📊 60-80% production\n\n☁️ **Heavy Clouds:**\n📉 Significant decrease\n⚡ 20-40% production\n\n🌧️ **Rain:**\n✅ Cleans panels!\n💧 Temporary low production\n\n💨 **Wind:**\n✓ Light: helpful cooling\n⚠️ Strong: equipment risk\n\n🌡️ **High Temperature:**\n📉 Reduces efficiency\n⚡ Cooling needed\n\n❄️ **Cold Weather:**\n⚠️ Lower efficiency\n✓ But better than heat`;
  };

  const getCybersecurityInfo = () => {
    const security = KNOWLEDGE_BASE.cybersecurity;
    return `🔒 **MonitorCybersecurity**\n\n🛡️ **Threats:**\n${security.threats
      .map((threat) => `• ${threat}`)
      .join("\n")}\n\n✅ **Applied Protection:**\n${security.protections
      .map((prot, idx) => `${idx + 1}. **${prot.name}:** ${prot.details}`)
      .join("\n\n")}\n\n💡 Security is our top priority!`;
  };

  const getHardwareInfo = () => {
    const hw = KNOWLEDGE_BASE.hardware;
    return `⚙️ **Hardware & Sensors**\n\n📡 **Sensors Used:**\n${hw.sensors
      .map(
        (sensor, idx) =>
          `${idx + 1}. **${sensor.name}:** ${sensor.function} (${
            sensor.unit || sensor.accuracy
          })`
      )
      .join("\n")}\n\n🎛️ **Controllers:**\n${hw.controllers
      .map((c) => `• ${c}`)
      .join("\n")}\n\n📶 **Communication:**\n${hw.communication
      .map((c) => `• ${c}`)
      .join("\n")}\n\n☁️ **Cloud:**\n${hw.cloud
      .map((c) => `• ${c}`)
      .join("\n")}`;
  };

  const getDefaultResponse = () => {
    return `🤔 **How can I help you?**\n\n💡 **You can ask me about:**\n\n📊 **Weather Data:**\n• Temperature\n• Wind speed\n• Humidity\n• Clouds\n• "What's the weather today?"\n\n⚡ **MonitorStatus:**\n• Efficiency\n• Production\n• Maintenance\n• Problems\n\n🎓 **Project:**\n• Team\n• Goals\n• Technologies\n\n🔒 **Security:**\n• Cybersecurity\n• Networks\n\n⚙️ **Hardware:**\n• Sensors\n• Controllers\n\n**Example:** "temperature 32" or "wind 12" or "tell me about the project" or "how's the weather?"`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(async () => {
      const response = await analyzeMessage(input);
      const assistantMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const exportKnowledgeBase = () => {
    const data = {
      knowledgeBase: KNOWLEDGE_BASE,
      trainingData: TRAINING_DATA,
      responseTemplates: RESPONSE_TEMPLATES,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "solar-chatbot-knowledge-base.json";
    a.click();
  };

  const quickActions = [
    {
      icon: CloudSun,
      label: "What's the weather?",
      color: "from-primary to-primary-glow",
    },
    {
      icon: ThermometerSun,
      label: "Temperature 28",
      color: "from-accent to-orange-500",
    },
    { icon: Wind, label: "Wind 8 m/s", color: "from-primary to-cyan-500" },
    { icon: Sun, label: "About project", color: "from-accent to-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto h-[90vh] flex flex-col gap-4">
        {/* Header */}
        <Card className="p-4 gradient-hero text-white border-none shadow-glow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold">Solar MonitorAI Assistant</h1>
                <p className="text-sm text-white/90">
                  Minya Solar Monitor• Powered by AI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportKnowledgeBase}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-smooth"
                title="Export Knowledge Base"
              >
                <Download className="w-5 h-5" />
              </button>
              {!loadingWeather && (
                <button
                  onClick={fetchWeatherData}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-smooth"
                  title="Refresh Weather"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Online
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => setInput(action.label)}
              className={`p-3 rounded-xl bg-gradient-to-r ${action.color} text-white hover-glow hover-scale flex items-center gap-2 text-sm font-medium shadow-card`}
            >
              <action.icon className="w-4 h-4" />
              <span className="hidden md:inline">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Messages Container */}
        <Card className="flex-1 overflow-hidden flex flex-col gradient-card border-border shadow-card">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md transition-smooth ${
                    message.role === "user"
                      ? "gradient-hero text-white"
                      : "bg-card text-card-foreground border border-border"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === "user"
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 shadow-card">
                    <User className="w-5 h-5 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-card rounded-2xl px-4 py-3 shadow-md border border-border">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input Area */}
        <Card className="p-4 bg-card border-border shadow-card">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (e.g., 'temperature 32' or 'what's the weather?')"
              className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              rows="2"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 rounded-xl gradient-hero text-white hover-glow hover-scale transition-smooth disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-card"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Info className="w-3 h-3" />
            <span>Press Enter to send • Shift+Enter for new line</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SolarChatbot;
