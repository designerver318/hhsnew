import React from 'react';

// Main App component for the school announcement page
const Announcements = () => {
  // Array of school announcements to be displayed in the carousel
  const schoolAnnouncements = [
    { id: 1, title: 'Important: Parent-Teacher Meeting', date: 'June 15, 2025', content: 'Our annual Parent-Teacher meeting is scheduled for next Saturday. Please check your email for slot booking details.' },
    { id: 2, title: 'Summer Camp Registration Open', date: 'June 10, 2025', content: 'Exciting summer camps are now open for registration! Explore coding, arts, sports, and more. Limited slots available.' },
    { id: 3, title: 'Annual Sports Day Postponed', date: 'June 7, 2025', content: 'Due to unforeseen weather conditions, the Annual Sports Day has been postponed to June 22. We apologize for any inconvenience.' },
    { id: 4, title: 'School Re-opening Date Announced', date: 'June 5, 2025', content: 'The school will re-open for the new academic session on July 1, 2025, for all grades. We look forward to welcoming you back!' },
    { id: 5, title: 'Science Fair Winners Announced', date: 'June 3, 2025', content: 'Congratulations to all participants and winners of this year\'s Science Fair! Your innovative projects were truly inspiring. Details on the school notice board.' },
    { id: 6, title: 'New Library Hours', date: 'June 1, 2025', content: 'The school library will have extended hours starting next week: Monday-Friday, 8 AM - 5 PM. Come and explore our new collection!' },
  ];

  // To create an infinite loop, we duplicate the announcements.
  // This ensures a seamless transition when the animation loops.
  const duplicatedAnnouncements = [...schoolAnnouncements, ...schoolAnnouncements];

  // Calculate the total number of items to determine animation duration
  const totalItems = schoolAnnouncements.length;
  // Adjust animation duration based on the number of items for consistent speed
  const scrollDuration = `${totalItems * 4}s`; // 4 seconds per item seems like a good pace

  return (
    // Outer container for the entire page, ensuring full height and responsive padding
    <div className="min-h-screen text-white flex items-center justify-center">

      {/* Embedded CSS for the custom scrolling animation */}
      {/* This approach is used for self-contained components in this environment. */}
      <style>
        {`
        .scroll-container {
          height: 28rem; /* Equivalent to h-112, fixed height for the scrollable area */
          overflow: hidden;
          position: relative;
          /* Creates a fade effect at the top and bottom of the scrollable area */
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }

        .scroll-content {
          display: flex;
          flex-direction: column;
          /* Animation name, duration (variable), timing function, and infinite loop */
          animation: scrollUp var(--scroll-duration) linear infinite;
        }

        /* Pause the scroll animation on hover */
        .scroll-container:hover .scroll-content {
          animation-play-state: paused;
        }

        @keyframes scrollUp {
          0% { transform: translateY(0); }
          /* Scrolls up by exactly half the total content height, creating a perfect loop
             because the content is duplicated once. */
          100% { transform: translateY(-50%); }
        }
        `}
      </style>

      {/* Central content card with rounded corners and shadow */}
      <div className=" bg-gradient-to-b from-red-100 to-transparent text-[#2d1a6b]  p-6 sm:p-10 md:p-12 w-full text-center transform transition-all duration-500">
        {/* Main announcement headline */}
        <h1 className="text-3xl lg:text-4xl mbl uppercase text-[#2d1a6b] mb-10">
          School Announcements
        </h1>

        {/* Vertical Scrolling Carousel Section */}
        {/* Apply the custom scroll-container class and dynamic scroll duration */}
        <div
          className="scroll-container mx-auto max-w-2xl border border-gray-300 rounded-xl"
          style={{ '--scroll-duration': scrollDuration }} // Set the CSS variable for animation duration
        >
          <div className="scroll-content">
            {duplicatedAnnouncements.map((announcement, index) => (
              <div
                key={`${announcement.id}-${index}`} // Unique key for each item, including duplicated ones
                className="bg-gray-50 p-6 m-2 rounded-lg shadow-md text-left flex-shrink-0"
                style={{ minHeight: '8rem' }} // Ensure a minimum height for each announcement item
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#bf213e]">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg mb-2">
                  {announcement.content}
                </p>
                <p className="text-sm text-gray-500 italic">
                  {announcement.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Button (Optional, if you want to keep one) */}
        {/* <a
          href="#" // Replace with your actual link to a full announcements page
          className="inline-block mt-8 bg-blue-600 hover:bg-[#bf213e] text-white font-bold py-3 px-8 rounded-full text-lg sm:text-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          View All Announcements
        </a> */}

        {/* Footer text */}
        <p className="mt-8 text-sm text-gray-500">
          Last updated: June 7, 2025
        </p>
      </div>
    </div>
  );
};

export default Announcements;
