import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Printer,
  Trash2,
  Calendar,
  User,
  Building,
  Eye,
  Type,
  AlignLeft,
  ArrowLeft,
  Download,
} from "lucide-react";

const ReportsGenerator = () => {
  const [reportData, setReportData] = useState({
    title: "Solar Monitor Performance Report",
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
          "This report provides an overview of the solar monitor performance for the specified period.",
      },
    ],
  });

  const [showPreview, setShowPreview] = useState(false);
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
        section.id === id ? { ...section, content } : section,
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
    window.print();
  };

  // Editor View
  if (!showPreview) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
                  <FileText className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Reports Generator
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Create professional reports
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(true)}
                className="px-6 py-3 gradient-hero text-primary-foreground rounded-xl font-semibold hover-glow hover-scale transition-smooth flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Preview & Print
              </button>
            </div>
          </div>

          {/* Report Information */}
          <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Report Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
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
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
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
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
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
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary" />
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
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Builder */}
          <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Report Content
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => addSection("heading")}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-smooth text-sm font-medium flex items-center gap-2"
                >
                  <Type className="w-4 h-4" />
                  Add Heading
                </button>
                <button
                  onClick={() => addSection("paragraph")}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-smooth text-sm font-medium flex items-center gap-2"
                >
                  <AlignLeft className="w-4 h-4" />
                  Add Paragraph
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {reportData.sections.map((section, index) => (
                <div key={section.id} className="group relative">
                  <div className="absolute -left-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-smooth"
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
                      className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl bg-primary/5 text-lg font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                      placeholder="Enter heading..."
                    />
                  ) : (
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        updateSection(section.id, e.target.value)
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                      placeholder="Enter paragraph text..."
                    />
                  )}
                </div>
              ))}

              {reportData.sections.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    No content yet. Add headings or paragraphs to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Preview View
  return (
    <div className="min-h-screen bg-background">
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printArea, #printArea * {
            visibility: visible;
          }
          #printArea {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 40px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Header - No Print */}
      <div className="no-print sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto p-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-xl font-medium transition-smooth flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Editor
          </button>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-6 py-3 gradient-hero text-primary-foreground rounded-xl font-semibold hover-glow transition-smooth flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print Report
            </button>
          </div>
        </div>
      </div>

      {/* Print Area */}
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <div
          id="printArea"
          ref={printRef}
          className="bg-white dark:bg-card p-8 md:p-12 rounded-2xl shadow-xl"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {/* Report Header */}
          <div className="border-b-4 border-primary pb-6 mb-8 flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {reportData.title}
              </h1>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>
                  <strong className="text-gray-800 dark:text-gray-300">
                    Date:
                  </strong>{" "}
                  {new Date(reportData.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {reportData.author && (
                  <p>
                    <strong className="text-gray-800 dark:text-gray-300">
                      Author:
                    </strong>{" "}
                    {reportData.author}
                  </p>
                )}
                <p>
                  <strong className="text-gray-800 dark:text-gray-300">
                    Department:
                  </strong>{" "}
                  {reportData.department}
                </p>
              </div>
            </div>
            <div className="text-center ml-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-lg mb-2">
                <span className="text-5xl">⚡</span>
              </div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Solar Monitor
                <br />
                Minya
              </p>
            </div>
          </div>

          {/* Report Content */}
          <div className="space-y-6">
            {reportData.sections.map((section) => (
              <div key={section.id}>
                {section.type === "heading" ? (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                    {section.content}
                  </h2>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-[15px]">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Report Footer */}
          <div className="mt-16 pt-6 border-t border-gray-300 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-500 text-center">
            <p>
              Generated on {new Date().toLocaleString("en-US")} | Solar Monitor
              - Minya University
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsGenerator;
