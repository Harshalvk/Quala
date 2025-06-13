"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EVENT_CATEGORY_VALIDATOR } from "@/lib/validators/category.validator";
import { Modal } from "./ui/modal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import CreateEventCategory from "@/actions/createEventCategory";

const COLOR_OPTIONS = [
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
];

const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
  { emoji: "🛠️", label: "Maintenance" },
  { emoji: "📈", label: "Growth" },
  { emoji: "🔥", label: "Trending" },
  { emoji: "📦", label: "Product" },
  { emoji: "🧠", label: "Learning" },
  { emoji: "📝", label: "Update" },
  { emoji: "🔒", label: "Security" },
];

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>;

const CreateEventCategoryModal = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createEventCategory, isPending } = useMutation({
    mutationFn: CreateEventCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] });
      setIsOpen(false);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventCategoryForm>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  });

  const color = watch("color");
  const selectedEmoji = watch("emoji");

  const onSubmit = (data: EventCategoryForm) => {
    createEventCategory(data);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Modal
        showModal={isOpen}
        setShowModal={setIsOpen}
        className="max-w-xl p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-lg/7 font-medium tracking-tight">
              New Event Category
            </h2>
            <p>Create a new category to organize your events.</p>
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input
                autoFocus
                id="name"
                {...register("name")}
                placeholder="eg. user-signup"
                className="w-full"
              />
              {errors.name ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label className="mb-2">Color</Label>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((premadeColor) => (
                  <button
                    key={premadeColor}
                    type="button"
                    className={cn(
                      `bg-[${premadeColor}]`,
                      "size-10 rounded-full ring-2 transition-all",
                      color === premadeColor
                        ? "ring-zinc-300 dark:ring-zinc-100 scale-110"
                        : "ring-transparent hover:scale-105"
                    )}
                    onClick={() => setValue("color", premadeColor)}
                  />
                ))}
              </div>
              {errors.color ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.color.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label className="mb-2">Emoji</Label>
              <div className="flex flex-wrap gap-3">
                {EMOJI_OPTIONS.map(({ emoji, label }) => (
                  <button
                    key={emoji}
                    type="button"
                    className={cn(
                      "size-10 flex items-center justify-center text-xl rounded-md transition-all",
                      selectedEmoji === emoji
                        ? "bg-zinc-100 dark:bg-zinc-400 ring-2 ring-zinc-200 dark:ring-zinc-100 scale-110"
                        : "ring-transparent hover:scale-105 bg-zinc-100 dark:bg-zinc-400"
                    )}
                    onClick={() => setValue("emoji", emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {errors.emoji ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.emoji.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setIsOpen(false)}
            >
              Cancle
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? "Creating..." : "Create category"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateEventCategoryModal;
