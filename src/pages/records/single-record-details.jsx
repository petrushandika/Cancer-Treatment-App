import { IconFileUpload } from "@tabler/icons-react";
import React, { useState } from "react";
import RecordDetailsHeader from "./components/record-details-header";
import { useLocation, useNavigate } from "react-router-dom";
import FileUploadModal from "./components/file-upload-modal";
import { useStateContext } from "../../context";

const SingleRecordDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(
    state.analysisResult || "",
  );
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateRecord } = useStateContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileType(file.type);
    setFileName(file.name);
    setFile(file);
  };

  return (
    <div className="flex flex-wrap gap-7">
      <button
        type="button"
        onClick={() => {}}
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
      >
        <IconFileUpload />
        Upload Reports
      </button>
      <FileUploadModal isOpen={isModalOpen} />

      <RecordDetailsHeader recordName={state.recordName} />

      <div className="w-full">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-xl border-neutral-700 bg-[#13131a] shadow-sm">
                <div className="border-b border-neutral-700 px-6 py-4">
                  <h2 className="text-xl font-semibold text-neutral-200">
                    Personalized AI-Driven Treatment Plan
                  </h2>
                  <p className="text-sm text-neutral-400">
                    A tailored medical strategy leveraging advanced AI insight
                  </p>
                </div>
                <div className="flex w-full flex-col px-6 py-4 text-white">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Analysis Result
                    </h2>
                    <div className="space-y-2">{analysisResult}</div>
                  </div>
                </div>
                <div className="mt-5 grid gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                  >
                    View Treatment plan
                  </button>
                  <RecordDetailsHeader recordName={state.recordName} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecordDetails;
