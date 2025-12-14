import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useClipboard = () => {
  const { toast } = useToast();

  const copyToClipboard = useCallback(async (text: string, successMessage = "Copied to clipboard") => {
    if (!text) {
      toast({
        title: "Nothing to copy",
        description: "No content available to copy",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Modern clipboard API
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Copied!",
          description: successMessage,
        });
        return true;
      }
      
      // Fallback for older browsers or non-HTTPS contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        toast({
          title: "Copied!",
          description: successMessage,
        });
        return true;
      } else {
        throw new Error("Copy command failed");
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please select and copy manually.",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  return { copyToClipboard };
};
