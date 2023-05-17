import React, { useEffect, useState } from "react";
import Photo from "./photo";
import ReactModal from "react-modal";
import Image from "next/image";
import DownloadIcon from "@/public/icons/download";
import CloseIcon from "@/public/icons/close";
import { saveAs } from "file-saver";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

const buttonStyles = {
  position: "absolute",
  top: "0",
  right: "0",
};

ReactModal.setAppElement("body");

function PhotoList({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, [showModal]);

  const downloadImage = () => {
    saveAs(selectedPhoto.urls.regular, "image.jpg");
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 m-6 gap-6">
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
      >
        <div className="flex gap-2" style={buttonStyles}>
          <div onClick={downloadImage} className="cursor-pointer">
            <DownloadIcon />
          </div>
          <div onClick={() => setShowModal(false)} className="cursor-pointer">
            <CloseIcon />
          </div>
        </div>
        {isLoading && <p>loading...</p>}
        <Image
          src={selectedPhoto?.urls?.regular}
          width={0}
          height={0}
          sizes="100vw"
          className={`object-cover rounded-md w-full h-full  duration-700 ease-in-out ${
            isLoading ? "blur-md grayscale" : "blur-0 grayscale-0"
          }`}
          alt="image"
          onLoadingComplete={() => setLoading(false)}
        />

        <p className="text-center">{selectedPhoto?.alt_description}</p>
        <p className="text-center">Credit: {selectedPhoto?.user.name}</p>
      </ReactModal>
      {console.log(isLoading)}
      {data.response.results.map((x, i) => (
        <Photo
          key={i}
          photo={x}
          setSelectedPhoto={setSelectedPhoto}
          setShowModal={setShowModal}
          setLoadingProps={setLoading}
        />
      ))}
    </div>
  );
}

export default PhotoList;
