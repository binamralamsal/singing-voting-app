"use client";

import UploadVideo from "@/app/profile/upload/page";
import { FileUploader } from "@/components/ui/file-uploader";
import { saveVideo } from "@/services/person/actions";

export function BasicUploaderDemo() {
  async function uploadFiles(file: File) {
    const formData = new FormData();

    formData.set("file", file);
    await saveVideo(formData);
  }

  return (
    <div className="space-y-6">
      <FileUploader
        maxFiles={1}
        accept={{ "video/mp4": [".mp4", ".MP4"] }}
        onUpload={uploadFiles}
      />
    </div>
  );
}
