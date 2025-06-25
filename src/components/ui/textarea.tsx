"use client";

import { Editor } from "@tinymce/tinymce-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils"; // 또는 당신의 cn 함수 경로
import type { Editor as TinyMCEEditor } from "tinymce";

interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "onChange" | "value"> {
  value?: string;
  onChange?: (content: string) => void;
  height?: number;
  apiKey?: string;
}

const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  (
    {
      className,
      value = "",
      onChange,
      height = 200,
      apiKey,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="textarea"
        className={cn(
          "border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] overflow-hidden",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <Editor
          apiKey={"grgzzrs16i40x5bp0ts6gtn5t9zmuvyupoh0hpb7ulwi9c54"}
          value={value}
          onEditorChange={(content) => onChange?.(content)}
          disabled={disabled}
          init={{
            height,
            menubar: false,
            statusbar: false,
            branding: false,
            resize: false,
            placeholder: placeholder,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "charmap",
              "preview",
              "searchreplace",
              "visualblocks",
              "code",
              "insertdatetime",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | removeformat",
            content_style: `
              body { 
                font-family: inherit; 
                font-size: 14px; 
                line-height: 1.5;
                margin: 8px 12px;
                color: inherit;
              }
              @media (min-width: 768px) {
                body { font-size: 13px; }
              }
            `,
            skin: "oxide",
            content_css: "default",
            setup: (editor: TinyMCEEditor) => {
              // 다크모드 지원을 위한 설정
              editor.on("init", () => {
                const isDark =
                  document.documentElement.classList.contains("dark");
                if (isDark) {
                  editor.dom.setStyle(
                    editor.getBody(),
                    "background-color",
                    "transparent"
                  );
                  editor.dom.setStyle(
                    editor.getBody(),
                    "color",
                    "hsl(var(--foreground))"
                  );
                }
              });
            },
          }}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
