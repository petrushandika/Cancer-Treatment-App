import { IconCirclePlus } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import CreateRecordModal from "./components/create-record-modal";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../../context";
import RecordCard from "./components/record-card";

const Index = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const {
    records,
    fetchUserRecords,
    createRecord,
    fetchUserByEmail,
    currentUser,
  } = useStateContext();

  const [userRecords, setUserRecords] = useState([]);
  const [isModalOpen, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address);
      fetchUserRecords(user.email.address);
    }
  }, [user, fetchUserByEmail, fetchUserRecords]);

  useEffect(() => {
    setUserRecords(records);
    localStorage.setItem("userRecords", JSON.stringify(records));
  }, [records]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const createFolder = async (folderName) => {
    try {
      if (currentUser) {
        const newRecord = await createRecord({
          userId: currentUser.id,
          recordName: folderName,
          analysisResult: "",
          kanbanRecords: "",
          createdBy: user.email.address,
        });

        if (newRecord) {
          fetchUserRecords(user.email.address);
          handleCloseModal();
        }
      }
    } catch (error) {
      console.log(error);
      handleCloseModal();
    }
  };

  const handleNavigate = (name) => {
    const filteredRecords = userRecords.filter(
      (record) => record.recordName === name,
    );

    if (filteredRecords.length > 0) {
      navigate(`/medical-records/${name}`, {
        state: filteredRecords[0],
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-6 px-6">
      <button
        type="button"
        className="mt-2 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 bg-[#13131a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
        onClick={handleOpenModal}
      >
        <IconCirclePlus />
        Create Record
      </button>

      <CreateRecordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={createFolder}
      />

      <div className="grid w-full sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {userRecords.map((record) => (
          <RecordCard
            key={record.recordName}
            record={record}
            onNavigate={handleNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
