"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function SearchInput({ query }: { query?: string }) {
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    if (newQuery) {
      router.push(`/vote?query=${newQuery}`);
    } else {
      router.push("/vote");
    }
  };

  return (
    <Input
      className="w-full max-w-full md:max-w-sm"
      placeholder="Search challengers here..."
      onChange={handleChange}
      defaultValue={query}
    />
  );
}
