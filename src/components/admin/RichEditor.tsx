"use client";

import dynamic from "next/dynamic";

export interface RichEditorProps {
    value: string | null | undefined;
    onChange: (html: string) => void;
    small?: boolean;
    invalid?: boolean;
}

const RichEditorClient = dynamic(
    () => {
        if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
            delete (window as unknown as { CKEDITOR_VERSION?: string }).CKEDITOR_VERSION;
        }
        return import("./RichEditorClient");
    },
    {
        ssr: false,
        loading: () => (
            <div className="min-h-[160px] rounded-md border border-line bg-white p-4 text-sm text-mute">
                Loading editor...
            </div>
        ),
    }
);

export default function RichEditor(props: RichEditorProps) {
    return <RichEditorClient {...props} />;
}