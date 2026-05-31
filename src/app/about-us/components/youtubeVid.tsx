// components/YouTubeEmbed.jsx
export default function YouTubeEmbed() {
  return (
    <div className="flex flex-col items-center justify-center h-1/2 bg-white ">
      {/* Card container with white background */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full ">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-black mb-4">GR1T Relaunch</h2>

        {/* Responsive video container */}
        <div className="relative w-full pb-[56.25%] max-w-7xl mx-auto">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/_ItIfjFJDpE"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full ">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-black mb-4">GR1T Relaunch</h2>

        {/* Responsive video container */}
        <div className="relative w-full pb-[56.25%] max-w-7xl mx-auto">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/56_7zyhlcAg"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
