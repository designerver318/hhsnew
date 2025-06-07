"use client"

import Image from 'next/image';
import React, { useState } from 'react';

// Main App component for the gallery page
export default function Gallery() {
  // State to manage the currently selected filter category
  const [filter, setFilter] = useState('all');

  // Array of gallery items, each with an image, title, description, and category
  // Using placeholder images for demonstration purposes.
  const galleryItems = [
    {
      id: 1,
      category: 'childrens-day',
      image: 'https://placehold.co/600x400/BFECB9/333333?text=Childrens+Day+1',
      title: 'Childrens Day Celebration 2024',
      description: 'Joyful moments from our Childrens Day event.'
    },
    {
      id: 2,
      category: 'annual-function',
      image: 'https://placehold.co/600x400/D0E0FF/333333?text=Annual+Function+1',
      title: 'Annual Function Grand Finale',
      description: 'A spectacular performance at the annual event.'
    },
    {
      id: 3,
      category: 'childrens-day',
      image: 'https://placehold.co/600x400/BFECB9/333333?text=Childrens+Day+2',
      title: 'Fun Games for Kids',
      description: 'Kids enjoying various games and activities.'
    },
    {
      id: 4,
      category: 'annual-function',
      image: 'https://placehold.co/600x400/D0E0FF/333333?text=Annual+Function+2',
      title: 'Award Ceremony',
      description: 'Recognizing excellence at the annual function.'
    },
    {
      id: 5,
      category: 'childrens-day',
      image: 'https://placehold.co/600x400/BFECB9/333333?text=Childrens+Day+3',
      title: 'Creative Art Session',
      description: 'Little artists showcasing their creativity.'
    },
    {
      id: 6,
      category: 'annual-function',
      image: 'https://placehold.co/600x400/D0E0FF/333333?text=Annual+Function+3',
      title: 'Cultural Performances',
      description: 'Diverse cultural acts by our talented students.'
    },
    {
      id: 7,
      category: 'childrens-day',
      image: 'https://placehold.co/600x400/BFECB9/333333?text=Childrens+Day+4',
      title: 'Storytelling Session',
      description: 'Engaging stories captivating young minds.'
    },
    {
      id: 8,
      category: 'annual-function',
      image: 'https://placehold.co/600x400/D0E0FF/333333?text=Annual+Function+4',
      title: 'Faculty and Staff Address',
      description: 'Keynote speeches from our esteemed faculty.'
    },
  ];

  // Filter gallery items based on the selected category
  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  // Helper function to render filter buttons
  const FilterButton = ({ category, label }) => (
    <button
      onClick={() => setFilter(category)}
      className={`
        px-6 py-3 mx-2 my-1
        rounded-full
        font-semibold text-lg
        transition-all duration-300 ease-in-out
        shadow-md
        ${filter === category
          ? 'bg-blue-600 text-white shadow-blue-500/50 transform scale-105'
          : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-blue-600'
        }
        focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75
      `}
    >
      {label}
    </button>
  );

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter text-gray-800">
        {/* Header Section */}
        <header className="py-12 bg-white shadow-lg rounded-b-3xl mb-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-6xl font-extrabold text-indigo-700 leading-tight mb-4 tracking-tight">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore memorable moments from our events and celebrations.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Filter Buttons Section */}
          <section className="flex flex-wrap justify-center mb-12">
            <FilterButton category="all" label="All" />
            <FilterButton category="childrens-day" label="Children's Day" />
            <FilterButton category="annual-function" label="Annual Function" />
          </section>

          {/* Gallery Grid Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                  // Fallback for image loading errors
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = 'https://placehold.co/600x400/CCCCCC/666666?text=Image+Error';
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </section>

          {filteredItems.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-xl">
              No items found for this category.
            </div>
          )}
        </main>

        {/* Footer Section */}
        <footer className="py-8 bg-white mt-10 rounded-t-3xl shadow-lg">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Your Organization Name. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>

  );
}

