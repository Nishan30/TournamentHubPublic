import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UrlCardProps {
  title: string;
  description: string;
  url: string;
}

export function UrlCard({ title, description, url }: UrlCardProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  return (
    <Card className="w-full bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-xl text-neutral-100">{title}</CardTitle>
        <CardDescription className="text-neutral-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            readOnly
            value={url}
            className="font-mono bg-neutral-800 border-neutral-700 text-neutral-100"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0 border-neutral-700 hover:bg-neutral-800"
                >
                  <Copy className="h-5 w-5 text-neutral-100" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}