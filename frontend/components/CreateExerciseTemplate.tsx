"use client";

import React, { useState } from "react";
import { exerciseTemplate, StatusMessage } from "@/types";
import { seteuid } from "process";

export default function CreateExerciseTemplate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expectedReps, setExpectedReps] = useState("");
  const [expectedSets, setExpectedSets] = useState("");
  const [expectedWeight, setExpectedWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage(null);
  };

  return (
    <div className="Wrapper Center">
      <form onSubmit={handleSubmit} className="Wrapper Padding Border flex-col bg-secondary drop-shadow-xl max-w-max">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter Template Name"
          required
          className="input"
          disabled={loading}
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter Template Description"
          required
          className="input"
          disabled={loading}
        />
        <label htmlFor="expectedReps" className="sr-only">
          Reps
        </label>
        <input
          id="expectedReps"
          type="text"
          value={expectedReps}
          onChange={(event) => setExpectedReps(event.target.value)}
          placeholder="Enter Template Reps"
          required
          className="input"
          disabled={loading}
        />
        <label htmlFor="expectedSets" className="sr-only">
          Sets
        </label>
        <input
          id="expectedSets"
          type="text"
          value={expectedSets}
          onChange={(event) => setExpectedSets(event.target.value)}
          placeholder="Enter Template Sets"
          required
          className="input"
          disabled={loading}
        />
        <label htmlFor="expectedWeight" className="sr-only">
          Weight
        </label>
        <input
          id="expectedWeight"
          type="text"
          value={expectedWeight}
          onChange={(event) => setExpectedWeight(event.target.value)}
          placeholder="Enter Template Weight"
          required
          className="input"
          disabled={loading}
        />

        <input type="submit" value={loading ? "Creating template" : "Submit"} disabled={loading} className="btn" />

        {statusMessage && (
          <div className={`${statusMessage.type === "error" ? "text-code-error" : "text-code-success"}`}>
            {statusMessage.message}
          </div>
        )}
      </form>
    </div>
  );
}
