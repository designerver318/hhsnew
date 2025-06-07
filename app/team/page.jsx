"use client"

import React from 'react';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react'; // Using lucide-react for icons
import Image from 'next/image';

// Main Team component
const Team = () => {
  // Mock team member data
  const teamMembers = [
    {
      id: 1,
      name: 'Alice Johnson',
      title: 'Chief Executive Officer',
      bio: 'Alice is a visionary leader with over 20 years of experience in strategic planning and business development. She is passionate about innovation and driving growth.',
      image: 'https://placehold.co/400x400/22c55e/ffffff?text=Alice', // Green placeholder
      social: {
        twitter: '#',
        linkedin: '#',
        github: '',
        website: '#',
      },
    },
    {
      id: 2,
      name: 'Bob Williams',
      title: 'Head of Product',
      bio: 'Bob is a product enthusiast who thrives on creating user-centric solutions. His expertise lies in agile methodologies and product lifecycle management.',
      image: 'https://placehold.co/400x400/0ea5e9/ffffff?text=Bob', // Blue placeholder
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#',
        website: '',
      },
    },
    {
      id: 3,
      name: 'Charlie Brown',
      title: 'Lead Software Engineer',
      bio: 'Charlie is a coding maestro with a knack for building scalable and robust systems. He enjoys tackling complex technical challenges.',
      image: 'https://placehold.co/400x400/ef4444/ffffff?text=Charlie', // Red placeholder
      social: {
        twitter: '',
        linkedin: '#',
        github: '#',
        website: '#',
      },
    },
    {
      id: 4,
      name: 'Diana Miller',
      title: 'Marketing Director',
      bio: 'Diana is a creative force in marketing, specializing in digital strategies and brand storytelling. She loves connecting with audiences.',
      image: 'https://placehold.co/400x400/f97316/ffffff?text=Diana', // Orange placeholder
      social: {
        twitter: '#',
        linkedin: '#',
        github: '',
        website: '#',
      },
    },
    {
      id: 5,
      name: 'Ethan Davis',
      title: 'Operations Manager',
      bio: 'Ethan ensures the smooth running of all operations, optimizing processes for efficiency and effectiveness. He is a master organizer.',
      image: 'https://placehold.co/400x400/6366f1/ffffff?text=Ethan', // Indigo placeholder
      social: {
        twitter: '',
        linkedin: '#',
        github: '',
        website: '#',
      },
    },
    {
      id: 6,
      name: 'Fiona White',
      title: 'UX/UI Designer',
      bio: 'Fiona crafts intuitive and beautiful user experiences. Her designs are a perfect blend of aesthetics and functionality.',
      image: 'https://placehold.co/400x400/8b5cf6/ffffff?text=Fiona', // Violet placeholder
      social: {
        twitter: '#',
        linkedin: '#',
        github: '',
        website: '',
      },
    },
  ];

  return (
    <>
    <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center text-white overflow-hidden">
            <Image
              src="/hero/ab.png"
              alt="Happy children at Happy Hours School campus"
              className="z-0 w-full h-full object-cover"
              unoptimized
              width={1000}
              height={1000}
            />
            <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center p-4 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold uppercase mb-4 drop-shadow-lg">
                Our Team
              </h1>
            </div>
          </section>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 font-sans text-gray-800 p-4 sm:p-8">
      {/* Page Header */}
      <header className="text-center mb-12 mt-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
          Meet Our Amazing Team
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are a passionate group of individuals dedicated to making a difference.
          Get to know the brilliant minds behind our success.
        </p>
      </header>

      {/* Team Members Grid */}
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Card Background Overlay - for unique design */}
            <div
              className={`absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity duration-300 group-hover:opacity-100 ${
                member.id % 3 === 0
                  ? 'from-purple-400 to-indigo-500' // Purple/Indigo for 3rd, 6th etc.
                  : member.id % 3 === 1
                  ? 'from-green-400 to-teal-500' // Green/Teal for 1st, 4th etc.
                  : 'from-orange-400 to-red-500' // Orange/Red for 2nd, 5th etc.
              } -z-10`}
            ></div>

            <div className="relative p-6 sm:p-8 flex flex-col items-center text-center">
              {/* Member Image */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/ccc/333?text=Profile'; }}
                />
              </div>

              {/* Member Info */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {member.name}
              </h2>
              <p className="text-lg text-indigo-700 font-semibold mb-4">{member.title}</p>
              <p className="text-md text-gray-700 mb-6 flex-grow">{member.bio}</p>

              {/* Social Media Links */}
              <div className="flex justify-center space-x-4">
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-400 transition-colors duration-200"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter size={24} />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin size={24} />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <Github size={24} />
                  </a>
                )}
                {member.social.website && (
                  <a
                    href={member.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
                    aria-label={`${member.name}'s Website`}
                  >
                    <Globe size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
    </>
  );
};

export default Team;
