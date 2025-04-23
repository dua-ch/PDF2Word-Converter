import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  errorMessage: string;
  onDismiss: () => void;
}

export default function ErrorState({ errorMessage, onDismiss }: ErrorStateProps) {
  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="p-4 bg-red-50 border border-red-100 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="ri-error-warning-fill text-error text-lg"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">An error occurred</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{errorMessage}</p>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    className="text-sm font-medium text-red-800 hover:text-red-700"
                    onClick={onDismiss}
                  >
                    Try again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
