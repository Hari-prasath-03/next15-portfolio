"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import FileInput from "@/components/ui/FileInput";
import ArrayInput from "@/components/ui/ArrayInput";
import submitProject from "@/actions/submit-project";

export default function ProjectForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [state, action, isPending] = useActionState(submitProject, {
    success: false,
    message: "",
  });

  const handleFileChange = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      setFileName("");
      setPreview("");
    }
  }, [state.success]);

  return (
    <div className="min-h-screen bg-bg p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">
            Add New Project
          </h1>
          <p className="text-text/70">
            Fill in the details to showcase your amazing work
          </p>
        </div>

        <form action={action} ref={formRef} className="flex flex-col gap-6">
          <FileInput
            label="Project Image"
            name="image"
            required
            onFileChange={handleFileChange}
            fileName={fileName}
            preview={preview}
          />

          <Input
            label="Project Name"
            name="name"
            required
            placeholder="My Awesome Project"
          />

          <Textarea
            label="Short Description"
            name="shortDescription"
            required
            placeholder="A brief overview of your project..."
            rows={3}
          />

          <ArrayInput
            label="Tech Stacks"
            name="techStacks"
            placeholder="React, Next.js, TypeScript..."
          />

          <ArrayInput
            label="Descriptions"
            name="description"
            placeholder="Detailed description paragraph..."
          />

          <ArrayInput
            label="GitHub Links"
            name="githubLinks"
            type="url"
            placeholder="https://github.com/username/repo"
            icon={Github}
          />

          <Input
            label="Live Link"
            name="liveLink"
            required
            type="url"
            placeholder="https://myproject.com"
          />

          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-medium bg-primary text-bg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            <ExternalLink className="w-5 h-5" />
            {isPending ? "Submitting..." : "Submit Project"}
          </button>
        </form>
        {state.success && (
          <div className="mt-4 p-4 rounded-lg bg-green-500 text-white">
            Project submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
}
