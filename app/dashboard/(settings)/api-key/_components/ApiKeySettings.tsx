"use client";

import SetDiscordId from "@/actions/setDiscordId";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <Label>Your API Key</Label>
        <div className="flex items-center gap-2">
          <Input type="password" value={apiKey} readOnly className="pr-10" />
          <Button
            variant="outline"
            onClick={copyApiKey}
            tabIndex={-1}
            type="button"
            className="transition-all"
          >
            {copySuccess ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Keep your key secrect and do not share it with others.
        </p>
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
