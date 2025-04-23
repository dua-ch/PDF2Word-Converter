import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ConversionProgressProps {
  progress: number;
}

export default function ConversionProgress({ progress }: ConversionProgressProps) {
  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Converting Document</h2>
          <p className="text-gray-500 mb-6">Your document is being converted. Please wait a moment.</p>
          
          {/* Progress bar */}
          <Progress value={progress} className="h-2.5 mb-4" />
          <p className="text-sm text-gray-500 text-center">{progress}%</p>
          
          {/* Conversion details */}
          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
