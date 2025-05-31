import React from "react";
import { Video, FileText, Download, ChevronRight } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const SubModuleContent = ({ subModule }) => {
  return (
    <div className="space-y-6">
      {/* Video Section */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Video className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Video Content
          </h3>
        </div>

        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
          <video
            src={subModule.videoUrl}
            className="w-full h-full"
            controls
            poster={subModule.thumbnail}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              {subModule.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subModule.duration}
            </p>
          </div>
          <Button variant="outline" size="sm" icon={<Download size={16} />}>
            Download Video
          </Button>
        </div>
      </Card>

      {/* Resources Section */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Resources
          </h3>
        </div>

        <div className="space-y-4">
          {subModule.resources?.map((resource, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {resource.description}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={
                  resource.type === "link" ? (
                    <ChevronRight size={16} />
                  ) : (
                    <Download size={16} />
                  )
                }
              >
                {resource.type === "link" ? "Access" : "Download"}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SubModuleContent;
