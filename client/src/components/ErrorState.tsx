import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  errorMessage: string;
  onDismiss: () => void;
}

export default function ErrorState({ errorMessage, onDismiss }: ErrorStateProps) {
  // Update 1: Added useEffect hook for logging error message and optional error tracking
  useEffect(() => {
    if (errorMessage) {
      console.error("Error occurred:", errorMessage); // Log the error
      // Optional: Send error to an external logging service here
      
    }
  }, [errorMessage]);

  return (
    <div className="mb-8" role="alert" aria-live="assertive"> {/* Update 2: Added aria-live="assertive" */}
      <Card>
        <CardContent className="p-6 space-y-4"> {/* Update 3: Added space-y-4 to add spacing between content */}
          <div className="p-4 bg-red-50 border border-red-100 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="ri-error-warning-fill text-error text-lg"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">An error occurred</h3>
                <div className="mt-2 text-sm text-red-700">
                  {/* Update 4: Added fallback text in case errorMessage is empty */}
                  <p>{errorMessage || "An unexpected error occurred."}</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="text-sm font-medium text-red-800 hover:text-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500" // Updated for better accessibility and interaction
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
