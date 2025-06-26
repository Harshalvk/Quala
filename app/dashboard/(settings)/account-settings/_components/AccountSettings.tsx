"use client";

import SetDiscordId from "@/actions/setDiscordId";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

const AccountSettings = ({
  discordId: initialDiscordId,
}: {
  discordId: string;
}) => {
  const [discordId, setDiscordid] = useState(initialDiscordId);

  const { mutate: setDiscordId, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      return await SetDiscordId(discordId);
    },
  });

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-col w-full items-start justify-center">
          <Label>Discord ID</Label>
          <div className="flex items-center gap-2 w-full">
            <Input
              disabled={isPending}
              className="mt-1"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              placeholder="Enter your Discord ID"
            />
            <Button disabled={isPending} variant={"outline"}>
              Update
            </Button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Don&apos;t know how to find your Discord ID?
            <Link
              href={"#"}
              className="ml-1 hover:underline underline-offset-2 text-pink-800/80"
            >
              Learn how to obtain it here.
            </Link>
          </p>
        </div>
        <div className="flex flex-col w-full items-start justify-center">
          <Label>Slack ID</Label>
          <div className="flex items-center gap-2 w-full">
            <Input
              disabled={isPending}
              className="mt-1"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              placeholder="Enter your Slack ID"
            />
            <Button disabled={isPending} variant={"outline"}>
              Update
            </Button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Don&apos;t know how to find your Slack ID?
            <Link
              href={
                "https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
              }
              className="ml-1 hover:underline underline-offset-2 text-pink-800/80"
            >
              Learn how to obtain it here.
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
