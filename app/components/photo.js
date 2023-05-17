import Image from "next/image";
import { useState } from "react";

const Photo = ({ photo, setSelectedPhoto, setShowModal, setLoadingProps }) => {
  const { urls, alt_description, user } = photo;
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => (
          setShowModal(true), setSelectedPhoto(photo), setLoadingProps(true)
        )}
      >
        <Image
          src={urls?.thumb}
          width={0}
          height={0}
          sizes="100vw"
          className={`object-cover rounded-md w-full h-full  duration-700 ease-in-out hover:opacity-75 ${
            isLoading ? "blur-md grayscale" : "blur-0 grayscale-0"
          }`}
          alt="image"
          priority
          onLoadingComplete={() => setLoading(false)}
        />
        <div className="bg-yellow-50 rounded-sm justify-center w-full absolute bottom-0 p-1">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap inline-block w-full text-center px-5">
            {alt_description}
          </p>
          <p className="text-center">Credit: {user?.name}</p>
        </div>
      </div>
    </>
  );
};

export default Photo;
