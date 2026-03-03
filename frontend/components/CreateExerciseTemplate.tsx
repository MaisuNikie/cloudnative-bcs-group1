"use client";

import React, { useState } from "react";
import { StatusMessage } from "@/types";
import { FormInputField } from "@/components/FormInputField";

export default function CreateExerciseTemplate() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    expectedReps: "",
    expectedSets: "",
    expectedWeight: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const fields = [
    "name",
    "description",
    "expectedReps",
    "expectedSets",
    "expectedWeight",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
  };

  return (
    <div className="Wrapper Center">
      <form onSubmit={handleSubmit} className="Wrapper Padding Border flex-col bg-secondary drop-shadow-xl max-w-max">
        {fields.map((field) => (
          <FormInputField
            key={field}
            field={field}
            value={form[field as keyof typeof form]}
            disabled={loading}
            onChange={(v) => handleChange(field, v)}
          />
        ))}

        <input
          type="submit"
          value={loading ? "Creating template" : "Submit"}
          disabled={loading}
          className="btn"
        />

        {statusMessage && (
          <div className={statusMessage.type === "error" ? "text-code-error" : "text-code-success"}>
            {statusMessage.message}
          </div>
        )}
      </form>
    </div>
  );
}