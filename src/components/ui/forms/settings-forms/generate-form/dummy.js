import { SvgArtDownloadIcon } from '@/components/common/icons'

export const DummyTwo = ({ data }) => {
  return (
    <section className="overflow-hidden text-gray-700">
      <div className="mx-auto">
        <div className="flex flex-wrap">
          {data?.map((ele) => (
            <div key={ele.id} className="group relative p-px w-1/2 md:w-1/4">
              <img
                alt="gallery"
                className="block object-cover object-center w-full h-full"
                src={ele.image}
              />
              <div className="absolute p-2 top-0 left-0 w-full flex flex-col justify-center items-center bg-black/50 opacity-0 group-hover:h-full group-hover:opacity-100">
                <button
                  type="button"
                  className="absolute right-2 top-2 bg-black/50 p-2"
                >
                  <SvgArtDownloadIcon />
                </button>
                <button
                  type="button"
                  className="px-[14px] py-2 text-white border rounded border-blue-600 bg-blue-600 text-sm font-medium"
                  href="#"
                >
                  Select Artwork
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const DummyOne = () => {
  return (
    <section className="overflow-hidden text-gray-700">
      <div className="mx-auto mt-6">
        <div className="flex flex-wrap">
          <div className="flex flex-wrap w-1/2">
            <div className="w-full group relative">
              <img
                alt="gallery"
                className="block object-cover object-center w-full h-full"
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
              />
              <div className="absolute p-[28px] top-0 left-0 w-full flex flex-col justify-between  bg-white/90 opacity-0 group-hover:h-full group-hover:opacity-100">
                <h3 className=" text-sm font-normal text-gray-700">
                  3D render of a cute tropical fish in an aquarium on dark blue
                  background, digital art
                </h3>
                <a className="text-gray-500 text-sm font-medium" href="#">
                  Click to try
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className=" group relative p-px w-1/2">
              <img
                alt="gallery"
                className="block object-cover object-center w-full h-full"
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
              />
              <div className="absolute p-[28px] top-0 left-0 w-full flex flex-col justify-between  bg-white/90 opacity-0 group-hover:h-full group-hover:opacity-100">
                <h3 className=" text-sm font-normal text-gray-700">
                  3D render of a cute tropical fish in an aquarium on dark blue
                  background, digital art
                </h3>
                <a className="text-gray-500 text-sm font-medium" href="#">
                  Click to try
                </a>
              </div>
            </div>
            <div className="w-1/2 p-px group relative">
              <img
                alt="gallery"
                className="block object-cover object-center w-full h-full"
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
              />
              <div className="absolute p-[28px] top-0 left-0 w-full flex flex-col justify-between  bg-white/90 opacity-0 group-hover:h-full group-hover:opacity-100">
                <h3 className=" text-sm font-normal text-gray-700">
                  3D render of a cute tropical fish in an aquarium on dark blue
                  background, digital art
                </h3>
                <a className="text-gray-500 text-sm font-medium" href="#">
                  Click to try
                </a>
              </div>
            </div>
            <div className="w-1/2 p-px group relative">
              <img
                alt="gallery"
                className="block object-cover object-center w-full h-full"
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"
              />
              <div className="absolute p-[28px] top-0 left-0 w-full flex flex-col justify-between  bg-white/90 opacity-0 group-hover:h-full group-hover:opacity-100">
                <h3 className=" text-sm font-normal text-gray-700">
                  3D render of a cute tropical fish in an aquarium on dark blue
                  background, digital art
                </h3>
                <a className="text-gray-500 text-sm font-medium" href="#">
                  Click to try
                </a>
              </div>
            </div>
            <div className="w-1/2 p-px group relative">
              <img
                alt="gallery"
                className="block object-cover object-center w-full h-full"
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(68).webp"
              />
              <div className="absolute p-[28px] top-0 left-0 w-full flex flex-col justify-between  bg-white/90 opacity-0 group-hover:h-full group-hover:opacity-100">
                <h3 className=" text-sm font-normal text-gray-700">
                  3D render of a cute tropical fish in an aquarium on dark blue
                  background, digital art
                </h3>
                <a className="text-gray-500 text-sm font-medium" href="#">
                  Click to try
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
