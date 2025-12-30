import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,
  Printer,
  Trash2,
  BarChart3,
  Calendar,
  User,
  Building,
  Eye,
  Edit3,
  Type,
  AlignLeft,
} from "lucide-react";

const ReportsGenerator = () => {
  const [reportData, setReportData] = useState({
    title: "Solar MonitorPerformance Report",
    date: new Date().toISOString().split("T")[0],
    author: "",
    department: "Operations",
    sections: [
      {
        id: 1,
        type: "heading",
        content: "Executive Summary",
      },
      {
        id: 2,
        type: "paragraph",
        content:
          "This report provides an overview of the solar Monitorperformance for the specified period.",
      },
    ],
  });

  const [preview, setPreview] = useState(false);
  const printRef = useRef();

  const addSection = (type) => {
    const newSection = {
      id: Date.now(),
      type: type,
      content:
        type === "heading"
          ? "New Heading"
          : type === "paragraph"
          ? "Enter your text here..."
          : "",
    };
    setReportData({
      ...reportData,
      sections: [...reportData.sections, newSection],
    });
  };

  const updateSection = (id, content) => {
    setReportData({
      ...reportData,
      sections: reportData.sections.map((section) =>
        section.id === id ? { ...section, content } : section
      ),
    });
  };

  const deleteSection = (id) => {
    setReportData({
      ...reportData,
      sections: reportData.sections.filter((section) => section.id !== id),
    });
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const winPrint = window.open("", "", "width=900,height=650");
    winPrint.document.write(`
      <html>
        <head>
          <title>${reportData.title}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #1f2937;
            }
            .header {
              border-bottom: 3px solid #0d9488;
              padding-bottom: 20px;
              margin-bottom: 30px;
              display: flex;
              justify-content: space-between;
              align-items: start;
            }
            .logo {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 32px;
              font-weight: bold;
            }
            h1 {
              font-size: 32px;
              font-weight: bold;
              color: #111827;
              margin-bottom: 15px;
            }
            .info {
              font-size: 14px;
              color: #6b7280;
              line-height: 1.8;
            }
            .info strong {
              color: #374151;
            }
            h2 {
              font-size: 24px;
              font-weight: bold;
              color: #111827;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            p {
              font-size: 14px;
              line-height: 1.8;
              color: #374151;
              margin-bottom: 15px;
              white-space: pre-wrap;
            }
            .footer {
              margin-top: 60px;
              padding-top: 20px;
              border-top: 1px solid #d1d5db;
              text-align: center;
              font-size: 11px;
              color: #9ca3af;
            }
            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>${reportData.title}</h1>
              <div class="info">
                <p><strong>Date:</strong> ${new Date(
                  reportData.date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                ${
                  reportData.author
                    ? `<p><strong>Author:</strong> ${reportData.author}</p>`
                    : ""
                }
                <p><strong>Department:</strong> ${reportData.department}</p>
              </div>
            </div>
            <div class="logo">⚡</div>
          </div>
          <div class="content">
            ${reportData.sections
              .map((section) => {
                if (section.type === "heading") {
                  return `<h2>${section.content}</h2>`;
                } else {
                  return `<p>${section.content}</p>`;
                }
              })
              .join("")}
          </div>
          <div class="footer">
            <p>Generated on ${new Date().toLocaleString(
              "en-US"
            )} | Solar Monitor - Minya</p>
          </div>
        </body>
      </html>
    `);
    winPrint.document.close();
    winPrint.focus();
    setTimeout(() => {
      winPrint.print();
      winPrint.close();
    }, 250);
  };

  const handleDownloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>${reportData.title}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #1f2937;
            }
            .header {
              border-bottom: 3px solid #0d9488;
              padding-bottom: 20px;
              margin-bottom: 30px;
              display: flex;
              justify-content: space-between;
              align-items: start;
            }
            .logo {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 32px;
              font-weight: bold;
            }
            h1 {
              font-size: 32px;
              font-weight: bold;
              color: #111827;
              margin-bottom: 15px;
            }
            .info {
              font-size: 14px;
              color: #6b7280;
              line-height: 1.8;
            }
            .info strong {
              color: #374151;
            }
            h2 {
              font-size: 24px;
              font-weight: bold;
              color: #111827;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            p {
              font-size: 14px;
              line-height: 1.8;
              color: #374151;
              margin-bottom: 15px;
              white-space: pre-wrap;
            }
            .footer {
              margin-top: 60px;
              padding-top: 20px;
              border-top: 1px solid #d1d5db;
              text-align: center;
              font-size: 11px;
              color: #9ca3af;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>${reportData.title}</h1>
              <div class="info">
                <p><strong>Date:</strong> ${new Date(
                  reportData.date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                ${
                  reportData.author
                    ? `<p><strong>Author:</strong> ${reportData.author}</p>`
                    : ""
                }
                <p><strong>Department:</strong> ${reportData.department}</p>
              </div>
            </div>
            <div class="logo">⚡</div>
          </div>
          <div class="content">
            ${reportData.sections
              .map((section) => {
                if (section.type === "heading") {
                  return `<h2>${section.content}</h2>`;
                } else {
                  return `<p>${section.content}</p>`;
                }
              })
              .join("")}
          </div>
          <div class="footer">
            <p>Generated on ${new Date().toLocaleString(
              "en-US"
            )} | Solar Monitor - Minya</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([printContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportData.title.replace(/\s+/g, "_")}_${
      reportData.date
    }.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-primary font-bold bg-gradient-to-r from-primary to-accent bg-clip-text ">
                  Reports Generator
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Create, edit, and print professional reports
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPreview(!preview)}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-all flex items-center gap-2 font-medium"
              >
                {preview ? (
                  <Edit3 className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {preview ? "Edit" : "Preview"}
              </button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Section */}
          <div
            className={`${
              preview ? "lg:col-span-1" : "lg:col-span-2"
            } space-y-6`}
          >
            {!preview && (
              <>
                {/* Report Info */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Report Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Report Title
                      </label>
                      <input
                        type="text"
                        value={reportData.title}
                        onChange={(e) =>
                          setReportData({
                            ...reportData,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date
                        </label>
                        <input
                          type="date"
                          value={reportData.date}
                          onChange={(e) =>
                            setReportData({
                              ...reportData,
                              date: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Author
                        </label>
                        <input
                          type="text"
                          value={reportData.author}
                          onChange={(e) =>
                            setReportData({
                              ...reportData,
                              author: e.target.value,
                            })
                          }
                          placeholder="Your name"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Department
                      </label>
                      <input
                        type="text"
                        value={reportData.department}
                        onChange={(e) =>
                          setReportData({
                            ...reportData,
                            department: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </Card>

                {/* Content Builder */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-primary" />
                      Report Content
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addSection("heading")}
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all text-sm flex items-center gap-1"
                      >
                        <Type className="w-4 h-4" />
                        Heading
                      </button>
                      <button
                        onClick={() => addSection("paragraph")}
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all text-sm flex items-center gap-1"
                      >
                        <AlignLeft className="w-4 h-4" />
                        Paragraph
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reportData.sections.map((section) => (
                      <div key={section.id} className="group relative">
                        <div className="absolute -left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => deleteSection(section.id)}
                            className="p-1.5 bg-red-50 dark:bg-red-950 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {section.type === "heading" ? (
                          <input
                            type="text"
                            value={section.content}
                            onChange={(e) =>
                              updateSection(section.id, e.target.value)
                            }
                            className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg bg-primary/5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter heading..."
                          />
                        ) : (
                          <textarea
                            value={section.content}
                            onChange={(e) =>
                              updateSection(section.id, e.target.value)
                            }
                            rows={4}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            placeholder="Enter paragraph text..."
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Preview Section */}
          <div className={`${preview ? "lg:col-span-2" : "lg:col-span-1"}`}>
            <Card className="p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Live Preview
                </h2>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 rounded-lg transition-all text-sm flex items-center gap-1"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>

              {/* Print Area */}
              <div
                ref={printRef}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg border-2 border-border min-h-[500px] shadow-lg print:shadow-none print:border-0"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {/* Report Header */}
                <div className="border-b-2 border-primary pb-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {reportData.title}
                      </h1>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(reportData.date).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </p>
                        {reportData.author && (
                          <p>
                            <strong>Author:</strong> {reportData.author}
                          </p>
                        )}
                        <p>
                          <strong>Department:</strong> {reportData.department}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-4xl">⚡</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-semibold">
                        Solar Monitor
                        <br />
                        Minya
                      </p>
                    </div>
                  </div>
                </div>

                {/* Report Content */}
                <div className="space-y-4">
                  {reportData.sections.map((section) => (
                    <div key={section.id}>
                      {section.type === "heading" ? (
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">
                          {section.content}
                        </h2>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {section.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Report Footer */}
                <div className="mt-12 pt-6 border-t border-gray-300 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-500 text-center">
                  <p>
                    Generated on {new Date().toLocaleString("en-US")} | Solar
                    Monitor - Minya
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Templates */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Quick Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() =>
                setReportData({
                  ...reportData,
                  title: "Daily Performance Report",
                  sections: [
                    {
                      id: Date.now(),
                      type: "heading",
                      content: "Daily Overview",
                    },
                    {
                      id: Date.now() + 1,
                      type: "paragraph",
                      content:
                        "Summary of daily operations and performance metrics.",
                    },
                    {
                      id: Date.now() + 2,
                      type: "heading",
                      content: "Key Metrics",
                    },
                    {
                      id: Date.now() + 3,
                      type: "paragraph",
                      content:
                        "Energy production, efficiency, and weather conditions.",
                    },
                  ],
                })
              }
              style={{ backgroundColor: "#d3e0f0" }}
              className="p-4 !bg-gradient-to-br  from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg hover:shadow-lg transition-all text-left"
            >
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Daily Report
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Standard daily performance template
              </p>
            </button>

            <button
              onClick={() =>
                setReportData({
                  ...reportData,
                  title: "Maintenance Report",
                  sections: [
                    {
                      id: Date.now(),
                      type: "heading",
                      content: "Maintenance Activities",
                    },
                    {
                      id: Date.now() + 1,
                      type: "paragraph",
                      content:
                        "Record of maintenance performed on equipment and panels.",
                    },
                    {
                      id: Date.now() + 2,
                      type: "heading",
                      content: "Issues Identified",
                    },
                    {
                      id: Date.now() + 3,
                      type: "paragraph",
                      content: "Problems found and actions taken.",
                    },
                  ],
                })
              }
              style={{ backgroundColor: "#f0fdf4" }}
              className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg hover:shadow-lg transition-all text-left"
            >
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                Maintenance Report
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Document maintenance activities
              </p>
            </button>

            <button
              onClick={() =>
                setReportData({
                  ...reportData,
                  title: "Monthly Analysis Report",
                  sections: [
                    {
                      id: Date.now(),
                      type: "heading",
                      content: "Executive Summary",
                    },
                    {
                      id: Date.now() + 1,
                      type: "paragraph",
                      content: "Comprehensive monthly performance analysis.",
                    },
                    {
                      id: Date.now() + 2,
                      type: "heading",
                      content: "Performance Metrics",
                    },
                    {
                      id: Date.now() + 3,
                      type: "paragraph",
                      content:
                        "Detailed breakdown of energy production and efficiency.",
                    },
                  ],
                })
              }
              style={{ backgroundColor: "#d3e0f0" }}
              className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg hover:shadow-lg transition-all text-left"
            >
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                Monthly Analysis
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Comprehensive monthly overview
              </p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsGenerator;
